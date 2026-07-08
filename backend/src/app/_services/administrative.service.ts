import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeRequestService {

  private baseUrl = 'http://localhost:8081/api/user/administrative-requests';
  private baseAdmin = 'http://localhost:8081/api/admin/administrative-requests';

  constructor(private http: HttpClient,private storageService:StorageService) { }

  submitAdministrative(administrativeRequest: FormData): Observable<any> {
    const username = this.storageService.getUser().username;
    return this.http.post<any>(`${this.baseUrl}/submit?username=${username}`, administrativeRequest);
  }

  getAdministrativeRequestHistory(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history?username=${username}`);
  }
  getALLAdministrativeRequest(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseAdmin}/all-administrativeRequest`);
  }

  approveAdministrativeRequest(applicationId: number): Observable<any[]> {

    return this.http.post<any[]>(`${this.baseAdmin}/approve-administrative/${applicationId}`,{});
  }

  rejectAdministrativeRequest(applicationId: number): Observable<any[]> {

    return this.http.post<any[]>(`${this.baseAdmin}/reject-administrative/${applicationId}`,{});
  }

}
