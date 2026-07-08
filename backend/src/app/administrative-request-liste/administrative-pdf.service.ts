import { Injectable } from '@angular/core';
import { rgb } from 'pdf-lib/cjs/api/colors';
import PDFDocument from 'pdf-lib/cjs/api/PDFDocument';
import { StandardFonts } from 'pdf-lib/cjs/api/StandardFonts';

@Injectable({
  providedIn: 'root'
})
export class AdministrativePdfService {
  constructor() { }

  async generatePdf(administrativeRequest: any): Promise<Uint8Array> {
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
    let yPos = height - 100;
    // Add professional Request details to PDF
    const formattedStartDateEmployee = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(administrativeRequest.startDateOfEmployment);

    page.drawText(`Full Name: ${administrativeRequest.fullName}`, { x: 50, y: height - 100, size: fontSize });
    page.drawText(`Service: ${administrativeRequest.service}`, { x: 50, y: height - 120, size: fontSize });
    page.drawText(` Service: ${administrativeRequest.service}`, { x: 50, y: height - 140, size: fontSize });
    page.drawText(`Document Type: ${administrativeRequest.typeOfDocumentRequested}`, { x: 50, y: height - 160, size: fontSize });
    page.drawText(` Reasons : ${administrativeRequest.reasonForRequest}`, { x: 50, y: height - 180, size: fontSize });
    page.drawText(` Start Date Of Employee : ${formattedStartDateEmployee}`, { x: 50, y: height - 200, size: fontSize });
    if (administrativeRequest.baseSalary) {
      page.drawText(` Base Salary : ${administrativeRequest.baseSalary}`, { x: 50, y: height - 220, size: fontSize });
      yPos -= 20;
    }
    if(administrativeRequest.netSalary){
    page.drawText(` Net Salary : ${administrativeRequest.netSalary}`, { x: 50, y: height - 240, size: fontSize });
    yPos -= 40;
  }
    if(administrativeRequest.hoursWorked){
    page.drawText(` Hours Worked : ${administrativeRequest.hoursWorked}`, { x: 50, y: height - 260, size: fontSize });
    yPos -= 40;
    }
    if(administrativeRequest.hoursWorkedPerWeek){
    page.drawText(` Hours Worked Per Week: ${administrativeRequest.hoursWorkedPerWeek}`, { x: 50, y: height - 280, size: fontSize });
    yPos -= 40;
  }
    if (administrativeRequest.typeOfContract){
    page.drawText(` Type Of Contrat : ${administrativeRequest.typeOfContract}`, { x: 50, y: height - 300, size: fontSize });
    yPos -= 40;}

    page.drawText(`Status: ${administrativeRequest.status}`, { x: 50, y: height - 320, size: fontSize });

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
