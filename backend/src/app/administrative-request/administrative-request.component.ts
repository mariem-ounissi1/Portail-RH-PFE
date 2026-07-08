import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdministrativeRequestService } from '../_services/administrative.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-administrative-request',
  templateUrl: './administrative-request.component.html',
  styleUrls: ['./administrative-request.component.css']
})
export class AdministrativeRequestComponent implements OnInit {

  administrativeRequestForm: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, private administrativeRequestService: AdministrativeRequestService, private storageService: StorageService, private router: Router) {
    this.user = this.storageService.getUser();
    this.administrativeRequestForm = this.fb.group({
      fullName: [this.user.username, Validators.required],
      service: [this.user.service, Validators.required],
      typeOfDocumentRequested: ['', Validators.required],
      reasonForRequest: ['', Validators.required],
      baseSalary: ['', Validators.required],
      netSalary: ['', Validators.required],
      hoursWorked: ['', Validators.required],
      startDateOfEmployment: [this.user.startDateEmployee, Validators.required],
      hoursWorkedPerWeek: ['', Validators.required],
      typeOfContract: ['', Validators.required],
      file5:['']
    });
  }

  ngOnInit(): void {}

  submitAdministrativeRequest() {
    const formValues = this.administrativeRequestForm.value;
    if (this.administrativeRequestForm.valid) {
      this.administrativeRequestService.submitAdministrative(formValues).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Your Request Submitted',
            text: 'Your Request has been submitted successfully!'
          });
          this.administrativeRequestForm.reset();
          this.router.navigate(['/home/ListadministrativeRequest']);
        },
        (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        }
      );
    } else {
      this.checkFormErrors();
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields',
        text: 'Please fill out all fields before submitting.'
      });
    }
  }

  checkFormErrors() {
    for (const control in this.administrativeRequestForm.controls) {
      if (this.administrativeRequestForm.controls.hasOwnProperty(control)) {
        const formControl = this.administrativeRequestForm.get(control);
        if (formControl && formControl.invalid) {
          console.log(`${control} is invalid`);
        }
      }
    }
  }

  SelctOption(event: any) {
    const option = event.target.value;
    if (option === 'salary Certificate') {
      this.administrativeRequestForm.get('baseSalary')?.setValidators(Validators.required);
      this.administrativeRequestForm.get('netSalary')?.setValidators(Validators.required);
      this.administrativeRequestForm.get('hoursWorked')?.clearValidators();
      this.administrativeRequestForm.get('hoursWorkedPerWeek')?.clearValidators();
      this.administrativeRequestForm.get('startDateOfEmployment')?.clearValidators();
      this.administrativeRequestForm.get('typeOfContract')?.clearValidators();
    } else if (option === 'Work certificate') {
      this.administrativeRequestForm.get('hoursWorked')?.setValidators(Validators.required);
      this.administrativeRequestForm.get('hoursWorkedPerWeek')?.setValidators(Validators.required);
      this.administrativeRequestForm.get('typeOfContract')?.setValidators(Validators.required);
      this.administrativeRequestForm.get('startDateOfEmployment')?.setValidators(Validators.required);
      this.administrativeRequestForm.get('baseSalary')?.clearValidators();
      this.administrativeRequestForm.get('netSalary')?.clearValidators();
    }
    this.administrativeRequestForm.get('baseSalary')?.updateValueAndValidity();
    this.administrativeRequestForm.get('netSalary')?.updateValueAndValidity();
    this.administrativeRequestForm.get('hoursWorked')?.updateValueAndValidity();
    this.administrativeRequestForm.get('hoursWorkedPerWeek')?.updateValueAndValidity();
    this.administrativeRequestForm.get('startDateOfEmployment')?.updateValueAndValidity();
    this.administrativeRequestForm.get('typeOfContract')?.updateValueAndValidity();
  }
  photo:any;
    recuperFile(fileInput: any){
      this.photo = fileInput.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.photo);
      fileReader.onload = (e: any) => {
      console.log('fileReader.result');
      console.log(fileReader.result);
      this.administrativeRequestForm.get('file1')?.setValue(fileReader.result);
      };}
}
