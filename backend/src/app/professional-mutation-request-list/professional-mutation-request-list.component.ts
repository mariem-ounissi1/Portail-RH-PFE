import { Component, OnInit } from '@angular/core';
import { ProfessionalMutationRequestService } from '../_services/professsionel-request.service';
import { StorageService } from '../_services/storage.service';
import { ProfessionalPdfService } from './professional-pdf.service';


@Component({
  selector: 'app-professional-mutation-request-list',
  templateUrl: './professional-mutation-request-list.component.html',
  styleUrls: ['./professional-mutation-request-list.component.css']
})
export class ProfessionalMutationRequestListComponent implements OnInit{
  professionalRequest: any[] = [];

  constructor(private professionalMutationRequestService: ProfessionalMutationRequestService, private storageService: StorageService, private professionalPdfService:ProfessionalPdfService) {}
  ngOnInit(): void {
    const username = this.storageService.getUser().username;
    this.professionalMutationRequestService.getProfessionalMutationRequestHistory(username).subscribe(
      data => {
        this.professionalRequest = data;
      },
      error => {
        console.error('Error fetching leave applications:', error);
      }
    );

  }

  async downloadPDF(application: any) {
    const pdfBytes = await this.professionalPdfService.generatePdf(application);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${application.fullName}.pdf`;
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
