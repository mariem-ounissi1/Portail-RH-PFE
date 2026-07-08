import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicesService } from '../_services/services.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent  implements OnInit {

  serviceForm: FormGroup;
  username?: string;
  content?: string;
  services: any[] = [];



  constructor(private fb: FormBuilder, private servicesService: ServicesService,
     private router: Router, private userService: UserService,private storageService: StorageService
    ) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required]
      // Add more form fields as needed
    });
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

    this.loadServices();
  }

  createService() {
    const service = this.serviceForm.value;

    this.servicesService.createService(service).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Service Created',
          text: 'The service has been created successfully!'
        });

        this.serviceForm.reset();
        //this.router.navigate(['/services']);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Service Not Created',
          text: 'Failed to create the service. Please try again later.'
        });
      }
    );
  }
  loadServices(): void {
    this.servicesService.getServices().subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.error('Error fetching services', error);
      }
    );
  }

  deleteService(id: number): void {
    this.servicesService.deleteService(id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Service Deleted',
          text: 'The service has been deleted successfully!'
        });
        this.loadServices(); // Reload services after deletion
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Service Not Deleted',
          text: 'Failed to delete the service. Please try again later.'
        });
      }
    );
  }
}
