// authorization-pdf.service.ts

import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationPdfService {

  constructor() { }

  async generatePdf(authorizationRequest: any): Promise<Uint8Array> {
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
    const formattedStartDate = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(authorizationRequest.date_debut);
    const formattedEndDate = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(authorizationRequest.date_fin);
    page.drawText(`Start Date: ${formattedStartDate }`, { x: 50, y: height - 100, size: fontSize });
    page.drawText(`End Date: ${formattedEndDate}`, { x: 50, y: height - 140, size: fontSize });
    page.drawText(`Username: ${authorizationRequest.full_username}`, { x: 50, y: height - 180, size: fontSize });
    page.drawText(`Position: ${authorizationRequest.position}`, { x: 50, y: height - 220, size: fontSize });
    page.drawText(` Service: ${authorizationRequest.service}`, { x: 50, y: height - 260, size: fontSize });
    page.drawText(`Authorization Type: ${authorizationRequest.type}`, { x: 50, y: height - 300, size: fontSize });
    page.drawText(` Reasons : ${authorizationRequest.reason}`, { x: 50, y: height - 340, size: fontSize });
    page.drawText(`Status: ${authorizationRequest.status}`, { x: 50, y: height - 380, size: fontSize });

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
