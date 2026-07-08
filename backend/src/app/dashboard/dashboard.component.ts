// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AdministrativeRequestService } from '../_services/administrative.service';
import { AuthorizationRequestService } from '../_services/authorization-request.service';
import { LeaveService } from '../_services/leave.service';
import { LoanRequestService } from '../_services/loan-request.service';
import { ModeratorLeaveService } from '../_services/moderator-leave.service';
import { PersonalChangeRequesttService } from '../_services/personal-change-request.service';
import { ProfessionalMutationRequestService } from '../_services/professsionel-request.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardKpis: any;
  leaveApplications:any[]=[];
  leaveAprouved:any[]=[];
  leaveRejected:any[]=[];
  leavePending:any[]=[];
  basicData: any;
  basicOptions: any;
  basicOptionsLoan: any;
  basicOptionsPersonal: any;

  loanPending: any[] = [];
  loanAprouved: any[] = [];
  loanRejected: any[] = [];

   loanRequests: any[] = []; // Assuming each leave application is an object

   basicDataLoan: any;
   basicDataPersonal: any;
  personalChangeRequests: any[]=[];
  personalChangeRequestsApproved: any[]=[];
  personalChangeRequestsRejected: any[]=[];
  personalChangeRequestsPending: any[]=[];
  ProfessionalRequest: any[]=[];
  professionalRequestsApproved: any[]=[];
  professionalRequestsRejected: any[]=[];
  professionalRequestsPending: any[]=[];
  basicOptionsProfessional:any;
   basicDataProfessional: any;
  basicDataAdministrative: any;
  basicOptionsAdministrative: any;
  administrativeRequests: any[]=[];
  administrativeRequestsApproved: any[]=[];
  administrativeRequestsPending: any[]=[];
  administrativeRequestsRejected: any[]=[];
  basicDataAutorization: any;
  basicOptionsAuthorization: any;
  authorizationRequests: any[]=[];
  authoRejected: any[]=[];
  authoAprouved: any[]=[];
  authoPending: any[]=[];
