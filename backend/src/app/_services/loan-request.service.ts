import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:8081/api/';  // Adjust the URL

@Injectable({
  providedIn: 'root',
})
export class LoanRequestService {

  constructor(private http: HttpClient, private storageService: StorageService) {}

  submitLoanRequest(loanRequest: any): Observable<any> {
    const username = this.storageService.getUser().username;

    return this.http.post(`${API_URL}user/loan-requests/submit?username=${username}`, loanRequest)
      .pipe(
        catchError(error => {
          console.error('Une erreur s\'est produite lors de la soumission de la demande de prêt :', error);
          return throwError('Une erreur s\'est produite lors de la soumission de la demande de prêt');
        })
      );
  }

  getLoanRequestHistory(username:string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}user/loan-requests/history?username=${username}`)
      .pipe(
        catchError(error => {
          console.error('Une erreur s\'est produite lors de la récupération de l\'historique des demandes de prêt :', error);
          return throwError('Une erreur s\'est produite lors de la récupération de l\'historique des demandes de prêt');
        })
      );
  }

  getAllLoanApplications(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/api/admin/loan-requests/all-loan-applications`)
      .pipe(
        catchError(error => {
          console.error('Une erreur s\'est produite lors de la récupération de toutes les demandes de prêt :', error);
          return throwError('Une erreur s\'est produite lors de la récupération de toutes les demandes de prêt');
        })
      );
  }

  approveLoan(applicationId: number): Observable<any> {
    return this.http.post(`${API_URL}admin/loan-requests/approve-loan/${applicationId}`, {});
  }
    //  .pipe(
      //  catchError(error => {
      //    console.error('Une erreur s\'est produite lors de l\'approbation de la demande de prêt :', error);
      //    return throwError('Une erreur s\'est produite lors de l\'approbation de la demande de prêt');
     //   })
   //   );


  rejectLoan(applicationId: number): Observable<any> {
    //return this.http.put('${API_URL}admin/loan-requests/applicationId=${applicationId}/reject', null);
    return this.http.post(`${API_URL}admin/loan-requests/reject-loan/${applicationId}`, {});
  }

  getLoanRequests(username: String): Observable<any> {
    return this.http.get<any[]>(`${API_URL}user/loan-requests/requests/${username}`);
  }

  getDashboardKpis(): Observable<any> {
    return this.http.get<any>(`${API_URL}admin/loan-requests/dashboard-kpis`)
      .pipe(
        catchError(error => {
          console.error('Une erreur s\'est produite lors de la récupération des KPIs du tableau de bord :', error);
          return throwError('Une erreur s\'est produite lors de la récupération des KPIs du tableau de bord');
        })
      );
  }

}
