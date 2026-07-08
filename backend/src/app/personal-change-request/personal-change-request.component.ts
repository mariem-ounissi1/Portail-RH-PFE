import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonalChangeRequesttService } from '../_services/personal-change-request.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-personal-change-request',
  templateUrl: './personal-change-request.component.html',
  styleUrls: ['./personal-change-request.component.css'],
  providers:[DatePipe]
})
export class PersonalChangeRequestComponent implements OnInit {

  personalChangeRequestForm: FormGroup;

  personalRequests: any[] = [];
  user: any;

  constructor(
    private fb: FormBuilder,
    private personalChangeRequesttService: PersonalChangeRequesttService , // Corrected service name
    private storageService: StorageService,
    private router: Router,
    private datePipe:DatePipe
  ) {
    this.user = this.storageService.getUser();
    this.personalChangeRequestForm = this.fb.group({
      fullName :[this.user.username+" "+this.user.lastName, Validators.required],
      changeDetails: ['', Validators.required], // Corrected form control name
      processingDate: ['', Validators.required], // Corrected form control name

      changeType: ['', Validators.required], // Corrected form control name
      valueChange:[]
      // Add more form fields as needed
    });
  }

  ngOnInit(): void {
  }
  submitPersonalChangeRequest() {
    if(this.TestOption=='Birthday'){
      this.personalChangeRequestForm.get('valueChange')?.setValue(this.datePipe.transform(this.personalChangeRequestForm.get('valueChange')?.value,'yyyy-MM-dd'))
    }
    const authoRequests = this.personalChangeRequestForm.value;
    if (this.personalChangeRequestForm.valid) {
    this.personalChangeRequesttService.submitPersonalChangeRequest(authoRequests).subscribe(
      (response: any) => {



        Swal.fire({
          icon: 'success',
          title: 'Your Request Submitted',
          text: 'Your Request has been submitted successfully!'
        });

        this.personalChangeRequestForm.reset();
        this.router.navigate(['/home/personal-change-liste']);
      },

    );}else {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields',
        text: 'Please fill out all fields before submitting.'
      });
    }
  }

  showInput: boolean = false;
  TestOption: string = '';

  SelctOption(event:any) {
    const option = event.target.value;
     if (option === 'address') {
      this.showInput = true;
      this.TestOption = 'Address';
    } else if (option === 'email') {
      this.showInput = true;
      this.TestOption = 'E-mail';
    } else if (option === 'civility') {
      this.showInput = true;
      this.TestOption = 'Civility';
    } else if (option === 'Service') {
      this.showInput = true;
      this.TestOption = 'Service';
    } else if (option === 'birthDate') {
      this.showInput = true;
      this.TestOption = 'Birthday';
    } else if (option === 'post') {
      this.showInput = true;
      this.TestOption = 'personal';
    } else {
      this.showInput = false;
    }
  }

}
