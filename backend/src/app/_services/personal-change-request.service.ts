import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class PersonalChangeRequesttService {

  private baseUrl = 'http://localhost:8081/api/user/personal-change-requests';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  submitPersonalChangeRequest(personalChangeRequest: any): Observable<any> {
    const username = this.storageService.getUser().username;
    return this.http.post<any>(`${this.baseUrl}/submit?username=${username}`, personalChangeRequest);
  }

  getPersonalChangeRequestHistory(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history?username=${username}`);
  }

  getAllPersonalChangeRequest(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/api/admin/personal-change-requests/all-PersonalChangeRequest`);
  }

  approvePersonalChangeRequest(applicationId: number): Observable<any> {
    return this.http.post(`http://localhost:8081/api/admin/personal-change-requests/approve-personal-change-requests/${applicationId}`, {});
  }

  rejectPersonalChangeRequest(applicationId: number): Observable<any> {
    return this.http.post(`http://localhost:8081/api/admin/personal-change-requests/reject-personal-change-requests/${applicationId}`, {});
  }



}
