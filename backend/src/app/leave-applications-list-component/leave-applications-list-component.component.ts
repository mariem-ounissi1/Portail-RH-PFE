import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../_services/leave.service';
import { StorageService } from '../_services/storage.service';
import { LeavePdfService } from './leave-pdf.service';

@Component({
  selector: 'app-leave-applications-list-component',
  templateUrl: './leave-applications-list-component.component.html',
  styleUrls: ['./leave-applications-list-component.component.css']
})
export class LeaveApplicationsListComponentComponent implements OnInit {
  leaveApplications: any[] = [];

  constructor(private leaveService: LeaveService, private storageService: StorageService, private leavePdfService:LeavePdfService) {}

  ngOnInit(): void {
    const username = this.storageService.getUser().username;
    this.leaveService.getLeaveApplications(username).subscribe(
      data => {
        this.leaveApplications = data;
      },
      error => {
        console.error('Error fetching leave applications:', error);
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
    const pdfBytes = await this.leavePdfService.generatePdf(application);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${application.leaveType}_${application.date_debut}_${application.date_fin}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }

}
