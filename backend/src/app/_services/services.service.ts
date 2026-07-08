import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/services';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private baseUrl = 'http://localhost:8081/api/services'; // Adjust the base URL if necessary


  constructor(private http: HttpClient) {}

  // Create a new service
  createService(service: any): Observable<any> {
    //return this.http.get(API_URL, service);
    return this.http.post(`${this.baseUrl}/create`, service);

  }

  // Get all services
  getServices(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  // Get a specific service by ID
  getServiceById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}${id}`);
  }

  // Update a service
  updateService(id: number, service: any): Observable<any> {
    return this.http.put<any>(`${API_URL}${id}`, service);
  }

  // Delete a service
  deleteService(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/delete/${id}`);
  }
}
