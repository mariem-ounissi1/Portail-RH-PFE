// moderator-leave.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/user/';

const MOD_URL = 'http://localhost:8081/api/moderator/'; // URL for moderator API

@Injectable({
  providedIn: 'root',
})
export class  ModeratorLeaveService {

  private apiUrl =  'http://localhost:8081/api/admin/all-leave-applications';

  constructor(private http: HttpClient) {}

  applyLeave(username: string, leaveDetails: any): Observable<any> {
    return this.http.post(API_URL + 'apply-leave?username=' + username, leaveDetails);
  }

  getLeaveApplications(username: string): Observable<any> {
    return this.http.get(API_URL + 'applications?username=' + username);
  }

  getAllLeaveApplications(): Observable<any[]> {
    // Adjust the URL to include the moderator prefix
    return this.http.get<any[]>(MOD_URL + 'all-leave-applications');
  }

  getLeaveApplicationsService(service: string): Observable<any> {
    return this.http.get(MOD_URL + 'applicationsService?service=' + service);
  }

  approveLeave(applicationId: number): Observable<any> {
    // Adjust the URL to include the moderator prefix
    return this.http.post(MOD_URL + 'approve-leave/' + applicationId, {});
  }

  rejectLeave(applicationId: number): Observable<any> {
    // Adjust the URL to include the moderator prefix
    return this.http.post(MOD_URL + 'reject-leave/' + applicationId, {});
  }
}
