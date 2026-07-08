import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProfessionalMutationRequestService } from '../_services/professsionel-request.service';

@Component({
  selector: 'app-admin-approve-professionel-mutation',
  templateUrl: './admin-approve-professionel-mutation.component.html',
  styleUrls: ['./admin-approve-professionel-mutation.component.css']
})
export class AdminApproveProfessionelMutationComponent  implements OnInit, OnDestroy{


  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  professionalRequest: any[] = [];
  professionalRequestsPending: any[] = [];
  professionalRequestsApproved: any[] = [];
  professionalRequestsRejected: any[] = [];

  constructor(private professionalMutationRequestService: ProfessionalMutationRequestService) {}

  ngOnInit(): void {
    this.getProfessionalRequest();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
      // Add other options as needed
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getProfessionalRequest(): void {
    this.professionalMutationRequestService.getAllProfessionalMutationRequest().subscribe(
      (data) => {
        this.professionalRequest = data;
        this.professionalRequestsApproved = this.professionalRequest.filter(request => request.status === "Approved");
        this.professionalRequestsRejected = this.professionalRequest.filter(request => request.status === "Rejected");
        this.professionalRequestsPending = this.professionalRequest.filter(request => request.status === "Pending");
        this.dtTrigger.next(null);
      },
      (error) => {
        console.error('Error fetching personal change requests:', error);
      }
    );
  }
  approveProfessionalRequest(applicationId: number): void {
    this.professionalMutationRequestService.approveProfessionalMutationRequest(applicationId)
      .subscribe(
        (response) => {
          console.log('Request approved successfully:', response);
          this.getProfessionalRequest();
        },
        (error) => {
          console.error('Error approving Request:', error);
        }
      );
  }

  rejectProfessionalRequest(applicationId: number): void {
    this.professionalMutationRequestService.rejectProfessionalMutationRequest(applicationId)
      .subscribe(
        (response) => {
          console.log('Requests rejected successfully:', response);
          this.getProfessionalRequest();
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


