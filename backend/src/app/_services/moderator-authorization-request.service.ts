import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const MOD_URL = 'http://localhost:8081/api/moderator/authorization-requests/';

@Injectable({
  providedIn: 'root',
})
export class ModeratorAuthorizationRequestService {
  private baseUrl = 'http://localhost:8081/api/user/authorization-requests';


  constructor(private http: HttpClient, private storageService: StorageService) {}

    submitAuthorizationRequest(authorizationRequest: any): Observable<any> {
    const username = this.storageService.getUser().username;
    return this.http.post<any>(`${this.baseUrl}/submit?username=${username}`, authorizationRequest);
     }

     getAuthorizationRequestHistory(username: string): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/history?username=${username}`);
    }
     getAuthorizationRequestService(service: string): Observable<any> {
      return this.http.get(MOD_URL + 'applicationsService?service=' + service);
    }

    getAllAuthorizationRequest(): Observable<any[]> {
      return this.http.get<any[]>(`http://localhost:8081/api/moderator/authorization-requests/all-authorization-requests`)

    }

    approveAuthorization(applicationId: number): Observable<any> {
      return this.http.post(`http://localhost:8081/api/moderator/authorization-requests/approve-authorization/${applicationId}`, {}); }



    rejectAuthorization(applicationId: number): Observable<any> {

      return this.http.post(`http://localhost:8081/api/moderator/authorization-requests/reject-authorizaton/${applicationId}`, {});
    }
}
