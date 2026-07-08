// personal-pdf.service.ts

import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PersonalPdfService {

  constructor() { }

  async generatePdf(personalChangeRequests: any): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();
    const fontSize = 20;

    const headerFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      page.drawText('Company Name : ArabeSoft', {
       x: 50,
       y: height - 30,
         size: fontSize,
        font: headerFont,
        color: rgb(0, 0, 0.7),
    });

    // Add professional Request details to PDF
    const formattedDateOfCreation = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(personalChangeRequests.dateOfCreation);
    const formattedProcessingDate = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(personalChangeRequests.processingDate);
    page.drawText(`Date Of creation: ${formattedDateOfCreation }`, { x: 50, y: height - 100, size: fontSize });
    page.drawText(`Username: ${personalChangeRequests.fullName}`, { x: 50, y: height - 140, size: fontSize });
    page.drawText(`Change Details: ${personalChangeRequests.changeDetails}`, { x: 50, y: height - 180, size: fontSize });
    page.drawText(`Change Type: ${personalChangeRequests. valueChange}`, { x: 50, y: height - 220, size: fontSize });
    page.drawText(`Processing Date: ${formattedProcessingDate}`, { x: 50, y: height - 260, size: fontSize });
    page.drawText(`Status: ${personalChangeRequests.status}`, { x: 50, y: height - 300, size: fontSize });

  // Load the signature image
  const imageUrl = 'assets/signature.png';
  const signatureImageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());

  const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
  const signatureImageDims = signatureImage.scale(0.5);
  page.drawImage(signatureImage, {
    x: 50,
    y: 50,
    width: signatureImageDims.width,
    height: signatureImageDims.height,
    opacity: 0.5
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
}
