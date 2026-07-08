// leave-pdf.service.ts

import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class LeavePdfService {

  constructor() { }

  async generatePdf(leaveApplications: any): Promise<Uint8Array> {
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

    // Add leave application details to PDF

   const formattedDateOfCreation =new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' ,hour: '2-digit',minute: '2-digit',second: '2-digit' }).format(leaveApplications.dateOfCreation) ;

    page.drawText(`Date of creation: ${formattedDateOfCreation}`, { x: 50, y: height - 100, size: fontSize });
    page.drawText(`Start Date: ${leaveApplications.date_debut}`, { x: 50, y: height - 120, size: fontSize });
    page.drawText(`End Date: ${leaveApplications.date_fin}`, { x: 50, y: height - 140, size: fontSize });
    page.drawText(`Username: ${leaveApplications.user.username}`, { x: 50, y: height - 160, size: fontSize });
    page.drawText(`Leave Type: ${leaveApplications.leaveType}`, { x: 50, y: height - 180, size: fontSize });
    page.drawText(`Leave Motive: ${leaveApplications.leaveMotive}`, { x: 50, y: height - 200, size: fontSize });
    page.drawText(`Status: ${leaveApplications.status}`, { x: 50, y: height - 220, size: fontSize });

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
