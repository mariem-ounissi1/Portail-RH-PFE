import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { EditService } from '../_services/edit.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  imageUrl!: string; // Using definite assignment assertion operator
  editingPhoneNumber: boolean = false;
  newPhoneNumber: string = '';
  editingPassword: boolean = false;
  newPassword: string = '';

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private userService: UserService,
    private editService: EditService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserById(this.currentUser.id).subscribe(res => {
      this.currentUser = res;
      this.editPhoneNumber();
      this.savePhoneNumber();
      this.savePassword();
      this.editPassword();
    });

    // Retrieve imageUrl from localStorage
    this.imageUrl = localStorage.getItem('imageUrl') || '';
  }

  onFileSelected(event: Event): void { // Explicitly specifying the type as Event
    const fileInput = event.target as HTMLInputElement;
    const file: File | null = fileInput.files && fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;

        // Save imageUrl to localStorage
        localStorage.setItem('imageUrl', this.imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  editPhoneNumber(): void {
    this.editingPhoneNumber = true;
    this.newPhoneNumber = this.currentUser.phoneNumber;
  }

  savePhoneNumber(): void {
    // Call the editUser method from UserService to update the user's phone number
    this.userService.editUser({ ...this.currentUser, phoneNumber: this.newPhoneNumber }).subscribe(() => {
      this.editingPhoneNumber = false;
      this.currentUser.phoneNumber = this.newPhoneNumber;
      this.newPhoneNumber = '';
    });
  }

  editPassword(): void {
    this.editingPassword = true;
    this.newPassword = '';
  }

  savePassword(): void {
    // Create a new object that contains all the user properties, including the new password
    const updatedUser = { ...this.currentUser, password: this.newPassword };

    // Call the updateUser method from EditService to update the user's password
    this.editService.updateUser(this.currentUser.id, updatedUser).subscribe(() => {
      this.editingPassword = false;
      this.currentUser.password = this.newPassword;
      this.newPassword = '';
    });
  }
}