basicOptionsleavemod: any;
basicDataLeavemod: any;
  constructor(private loanRequestService: LoanRequestService,private leaveService: LeaveService,private personalchangeRequestService:PersonalChangeRequesttService,private professionalMutationRequestService:ProfessionalMutationRequestService,private administrativeRequestService:AdministrativeRequestService,private authorizationRequestService:AuthorizationRequestService,private moderatorLeaveService:ModeratorLeaveService,private storageService:StorageService) { }

  ngOnInit(): void {

    this.getLeaveApplications()
    this.getLoanApplications()
    this.getPersonalChangeRequests()
    this.getProfessionalRequest()
    this.getAuthorizationRequest()
    this.getAdministrativeRequests()

  }
  getLeaveApplications(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.leaveService.getAllLeaveApplications().subscribe(
      (data) => {
        this.leaveApplications = data;
        this.leaveAprouved= this.leaveApplications.filter(leave => leave.status=="Approved")
        this.leaveRejected= this.leaveApplications.filter(leave => leave.status=="Rejected")
        this.leavePending= this.leaveApplications.filter(leave => leave.status=="PENDING")
        this.basicData = {
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

      this.basicOptions = {
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
        console.error('Error fetching leave applications:', error);
      }
    );
  }




  getLoanApplications(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.loanRequestService.getAllLoanApplications().subscribe(
      (data) => {
        this.loanRequests = data;
        this.loanAprouved= this.loanRequests.filter((loanRequest) => loanRequest.status=="Approved")
        this.loanRejected= this.loanRequests.filter((loanRequest) => loanRequest.status=="Rejected")
        this.loanPending= this.loanRequests.filter((loanRequest)  => loanRequest.status=="Pending")


        this.basicDataLoan = {
          labels: ['Approved', 'Rejected', 'PEnding'],
          datasets: [
              {
                  label: 'loan',
                  data: [this.loanAprouved.length, this.loanRejected.length, this.loanPending.length],
                  backgroundColor: ['rgba(255, 159, 64, 0.2)', ' rgba(255, 0, 0, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                  borderColor: ['rgb(255, 159, 64)', ' rgba(255, 0, 0, 0.2)', 'rgb(54, 162, 235)'],
                  borderWidth: 1
              }
          ]
      };

      this.basicOptionsLoan = {
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

      },
      (error) => {
        console.error('Error fetching loan applications:', error);
      }
    );
  }

  getPersonalChangeRequests(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this. personalchangeRequestService.getAllPersonalChangeRequest().subscribe(
      (data) => {
        this.personalChangeRequests = data;
        this.personalChangeRequestsApproved = this.personalChangeRequests.filter(request => request.status === "Approved");
        this.personalChangeRequestsRejected = this.personalChangeRequests.filter(request => request.status === "Rejected");
        this.personalChangeRequestsPending = this.personalChangeRequests.filter(request => request.status === "Pending");


        this.basicDataPersonal = {

          labels: ['Approved', 'Rejected', 'PEnding'],
          datasets: [
              {
                  label: 'Personal_Change_Request',
                  data: [this.personalChangeRequestsApproved.length, this.personalChangeRequestsRejected.length, this.personalChangeRequestsPending.length],
                  backgroundColor: ['rgba(255, 159, 64, 0.2)', ' rgba(255, 0, 0, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                  borderColor: ['rgb(255, 159, 64)', ' rgba(255, 0, 0, 0.2)', 'rgb(54, 162, 235)'],
                  borderWidth: 1
                }
              ]
          };
          this.basicOptionsPersonal = {
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

        },
        (error) => {
          console.error('Error fetching loan applications:', error);
        }
      );
    }

    getProfessionalRequest(): void {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.professionalMutationRequestService.getAllProfessionalMutationRequest().subscribe(
          (data) => {
              this.ProfessionalRequest = data;
              this.professionalRequestsApproved = this.ProfessionalRequest.filter(request => request.status === "Approved");
              this.professionalRequestsRejected = this.ProfessionalRequest.filter(request => request.status === "Rejected");
              this.professionalRequestsPending = this.ProfessionalRequest.filter(request => request.status === "Pending");

              this.basicDataProfessional= {
                  labels: ['Approved', 'Rejected', 'PEnding'],
                  datasets: [
                      {
                          label: 'professional Mutation Request',
                          data: [  this.professionalRequestsApproved.length, this.professionalRequestsRejected.length, this.professionalRequestsPending.length],
                          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(255, 0, 0, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                          borderColor: ['rgb(255, 159, 64)', 'rgba(255, 0, 0, 0.2)', 'rgb(54, 162, 235)'],
                          borderWidth: 1
                      }
                  ]
              };
              this.basicOptionsProfessional = {
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
  getAdministrativeRequests(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.administrativeRequestService.getALLAdministrativeRequest().subscribe(
      (data) => {
        this.administrativeRequests = data;
        this.administrativeRequestsApproved = this.administrativeRequests.filter(request => request.status === "Approved");
        this.administrativeRequestsRejected = this.administrativeRequests.filter(request => request.status === "Rejected");
        this.administrativeRequestsPending = this.administrativeRequests.filter(request => request.status === "Pending");





        this.basicDataAdministrative = {

          labels: ['Approved', 'Rejected', 'PEnding'],
          datasets: [
              {
                  label: 'Administrative Request',
                  data: [this.administrativeRequestsApproved.length, this.administrativeRequestsRejected.length, this.administrativeRequestsPending.length],
                  backgroundColor: ['rgba(255, 159, 64, 0.2)', ' rgba(255, 0, 0, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                  borderColor: ['rgb(255, 159, 64)', ' rgba(255, 0, 0, 0.2)', 'rgb(54, 162, 235)'],
                  borderWidth: 1
                }
              ]
          };
          this.basicOptionsAdministrative = {
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

        },
        (error) => {
          console.error('Error fetching loan applications:', error);
        }
      );
    }

    getAuthorizationRequest(): void {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.authorizationRequestService.getAllAuthorizationRequest().subscribe(
        (data) => {
          this.authorizationRequests = data;
          this.authoAprouved= this.authorizationRequests.filter((authorizationRequest) => authorizationRequest.status=="Approved")
          this.authoRejected= this.authorizationRequests.filter((authorizationRequest) => authorizationRequest.status=="Rejected")
          this.authoPending= this.authorizationRequests.filter((authorizationRequest)  => authorizationRequest.status=="Pending")

              this.basicDataAutorization= {
                  labels: ['Approved', 'Rejected', 'PEnding'],
                  datasets: [
                      {
                          label: 'authorization Request',
                          data: [  this.authoAprouved.length, this.authoRejected.length, this.authoPending.length],
                          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(255, 0, 0, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                          borderColor: ['rgb(255, 159, 64)', 'rgba(255, 0, 0, 0.2)', 'rgb(54, 162, 235)'],
                          borderWidth: 1
                      }
                  ]
              };
              this.basicOptionsAuthorization = {
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




