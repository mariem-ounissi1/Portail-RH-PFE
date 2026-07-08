import { Component, OnInit } from '@angular/core';
import { LoanRequestService } from '../_services/loan-request.service'; // Assurez-vous d'importer le service approprié pour récupérer les demandes de prêt
import { StorageService } from '../_services/storage.service';
import { LoanPdfService } from './loan-pdf.service';

@Component({
  selector: 'app-loan-requests-list',
  templateUrl: './loan-requests-list.component.html',
  styleUrls: ['./loan-requests-list.component.css']
})
export class LoanRequestsListComponent implements OnInit {
  loanRequests: any[] = [];
   application: any;

  constructor(private loanRequestService: LoanRequestService, private storageService: StorageService, private loanPdfService:LoanPdfService) {}

  ngOnInit(): void {
    const username = this.storageService.getUser().username;
    this.loanRequestService.getLoanRequestHistory(username).subscribe(
      data => {
        this.loanRequests = data;
      },
      error => {
        console.error('Error fetching loan applications:', error);
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
    const pdfBytes = await this.loanPdfService.generatePdf(application);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${application.loanType}_${application.firstName}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
