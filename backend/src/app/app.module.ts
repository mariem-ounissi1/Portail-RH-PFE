import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AdminApproveLeaveComponent } from './admin-approve-leave/admin-approve-leave.component';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';


import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartModule } from 'primeng/chart';
import { AdminApproveAdministrativeRequestComponent } from './admin-approve-administrative-request/admin-approve-administrative-request.component';
import { AdminApproveAuthorizationComponent } from './admin-approve-authorization/admin-approve-authorization.component';
import { AdminApproveLoanComponent } from './admin-approve-loan/admin-approve-loan.component';
import { AdminApprovePersonalChangeRequestComponent } from './admin-approve-personal-change-request/admin-approve-personal-change-request.component';
import { AdminApproveProfessionelMutationComponent } from './admin-approve-professionel-mutation/admin-approve-professionel-mutation.component';
import { AdministrativeRequestListeComponent } from './administrative-request-liste/administrative-request-liste.component';
import { AdministrativeRequestComponent } from './administrative-request/administrative-request.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationRequestListComponent } from './authorization-request-list/authorization-request-list.component';
import { AuthorizationRequestComponent } from './authorization-request/authorization-request.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { DashboardModeratorComponent } from './dashboard-moderator/dashboard-moderator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import { FooterComponent } from './home/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { SidbarComponent } from './home/sidbar/sidbar.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveApplicationsListComponentComponent } from './leave-applications-list-component/leave-applications-list-component.component';
import { LoanRequestsListComponent } from './loan-requests-list/loan-requests-list.component';
import { LoanRequestsComponent } from './loan-requests/loan-request.component';
import { LoginComponent } from './login/login.component';
import { ModeratorApproveAuthorizationComponent } from './moderator-approve-authorization/moderator-approve-authorization.component';
import { ModeratorApproveLeaveComponent } from './moderator-approve-leave/moderator-approve-leave.component';
import { ModeratorApproveProfessionalMutationRequestComponent } from './moderator-approve-professional-mutation-request/moderator-approve-professional-mutation-request.component';
import { PersonalChangeRequestListComponent } from './personal-change-request-list/personal-change-request-list.component';
import { PersonalChangeRequestComponent } from './personal-change-request/personal-change-request.component';
import { ProfessionalMutationRequestListComponent } from './professional-mutation-request-list/professional-mutation-request-list.component';
import { ProfessionalMutationRequestComponent } from './professional-mutation-request/professional-mutation-request.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';
import { CreateServiceComponent } from './create-service/create-service.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    LeaveApplicationComponent,
    LeaveApplicationsListComponentComponent,
    AdminApproveLeaveComponent,
    AdminApproveLoanComponent,

    LoanRequestsComponent,
    LoanRequestsListComponent,
    DashboardComponent,
     AuthorizationRequestComponent,
     AuthorizationRequestListComponent,
     AdminApproveAuthorizationComponent,
     PersonalChangeRequestComponent,
     PersonalChangeRequestListComponent,
     AdminApprovePersonalChangeRequestComponent,
     ModeratorApproveLeaveComponent,
     ModeratorApproveAuthorizationComponent,
     ProfessionalMutationRequestComponent,
     ProfessionalMutationRequestListComponent,
     AdminApproveProfessionelMutationComponent,
     ModeratorApproveProfessionalMutationRequestComponent,
     GestionUtilisateurComponent,
     NavbarComponent,
     SidbarComponent,
     FooterComponent,
     AdministrativeRequestComponent,
     AdministrativeRequestListeComponent,
     AdminApproveAuthorizationComponent,
     AdminApproveAdministrativeRequestComponent,
     DashboardModeratorComponent,
     ServicesComponent,
     CreateServiceComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    DataTablesModule,
    ChartModule,
    MatSlideToggleModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
