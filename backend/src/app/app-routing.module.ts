import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminApproveAdministrativeRequestComponent } from './admin-approve-administrative-request/admin-approve-administrative-request.component';
import { AdminApproveAuthorizationComponent } from './admin-approve-authorization/admin-approve-authorization.component';
import { AdminApproveLeaveComponent } from './admin-approve-leave/admin-approve-leave.component';
import { AdminApproveLoanComponent } from './admin-approve-loan/admin-approve-loan.component';
import { AdminApprovePersonalChangeRequestComponent } from './admin-approve-personal-change-request/admin-approve-personal-change-request.component';
import { AdminApproveProfessionelMutationComponent } from './admin-approve-professionel-mutation/admin-approve-professionel-mutation.component';
import { AdministrativeRequestListeComponent } from './administrative-request-liste/administrative-request-liste.component';
import { AdministrativeRequestComponent } from './administrative-request/administrative-request.component';
import { AuthorizationRequestListComponent } from './authorization-request-list/authorization-request-list.component';
import { AuthorizationRequestComponent } from './authorization-request/authorization-request.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { DashboardModeratorComponent } from './dashboard-moderator/dashboard-moderator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import { HomeComponent } from './home/home.component';
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



const routes: Routes = [
  { path: 'home', component: HomeComponent ,children:[
    { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  {path: 'leave' , component: LeaveApplicationComponent},
  { path: 'leave-applications', component: LeaveApplicationsListComponentComponent },
  { path: 'leave-approvals', component: AdminApproveLeaveComponent },
  { path: 'loan-request',component:LoanRequestsComponent  },
  {path:'loan-requests',component:AdminApproveLoanComponent},
  {path:'loans-liste',component:LoanRequestsListComponent},
  {path:'dashbord',component:DashboardComponent},
  {path:'authorizaion',component:AuthorizationRequestComponent},
  {path:'authorizaion-liste',component:AuthorizationRequestListComponent},
  {path:'authorizaion-approvals',component:AdminApproveAuthorizationComponent},
  {path:'personal',component:PersonalChangeRequestComponent},
  {path:'personal-change-liste',component:PersonalChangeRequestListComponent},
  {path:'personal-change-approvals',component:AdminApprovePersonalChangeRequestComponent},
  { path: 'leave-Moderator-approvals', component:ModeratorApproveLeaveComponent  },
  {path:'moderator-authorizaion-approvals',component:ModeratorApproveAuthorizationComponent},
  {path:'professional-request',component:ProfessionalMutationRequestComponent},
  {path:'professional-request-liste',component:ProfessionalMutationRequestListComponent},
  {path:'admin-professional-request',component:AdminApproveProfessionelMutationComponent},
  {path:'moderator-professional-request',component:ModeratorApproveProfessionalMutationRequestComponent},
  {path:'gestionUser',component:GestionUtilisateurComponent},
  { path: 'register', component: RegisterComponent },
  {path:'administrativeRequest',component:AdministrativeRequestComponent},
  {path:'ListadministrativeRequest',component:AdministrativeRequestListeComponent},
  {path:'administrative-approvals',component:AdminApproveAdministrativeRequestComponent},
  {path:'dashboard-moderator',component:DashboardModeratorComponent},
  {path: 'services-create', component:CreateServiceComponent},
  {path: 'service-list', component:ServicesComponent}

  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
