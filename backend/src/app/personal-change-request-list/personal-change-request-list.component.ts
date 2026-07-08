import { Component, OnInit } from '@angular/core';
import { PersonalChangeRequesttService } from '../_services/personal-change-request.service';
import { StorageService } from '../_services/storage.service';
import { PersonalPdfService } from './personal-pdf.service';
@Component({
  selector: 'app-personal-change-request-list',
  templateUrl: './personal-change-request-list.component.html',
  styleUrls: ['./personal-change-request-list.component.css']
})
export class PersonalChangeRequestListComponent implements OnInit  {
  personalChangeRequests: any[] = []; // Corrected property name
  application:any;
  constructor(private personalChangeRequestService: PersonalChangeRequesttService, private storageService: StorageService, private personalPdfService:PersonalPdfService) {}

  ngOnInit(): void {
    const username = this.storageService.getUser().username;
    this.personalChangeRequestService.getPersonalChangeRequestHistory(username).subscribe(
      data => {
        this.personalChangeRequests = data; // Corrected property assignment
      },
      error => {
        console.error('Error fetching Personal Change Requests:', error);
      }
    );
  }

  async downloadPDF(application: any) {
    const pdfBytes = await this.personalPdfService.generatePdf(application);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${application.fullName}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
