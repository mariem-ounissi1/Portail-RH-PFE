import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LeaveService } from '../_services/leave.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-admin-approve-leave',
  templateUrl: './admin-approve-leave.component.html',
  styleUrls: ['./admin-approve-leave.component.css'],


})
export class AdminApproveLeaveComponent implements OnInit {

   dtOptions: any;
   dtTrigger: Subject<any> = new Subject<any>();




   leaveApplications: any[] = []; // Assuming each leave application is an object
   leavePending: any[] = [];
   leaveAprouved: any[] = [];
   leaveRejected: any[] = [];



  username: string = '';

  constructor(private leaveService: LeaveService ,private userService: UserService ) {}


  ngOnInit(): void {
    this.getLeaveApplications();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
      // Add other options as needed
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getLeaveApplications(): void {
    this.leaveService.getAllLeaveApplications().subscribe(
      (data) => {
        this.leaveApplications = data;
        this.leaveAprouved= this.leaveApplications.filter(leave => leave.status=="Approved")
        this.leaveRejected= this.leaveApplications.filter(leave => leave.status=="Rejected")
        this.leavePending= this.leaveApplications.filter(leave => leave.status=="PENDING")

        //status
         // Trigger DataTables reload
         this.dtTrigger.next(null);
      },
      (error) => {
        console.error('Error fetching leave applications:', error);
      }
    );
  }

 // loadApplicantsUsernames(): void {
    // Iterate through leave applications and fetch usernames
  //  this.leaveApplications.forEach((application) => {
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


 //onActionChange(event: any, applicationId: number): void {

 // const action = event.target?.value;
 // if (action === 'approve') {
 //   this.approveLeave(applicationId);
 // } else if (action === 'reject') {
    //    this.rejectLeave(applicationId);
    //  }
    //}
  approveLeave(applicationId: number): void {
    this.leaveService.approveLeave(applicationId)
      .subscribe(
        (response) => {
          console.log('Leave approved successfully:', response);
          this.getLeaveApplications();
        },
        (error) => {
          console.error('Error approving leave:', error);
        }
      );
  }

  rejectLeave(applicationId: number): void {
    this.leaveService.rejectLeave(applicationId)
      .subscribe(
        (response) => {
          console.log('Leave rejected successfully:', response);
          this.getLeaveApplications();
        },
        (error) => {
          console.error('Error rejecting leave:', error);
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
