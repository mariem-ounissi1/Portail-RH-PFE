import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PersonalChangeRequesttService } from '../_services/personal-change-request.service';

@Component({
  selector: 'app-admin-approve-personal-change-request',
  templateUrl: './admin-approve-personal-change-request.component.html',
  styleUrls: ['./admin-approve-personal-change-request.component.css']
})
export class AdminApprovePersonalChangeRequestComponent implements OnInit, OnDestroy {

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  personalChangeRequests: any[] = [];
  personalChangeRequestsPending: any[] = [];
  personalChangeRequestsApproved: any[] = [];
  personalChangeRequestsRejected: any[] = [];

  constructor(private personalChangeRequestService: PersonalChangeRequesttService) {}

  ngOnInit(): void {
    this.getPersonalChangeRequests();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
      // Add other options as needed
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getPersonalChangeRequests(): void {
    this.personalChangeRequestService.getAllPersonalChangeRequest().subscribe(
      (data) => {
        this.personalChangeRequests = data;
        this.personalChangeRequestsApproved = this.personalChangeRequests.filter(request => request.status === "Approved");
        this.personalChangeRequestsRejected = this.personalChangeRequests.filter(request => request.status === "Rejected");
        this.personalChangeRequestsPending = this.personalChangeRequests.filter(request => request.status === "Pending");
        this.dtTrigger.next(null);
      },
      (error) => {
        console.error('Error fetching personal change requests:', error);
      }
    );
  }
  approvePersonalChange(applicationId: number): void {
    this.personalChangeRequestService.approvePersonalChangeRequest(applicationId)
      .subscribe(
        (response) => {
          console.log('Request approved successfully:', response);
          this.getPersonalChangeRequests();
        },
        (error) => {
          console.error('Error approving Request:', error);
        }
      );
  }

  rejectPersonalChange(applicationId: number): void {
    this.personalChangeRequestService.rejectPersonalChangeRequest(applicationId)
      .subscribe(
        (response) => {
          console.log('Requests rejected successfully:', response);
          this.getPersonalChangeRequests();
        },
        (error) => {
          console.error('Error rejecting Request:', error);
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

}
