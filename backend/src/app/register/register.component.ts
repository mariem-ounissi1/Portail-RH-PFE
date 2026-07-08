import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    lastName:null,
    email: null,
    password: null,
    birthDate: null,
    dateOfHiring: null,
    civility: null,
    post: null,
    phoneNumber: null,
    address: null ,
    service: null ,
    startDateEmployee: null,
    actif: false,
    role:['user'],

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';



  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username,lastName, email, password, service, birthDate,dateOfHiring, civility, phoneNumber, post, address,startDateEmployee,actif, role } = this.form;

    // convert the selected role to an array of strings
    const roleArray = Array.isArray(role) ? role : [role];

    this.authService.register(username,lastName ,email, password, service, birthDate,dateOfHiring, civility, phoneNumber, post, address,startDateEmployee,actif, roleArray).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
