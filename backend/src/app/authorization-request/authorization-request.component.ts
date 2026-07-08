import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthorizationRequestService } from '../_services/authorization-request.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-authorization-request',
  templateUrl: './authorization-request.component.html',
  styleUrls: ['./authorization-request.component.css']
})
export class AuthorizationRequestComponent implements OnInit  {

  authorizationForm: FormGroup;
  content?: string;
  username?: string;
  authoRequests: any[] = [];
  user: any;



  constructor(private fb: FormBuilder, private authorizationRequestService: AuthorizationRequestService, private storageService: StorageService, private userService:UserService, private router: Router) {
    this.user = this.storageService.getUser();
    this.authorizationForm = this.fb.group({
      full_username: [ this.user.username+" "+this.user.lastName, Validators.required],
      position: [this.user.post, Validators.required],
      service: [this.user.service, Validators.required],
      type: ['', Validators.required],
      date_debut:['',Validators.required],
      date_fin: ['', Validators.required],
      reason: ['', Validators.required],
      file1: [''],
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {

    this.username = this.storageService.getUser().username; // Adjust this based on your storage service
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.error('Error:', err);
      }
    });


  }
  submitAuthorizationRequest() {
    const authRequests = this.authorizationForm.value;

    if (this.authorizationForm.valid) {
      this.authorizationRequestService.submitAuthorizationRequest(authRequests).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Your Request Submitted',
            text: 'Your authorization request has been submitted successfully!'
          });
          this.authorizationForm.reset();
          this.router.navigate(['/home/authorizaion-liste']);
        },

      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields',
        text: 'Please fill out all fields before submitting.'
      });
    }
  }

  dateRangeValidator(control: FormControl) {
    const startDate = control.get('date_debut')?.value;
    const endDate = control.get('date_fin')?.value;
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      return { invalidDateRange: true };
    }
    return null;
  }

  photo:any;
  recuperFile(fileInput: any){
    this.photo = fileInput.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.photo);
    fileReader.onload = (e: any) => {
    console.log('fileReader.result');
    console.log(fileReader.result);
    this.authorizationForm.get('file1')?.setValue(fileReader.result);
    };}
}


