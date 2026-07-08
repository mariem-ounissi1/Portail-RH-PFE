import { Component, OnInit } from '@angular/core';
import { ModeratorAuthorizationRequestService } from '../_services/moderator-authorization-request.service';
import { ModeratorLeaveService } from '../_services/moderator-leave.service';
import { moderatorprofessionalMutationRequestService } from '../_services/moderator-professsionel-request.service';
import { StorageService } from '../_services/storage.service';
@Component({
  selector: 'app-dashboard-moderator',
  templateUrl: './dashboard-moderator.component.html',
  styleUrls: ['./dashboard-moderator.component.css']
})
export class DashboardModeratorComponent implements OnInit  {
  basicDataLeavemod: any;
basicOptionsleavemod: any;
  leaveApplications: any[]=[];
  leaveAprouved: any[]=[];
  leaveRejected: any[]=[];
  leavePending: any[]=[];

  basicDataAuthorizationmod: any;
  basicOptionsAuthorizationmod: any;
  authoPending: any[]=[];
  authorizationRequests: any[]=[];
  authoRejected: any[]=[];
  authoAprouved: any[]=[];

  basicOptionsProfessionalmod: any;
  basicDataProfessionalmod: any;

  professionalRequestsApproved: any[]=[];
  professionalRequestsRejected: any[]=[];
  professionalRequestsPending: any[]=[];
  professionalRequest: any[] = [];





constructor(private moderatorLeaveService:ModeratorLeaveService,private storageService:StorageService,private moderatorAuthorizationRequestService:ModeratorAuthorizationRequestService,private moderatorprofessionalMutationRequestService:moderatorprofessionalMutationRequestService ) { }


ngOnInit(): void {
  this.getLeaveApplicationsModerator()
  this.getAuthorizationRequestModerator()
  this.getProfessionalRequestModerator()
}

getLeaveApplicationsModerator(): void {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  this.moderatorLeaveService.getLeaveApplicationsService(this.storageService.getUser().service).subscribe(
    (data) => {
      this.leaveApplications = data;
      this.leaveAprouved= this.leaveApplications.filter(leave => leave.status=="Approved")
      this.leaveRejected= this.leaveApplications.filter(leave => leave.status=="Rejected")
      this.leavePending= this.leaveApplications.filter(leave=> leave.status=="PENDING")
      this.basicDataLeavemod = {
        labels: ['Approved', 'Rejected', 'PEnding'],
        datasets: [
            {
                label: 'leave',
                data: [this.leaveAprouved.length, this.leaveRejected.length, this.leavePending.length],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(255, 0, 0, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgba(255, 0, 0, 0.2)', 'rgb(54, 162, 235)'],
                borderWidth: 1
              }
            ]
        };
        this.basicOptionsleavemod = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        //status
        // Trigger DataTables reload
    },
    (error) => {
        console.error('Error fetching professional :', error);
    }
);
}

getAuthorizationRequestModerator(): void {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  this.moderatorAuthorizationRequestService.getAuthorizationRequestService(this.storageService.getUser().service).subscribe(
    (data) => {
      this.authorizationRequests = data;
      this.authoAprouved= this.authorizationRequests.filter((authorizationRequest) => authorizationRequest.status=="Approved")
      this.authoRejected= this.authorizationRequests.filter((authorizationRequest) => authorizationRequest.status=="Rejected")
      this.authoPending= this.authorizationRequests.filter((authorizationRequest)  => authorizationRequest.status=="Pending")
          this.basicDataAuthorizationmod= {
              labels: ['Approved', 'Rejected', 'PEnding'],
              datasets: [
                  {
                      label: 'authorization Request',
                      data: [  this.authoAprouved.length, this.authoRejected.length, this.authoPending.length],
                      backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                      borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
                      borderWidth: 1
                    }
                  ]
              };
              this.basicOptionsAuthorizationmod = {
                  plugins: {
                      legend: {
                          labels: {
                              color: textColor
                          }
                      }
                  },
                  scales: {
                      y: {
                          beginAtZero: true,
                          ticks: {
                              color: textColorSecondary
                          },
                          grid: {
                              color: surfaceBorder,
                              drawBorder: false
                          }
                      },
                      x: {
                          ticks: {
                              color: textColorSecondary
                          },
                          grid: {
                              color: surfaceBorder,
                              drawBorder: false
                          }
                      }
                  }
              };
              //status
              // Trigger DataTables reload
          },
          (error) => {
              console.error('Error fetching professional :', error);
          }
      );
      }


      getProfessionalRequestModerator(): void {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.moderatorprofessionalMutationRequestService.getProfessionalRequestService(this.storageService.getUser().service).subscribe(
          (data) => {
            this.professionalRequest = data;
            this.professionalRequestsApproved = this.professionalRequest.filter(request => request.status === "Approved");
            this.professionalRequestsRejected = this.professionalRequest.filter(request => request.status === "Rejected");
            this.professionalRequestsPending = this.professionalRequest.filter(request => request.status === "Pending");
                this.basicDataProfessionalmod= {
                    labels: ['Approved', 'Rejected', 'PEnding'],
                    datasets: [
                        {
                            label: 'professional Mutation Request',
                            data: [  this.professionalRequestsApproved.length, this.professionalRequestsRejected.length, this.professionalRequestsPending.length],
                            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
                            borderWidth: 1
                        }
                    ]
                };
          this.basicOptionsProfessionalmod = {
                  plugins: {
                      legend: {
                          labels: {
                              color: textColor
                          }
                      }
                  },
                  scales: {
                      y: {
                          beginAtZero: true,
                          ticks: {
                              color: textColorSecondary
                          },
                          grid: {
                              color: surfaceBorder,
                              drawBorder: false
                          }
                      },
                      x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
            //status
            // Trigger DataTables reload
        },
        (error) => {
            console.error('Error fetching professional :', error);
        }
    );
    }

}
