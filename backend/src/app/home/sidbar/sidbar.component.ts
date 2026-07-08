import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent {


  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showApplyLeave = false;
  approvalManagement= false;
  approvalLoans=false;
  registerUser=false;
  showApplyloans=false;
  showdashboard=false;
  showAuthorizationRequest=false;
  approvalsAuthorization=false;
  showPersonalChangeRequest=false;
  showProfessionalRequest=false;
  approvalsPersonalChange=false;
  showApplyLeaveModerator = false;
  approvalLeaveManagementModerator=false;
  approvalsAuthorizationModerator=false;
  approvalsProfessionalModerator=false;
  approvalsProfessionalAdmin=false;
  approvalAdministrative=false;
  GestionUser=false;
  showAdministrativeRequest=false;
  showModeratorDashboard=false;
  username?: string;
  createService=false;
  listService=false;

  eventBusSub?: Subscription;
  showusers: any;
  showApplyLoans: any;

  title: any;

  showLogin = true;

  @Input() isDarkMode: boolean = false;
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private  MatListModule: MatListModule,
    private  MatSidenavModule: MatSidenavModule,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showApplyLeave = this.roles.some(role => ['ROLE_USER', 'ROLE_MODERATOR'].includes(role));
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.approvalManagement = this.roles.includes('ROLE_ADMIN');                           //this.roles.some(role => role === 'ROLE_ADMIN' || role === 'ROLE_MODERATOR');
      this.registerUser=this.roles.includes('ROLE_ADMIN');
      this.showApplyLoans= this.roles.some(role => ['ROLE_USER', 'ROLE_MODERATOR'].includes(role));
      this.approvalLoans=this.roles.includes('ROLE_ADMIN');
      this.showdashboard=this.roles.includes('ROLE_ADMIN');
      this.showAuthorizationRequest= this.roles.some(role => ['ROLE_USER', 'ROLE_MODERATOR'].includes(role));
      this.approvalsAuthorization=this.roles.includes('ROLE_ADMIN');
      this.showPersonalChangeRequest= this.roles.some(role => ['ROLE_USER', 'ROLE_MODERATOR'].includes(role));
      this.approvalsPersonalChange=this.roles.includes('ROLE_ADMIN');
      this.approvalsAuthorizationModerator=this.roles.includes('ROLE_MODERATOR');
      this.approvalLeaveManagementModerator=this.roles.includes('ROLE_MODERATOR');
      this.showProfessionalRequest=this.roles.some(role => ['ROLE_USER', 'ROLE_MODERATOR'].includes(role));
      this.approvalsProfessionalModerator=this.roles.includes('ROLE_MODERATOR');
      this.approvalsProfessionalAdmin=this.roles.includes('ROLE_ADMIN');
      this.GestionUser=this.roles.includes('ROLE_ADMIN');
      this.showAdministrativeRequest=this.roles.some(role => ['ROLE_USER', 'ROLE_MODERATOR'].includes(role));
      this.approvalAdministrative=this.roles.includes('ROLE_ADMIN');
      this.showModeratorDashboard=this.roles.includes('ROLE_MODERATOR');
      this.createService=this.roles.includes('ROLE_ADMIN');
      this.listService=this.roles.includes('ROLE_ADMIN');
      this.username = user.username;

    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });


    this.router.events.subscribe((val) => {
      if (this.router.url === '/login') {
        this.showLogin = false;
      } else {
        this.showLogin =true;
      }
    });

  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.username='';
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(err);
      }
    });
  }


  ngOnDestroy(): void {
    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }



}
