import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { ModeratorAuthorizationRequestService } from '../_services/moderator-authorization-request.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-moderator-approve-authorization',
  templateUrl: './moderator-approve-authorization.component.html',
  styleUrls: ['./moderator-approve-authorization.component.css']
})
export class ModeratorApproveAuthorizationComponent implements OnInit {
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();


   authoPending: any[] = [];
   authoAprouved: any[] = [];
   authoRejected: any[] = [];

    authorizationRequests: any[] = []; // Assuming each leave application is an object
    username: string = '';

    constructor(private storageService : StorageService , private moderatorauthorizationRequestService: ModeratorAuthorizationRequestService , private userService: UserService ) {}


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
      this.moderatorauthorizationRequestService.getAuthorizationRequestService(this.storageService.getUser().service).subscribe(
        (data) => {
          this.authorizationRequests = data;
          this.authoAprouved= this.authorizationRequests.filter((authorizationRequest) => authorizationRequest.status=="Approved")
          this.authoRejected= this.authorizationRequests.filter((authorizationRequest) => authorizationRequest.status=="Rejected")
          this.authoPending= this.authorizationRequests.filter((authorizationRequest)  => authorizationRequest.status=="Pending")
         this.dtTrigger.next(null);
        },
        (error) => {
          console.error('Error fetching Authorization Request :', error);
        }
      );
    }




    approveAuthorization(applicationId: number): void {
      this.moderatorauthorizationRequestService.approveAuthorization(applicationId)
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
      this.moderatorauthorizationRequestService.rejectAuthorization(applicationId)
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
