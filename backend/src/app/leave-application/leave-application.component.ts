import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LeaveService } from '../_services/leave.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent implements OnInit {
  visible=false;
  leaveForm: FormGroup;
  content?: string;
  username?: string;
  leaveSubmitted: boolean = false;
  user: any;



  constructor(private router: Router,private fb: FormBuilder, private userService: UserService,private leaveService: LeaveService ,private storageService: StorageService) {
    this.user = this.storageService.getUser();
    this.leaveForm = this.fb.group({
      username:[this.user.username,Validators.required],
      lastName:[this.user.lastName,Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      leaveType: ['', Validators.required],
      leaveMotive: ['', Validators.required],
      file1: [''],


    }, { validator: this.dateRangeValidator });


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
  photo:any;
  recuperFile(fileInput: any){
    this.photo = fileInput.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.photo);
    fileReader.onload = (e: any) => {
    console.log('fileReader.result');
    console.log(fileReader.result);
    this.leaveForm.get('file1')?.setValue(fileReader.result);
    };


}

modifVisible(){
  if(this.leaveForm.get('leaveType')?.value=="Casual Leave"){
    this.visible=false;
  }else{
    this.visible=true;
  }
}
 applyLeave() {
    const formValues = this.leaveForm.value;

    if (this.leaveForm.valid && this.username && formValues.date_debut &&
      formValues.date_fin && formValues.leaveType &&
      formValues.leaveMotive) {

      if (this.leaveForm.hasError('invalidDateRange')) {

      } else {
        this.leaveService.applyLeave(this.username, formValues).subscribe(


        )




          Swal.fire({
            icon: 'success',
            title: 'Your Request Submitted',
            text: 'Your Request has been submitted successfully!',
            });
            this.leaveForm.reset();

          this.router.navigate(['/home/leave-applications']);
      }
    } else {
      Swal.fire('Empty Fields', 'Please fill out all fields before submitting.', 'warning');
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







}
