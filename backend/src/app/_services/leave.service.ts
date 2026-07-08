// leave.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/user/'; // Adjust the URL based on your Spring Boot configuration
const DEV_URL = 'http://localhost:8081/api/admin/';
const dev_URL=  'http://localhost:8081/api/moderator/';// Adjust the URL based on your Spring Boot configuration
@Injectable({
  providedIn: 'root',
})
export class LeaveService {

  private apiUrl =  'http://localhost:8081/api/admin/all-leave-applications';
  constructor(private http: HttpClient) {}

  applyLeave(username: string, leaveDetails: any): Observable<any> {
    return this.http.post(API_URL + 'apply-leave?username=' + username, leaveDetails);

  }


  getLeaveApplications(username: string): Observable<any> {
    return this.http.get(API_URL + 'applications?username=' + username);
  }

  getAllLeaveApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }



   approveLeave(applicationId: number): Observable<any> {
    return this.http.post(DEV_URL + 'approve-leave/'+applicationId, {});
  }

  rejectLeave(applicationId: number): Observable<any> {
    return this.http.post(DEV_URL + 'reject-leave/'+applicationId, {});
}
  }
