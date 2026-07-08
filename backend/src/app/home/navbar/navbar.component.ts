import { Component, ElementRef } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { ImageService } from 'src/app/_services/image.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


   roles: string[] = [];
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
  GestionUser=false;
  username?: string;

  eventBusSub?: Subscription;
  showusers: any;
  showApplyLoans: any;

  title: any;

  showLogin = true;
  toggleButton: HTMLElement | null = null; // Déclaration de la variable toggleButton
  body: HTMLElement | null = null; // Déclaration de la variable body
  isMenuOpen:boolean= false;
  imageUrl: string;
  isDarkMode: boolean = false;



  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private  MatListModule: MatListModule,
    private  MatSidenavModule: MatSidenavModule,
    private router: Router,
    private imageService:ImageService,
    private elementRef: ElementRef

  ) {
    this.imageUrl=this.storageService.getUser().imageUrl;
    this.username = this.storageService.getUser().username;
    this.roles=this.storageService.getUser().roles;
  }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showApplyLeave = this.roles.includes('ROLE_USER');
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.approvalManagement = this.roles.includes('ROLE_ADMIN');                           //this.roles.some(role => role === 'ROLE_ADMIN' || role === 'ROLE_MODERATOR');
      this.registerUser=this.roles.includes('ROLE_ADMIN');
      this.showApplyLoans= this.roles.includes('ROLE_USER');
      this.approvalLoans=this.roles.includes('ROLE_ADMIN');
      this.showdashboard=this.roles.includes('ROLE_ADMIN');
      this.showAuthorizationRequest= this.roles.includes('ROLE_USER');
      this.approvalsAuthorization=this.roles.includes('ROLE_ADMIN');
      this.showPersonalChangeRequest= this.roles.includes('ROLE_USER');
      this.approvalsPersonalChange=this.roles.includes('ROLE_ADMIN');
      this.approvalsAuthorizationModerator=this.roles.includes('ROLE_MODERATOR');
      this.approvalLeaveManagementModerator=this.roles.includes('ROLE_MODERATOR');
      this.showProfessionalRequest=this.roles.includes('ROLE_USER');
      this.approvalsProfessionalModerator=this.roles.includes('ROLE_MODERATOR');
      this.approvalsProfessionalAdmin=this.roles.includes('ROLE_ADMIN');
      this.GestionUser=this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
      this.getImage();

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

  toggleMenu() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menuDropdown = document.querySelector('.menu-dropdown');
    hamburgerIcon?.classList.toggle('active');
    menuDropdown?.classList.toggle('show');
  }



  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }


  getImage(): void {
    const userId = 2; // Replace with the current user's ID
    this.imageService.getImage(userId).subscribe(
      (response) => {
        this.imageUrl = URL.createObjectURL(response);
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }


  toggleFullScreen() {
    const elem: any = this.elementRef.nativeElement.ownerDocument.documentElement;
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

}


