import { Component } from '@angular/core';

import { Subject } from 'rxjs';
import { AuthorizationRequestService } from '../_services/authorization-request.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-admin-approve-authorization',
  templateUrl: './admin-approve-authorization.component.html',
  styleUrls: ['./admin-approve-authorization.component.css']
})
export class AdminApproveAuthorizationComponent {
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();


   authoPending: any[] = [];
   authoAprouved: any[] = [];
   authoRejected: any[] = [];

    authorizationRequests: any[] = []; // Assuming each leave application is an object
    username: string = '';

    constructor(private authorizationRequestService: AuthorizationRequestService,private userService: UserService ) {}


    ngOnInit(): void {
      this.getAuthorizationRequest();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
        // Add other options as needed
      };
    }

    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }

    getAuthorizationRequest(): void {
      this.authorizationRequestService.getAllAuthorizationRequest().subscribe(
        (data) => {
          this.authorizationRequests = data;
          this.authoAprouved= this.authorizationRequests.filter((authorizationRequest) => authorizationRequest.status=="Approved")
          this.authoRejected= this.authorizationRequests.filter((authorizationRequest) => authorizationRequest.status=="Rejected")
          this.authoPending= this.authorizationRequests.filter((authorizationRequest)  => authorizationRequest.status=="Pending")
         this.dtTrigger.next(null);
        },
        (error) => {
          console.error('Error fetching loan applications:', error);
        }
      );
    }




    approveAuthorization(applicationId: number): void {
      this.authorizationRequestService.approveAuthorization(applicationId)
        .subscribe(
          (response) => {
            console.log('Request approved successfully:', response);
            this.getAuthorizationRequest();
          },
          (error) => {
            console.error('Error approving Request:', error);
          }
        );
    }

    rejectAuthorization(applicationId: number): void {
      this.authorizationRequestService.rejectAuthorization(applicationId)
        .subscribe(
          (response) => {
            console.log('Requests rejected successfully:', response);
            this.getAuthorizationRequest();
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
