import { Component, OnInit } from '@angular/core';

import { AuthorizationRequestService } from '../_services/authorization-request.service';
import { StorageService } from '../_services/storage.service';
import { AuthorizationPdfService } from './authorization-pdf.service';

@Component({
  selector: 'app-authorization-request-list',
  templateUrl: './authorization-request-list.component.html',
  styleUrls: ['./authorization-request-list.component.css']
})
export class AuthorizationRequestListComponent implements OnInit  {
  authorizationRequest: any[] = [];

  constructor(private authorizationRequestService: AuthorizationRequestService, private storageService: StorageService, private authorizationPdfService:AuthorizationPdfService) {}

  ngOnInit(): void {
    const username = this.storageService.getUser().username;
    this.authorizationRequestService.getAuthorizationRequestHistory(username).subscribe(
      data => {
        this.authorizationRequest = data;
      },
      error => {
        console.error('Error fetching Authorization Requests:', error);
      }
    );
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

  async downloadPDF(application: any) {
    const pdfBytes = await this.authorizationPdfService.generatePdf(application);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${application.full_username}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
