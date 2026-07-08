import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class moderatorprofessionalMutationRequestService {

  private baseUrl = 'http://localhost:8081/api/user/professional_mutation_request';
  private baseAdminUrl = 'http://localhost:8081/api/moderator/professional_mutation_requests';


  constructor(private http: HttpClient, private storageService: StorageService) {}

  submitProfessionalMutationRequest(professionalMutationRequest:any): Observable<any> {
    const username = this.storageService.getUser().username;
    return this.http.post<any[]>(`${this.baseUrl}/submit?username=${username}`, professionalMutationRequest);
  }

  getProfessionalMutationRequestHistory(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history?username=${username}`);
  }

  getAllProfessionalMutationRequest(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/api/moderator/professional_mutation_requests/all-ProfessionalMutationRequest`);
  }

  getProfessionalRequestService(service: string): Observable<any> {
    return this.http.get('http://localhost:8081/api/moderator/professional_mutation_requests/applicationsService?service=' + service);
  }

  approveProfessionalMutationRequest(applicationId: number): Observable<any> {
    return this.http.post(`${this.baseAdminUrl}/approve-professional-mutation-requests/${applicationId}`, {});
  }

  rejectProfessionalMutationRequest(applicationId: number): Observable<any> {
    return this.http.post(`${this.baseAdminUrl}/reject-professional-mutation-requests/${applicationId}`, {});
  }
}
