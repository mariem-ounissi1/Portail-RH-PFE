import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../_services/services.service';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any[] = [];

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.servicesService.getServices().subscribe(data => {
      this.services = data;
    });
  }
}
