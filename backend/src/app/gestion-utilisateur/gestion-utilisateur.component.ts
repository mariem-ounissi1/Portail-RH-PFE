import { Location } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.css']
})
export class GestionUtilisateurComponent implements OnInit {
  listUser: any[] = [];
  filteredUsers: any[] = [];
  editUSerForm: FormGroup;
  @ViewChild("closeModal") closeModal!: ElementRef;

  constructor(
    private userService: UserService,
    private builder: FormBuilder,
    private ngZone: NgZone,
    private location: Location // Inject NgZone
  ) {
    this.editUSerForm = this.builder.group({
      id: [],
      username: [],
      lastName: [],
      email: [],
      password: [],
      birthDate: [],
      civility: [],
      post: [],
      phoneNumber: [],
      address: [],
      service: [],
      dateOfHiring: [],
      startDateEmployee: [],
      roles: [],
    });
  }

  ngOnInit(): void {
    this.refreshUserList();
  }

  refreshUserList(): void {
    this.userService.getAllUser().subscribe(res => {
      this.listUser = res;
      this.filteredUsers = res; // Initialize filteredUsers with all users
    });
  }

  recupererUser(user: any): void {
    this.editUSerForm.setValue({
      id: user.id,
      username: user.username,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
      civility: user.civility,
      post: user.post,
      phoneNumber: user.phoneNumber,
      address: user.address,
      service: user.service,
      dateOfHiring: user.dateOfHiring,
      startDateEmployee: user.startDateEmployee,
      roles: user.roles,
    });
  }

  editUser(): void {
    this.userService.editUser(this.editUSerForm.value).subscribe(res => {
      this.refreshUserList();
      this.ngZone.run(() => {
        this.closeModal.nativeElement.click();
      });
    });
  }

  enableUser(id: number): void {
    this.userService.enableUser(id).subscribe({
      next: (res) => {
        console.log('User enabled successfully:', res);
        Swal.fire('Success', res.message, 'success');
        this.refreshUserList(); // Refresh the user list
      },
      error: (err) => {
        console.error('Error enabling user:', err);
      }
    });
  }

  disableUser(id: number): void {
    this.userService.disableUser(id).subscribe({
      next: (res) => {
        console.log('User disabled successfully:', res);
        Swal.fire('Success', 'User disabled successfully!', 'success');
        this.refreshUserList(); // Refresh the user list
      },
      error: (err) => {
        console.error('Error disabling user:', err);
      }
    });
  }

  filterUsers(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();

    this.filteredUsers = this.listUser.filter(user =>
      user.username.toLowerCase().includes(searchTerm)
    );
  }
}
