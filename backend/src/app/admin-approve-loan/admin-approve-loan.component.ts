import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoanRequestService } from '../_services/loan-request.service';
import { UserService } from '../_services/user.service';
  @Component({
    selector: 'app-admin-approve-loan',
    templateUrl: './admin-approve-loan.component.html',
    styleUrls: ['./admin-approve-loan.component.css']
  })
export class AdminApproveLoanComponent {

  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();


   loanPending: any[] = [];
   loanAprouved: any[] = [];
   loanRejected: any[] = [];

    loanRequests: any[] = []; // Assuming each leave application is an object
    username: string = '';

    constructor(private loanRequestService: LoanRequestService,private userService: UserService ) {}


    ngOnInit(): void {
      this.getLoanApplications();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
        // Add other options as needed
      };
    }
    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }

    getLoanApplications(): void {
      this.loanRequestService.getAllLoanApplications().subscribe(
        (data) => {
          this.loanRequests = data;
          this.loanAprouved= this.loanRequests.filter((loanRequest) => loanRequest.status=="Approved")
          this.loanRejected= this.loanRequests.filter((loanRequest) => loanRequest.status=="Rejected")
          this.loanPending= this.loanRequests.filter((loanRequest)  => loanRequest.status=="Pending")
         this.dtTrigger.next(null);
        },
        (error) => {
          console.error('Error fetching loan applications:', error);
        }
      );
    }

   // loadApplicantsUsernames(): void {
      // Iterate through loan request and fetch usernames
    //  this.loanApplications.forEach((application) => {
     //   this.userService.getUserById(application.user_id).subscribe(
      //    (user) => {
     //       application.username = user.username;
      //    },
      //    (error) => {
     //       console.error('Error fetching username:', error);
     //     }
     //   );
     // });
   // }
    approveLoan(applicationId: number): void {
      this.loanRequestService.approveLoan(applicationId)
        .subscribe(
          (response) => {
            console.log('Request approved successfully:', response);
            this.getLoanApplications();
          },
          (error) => {
            console.error('Error approving Request:', error);
          }
        );
    }

    rejectLoan(applicationId: number): void {
      this.loanRequestService.rejectLoan(applicationId)
        .subscribe(
          (response) => {
            console.log('Requests rejected successfully:', response);
            this.getLoanApplications();
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







