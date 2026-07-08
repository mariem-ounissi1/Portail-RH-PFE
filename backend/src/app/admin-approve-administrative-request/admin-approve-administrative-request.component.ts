import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AdministrativeRequestService } from '../_services/administrative.service';
@Component({
  selector: 'app-admin-approve-administrative-request',
  templateUrl: './admin-approve-administrative-request.component.html',
  styleUrls: ['./admin-approve-administrative-request.component.css']
})
export class AdminApproveAdministrativeRequestComponent {
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  administrativeRequests: any[] = [];
  administrativeRequestsPending: any[] = [];
  administrativeRequestsApproved: any[] = [];
  administrativeRequestsRejected: any[] = [];

  constructor(private administrativeRequestService:AdministrativeRequestService) {}

  ngOnInit(): void {
    this.getadministrativeRequests();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
      // Add other options as needed
    };
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getadministrativeRequests(): void {
    this.administrativeRequestService.getALLAdministrativeRequest().subscribe(
      (data) => {
        this.administrativeRequests = data;
        this.administrativeRequestsApproved = this.administrativeRequests.filter(request => request.status === "Approved");
        this.administrativeRequestsRejected = this.administrativeRequests.filter(request => request.status === "Rejected");
        this.administrativeRequestsPending = this.administrativeRequests.filter(request => request.status === "Pending");
        this.dtTrigger.next(null);
      },
      (error) => {
        console.error('Error fetching administrative requests:', error);
      }
    );
  }
  approveAdministrative (applicationId: number): void {
    this.administrativeRequestService.approveAdministrativeRequest(applicationId)
      .subscribe(
        (response) => {
          console.log('Request approved successfully:', response);
          this.getadministrativeRequests();
        },
        (error) => {
          console.error('Error approving Request:', error);
        }
      );
  }

  rejectAdministrative(applicationId: number): void {
    this.administrativeRequestService.rejectAdministrativeRequest(applicationId)
      .subscribe(
        (response) => {
          console.log('Requests rejected successfully:', response);
          this.getadministrativeRequests();
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
