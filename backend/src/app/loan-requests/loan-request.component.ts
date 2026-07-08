import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoanRequestService } from '../_services/loan-request.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-loan-requests',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css']
})
export class LoanRequestsComponent {

  loanForm: FormGroup;
  loanRequests: any[] = [];
  user: any;


  constructor(private fb: FormBuilder, private loanRequestService: LoanRequestService, private storageService: StorageService, private router: Router) {
    this.user = this.storageService.getUser();
    this.loanForm = this.fb.group({
      firstName: [this.user.username, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      address: [this.user.address, Validators.required],
      //dateOfHiring: [this.user.dateOfHiring, Validators.required],
      loanType: ['', Validators.required],
      desiredAmount: ['', Validators.required],
      file1: [''],
      // Add more form fields as needed
    });
  }

  ngOnInit(): void {
    // Fetch loan request history when the component initializes

  }

  submitLoanRequest() {
    if (this.loanForm.valid) {
      const loanRequest = this.loanForm.getRawValue(); // getRawValue to include disabled fields
      this.loanRequestService.submitLoanRequest(loanRequest).subscribe(
        (response) => {
          Swal.fire('Success', 'Your loan application has been submitted successfully!', 'success');
          this.loanForm.reset();
          this.router.navigate(['/home/loans-liste']);
        },
        (error) => {
          Swal.fire('Error', 'There was an error submitting your loan application. Please try again.', 'error');
        }
      );
    } else {
      Swal.fire('Empty Fields', 'Please fill out all fields before submitting.', 'warning');
    }
  }

  photo:any;
  recuperFile(fileInput: any){
    this.photo = fileInput.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.photo);
    fileReader.onload = (e: any) => {
    console.log('fileReader.result');
    console.log(fileReader.result);
    this.loanForm.get('file1')?.setValue(fileReader.result);
    };


}

}
