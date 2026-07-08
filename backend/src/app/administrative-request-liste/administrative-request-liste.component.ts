import { Component, OnInit } from '@angular/core';
import { AdministrativeRequestService } from '../_services/administrative.service';
import { StorageService } from '../_services/storage.service';
import { AdministrativePdfService } from './administrative-pdf.service';


@Component({
  selector: 'app-administrative-request-liste',
  templateUrl: './administrative-request-liste.component.html',
  styleUrls: ['./administrative-request-liste.component.css']
})
export class AdministrativeRequestListeComponent implements OnInit{
  administrativeRequest: any[] = [];

  constructor(private administrativeRequestService: AdministrativeRequestService, private storageService: StorageService, private administrativePdfService:AdministrativePdfService) {}

  ngOnInit(): void {
    const username = this.storageService.getUser().username;
    this.administrativeRequestService.getAdministrativeRequestHistory(username).subscribe(
      data => {
        this.administrativeRequest = data;
      },
      error => {
        console.error('Error fetching Authorization Requests:', error);
      }
    );
  }

  async downloadPDF(application: any) {
    const pdfBytes = await this.administrativePdfService.generatePdf(application);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${application.fullName}_${application.typeOfDocumentRequested}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }


  downloadBase64PDF(base64String: any, filename: any) {
    // Convert base64 string to binary
    const byteCharacters = atob(base64String.replace("data:image/png;base64," , ""));
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the binary data
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Generate URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and initiate the download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  }

}
