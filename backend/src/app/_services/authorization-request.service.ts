// authorization-request.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root',
})
export class AuthorizationRequestService {
  private baseUrl = 'http://localhost:8081/api/user/authorization-requests';


  constructor(private http: HttpClient, private storageService: StorageService) {}

  submitAuthorizationRequest(authorizationRequest: any): Observable<any> {
    const username = this.storageService.getUser().username;
    return this.http.post<any>(`${this.baseUrl}/submit?username=${username}`, authorizationRequest);
  }

  getAuthorizationRequestHistory(username: string): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/history?username=${username}`);}


    getAllAuthorizationRequest(): Observable<any[]> {
      return this.http.get<any[]>(`http://localhost:8081/api/admin/authorization-requests/all-authorization-requests`)

    }

    approveAuthorization(applicationId: number): Observable<any> {
      return this.http.post(`http://localhost:8081/api/admin/authorization-requests/approve-authorization/${applicationId}`, {});
    }



    rejectAuthorization(applicationId: number): Observable<any> {

      return this.http.post(`http://localhost:8081/api/admin/authorization-requests/reject-authorizaton/${applicationId}`, {});
    }




}
