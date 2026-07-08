import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfessionalMutationRequestService } from '../_services/professsionel-request.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-professional-mutation-request',
  templateUrl: './professional-mutation-request.component.html',
  styleUrls: ['./professional-mutation-request.component.css']
})
export class ProfessionalMutationRequestComponent implements OnInit {

  professionalMutationRequestForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private professionalMutationRequestService: ProfessionalMutationRequestService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.user = this.storageService.getUser();
    this.professionalMutationRequestForm = this.fb.group({
      fullName: [this.user.username+" "+this.user.lastName, Validators.required],
      currentPosition: ['', Validators.required],
      reasonForMutation: ['', Validators.required],
      proposedDateOfMutation: ['', Validators.required],
      file1: ['']
    });
  }

  ngOnInit(): void {
  }

  submitProfessionalMutationRequest() {
    const profRequests = this.professionalMutationRequestForm.value;

    if (this.professionalMutationRequestForm.valid) {
      this.professionalMutationRequestService.submitProfessionalMutationRequest(profRequests).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Your Request Submitted',
            text: 'Your Request has been submitted successfully!'
          });

          this.professionalMutationRequestForm.reset();
          this.router.navigate(['/home/professional-request-liste']);
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
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields',
        text: 'Please fill out all fields before submitting.'
      });
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
    this.professionalMutationRequestForm.get('file1')?.setValue(fileReader.result);
    };}

}
