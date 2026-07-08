import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }


  register(username:string,lastName:string ,email:string, password:string ,service:string,birthDate:string,dateOfHiring:Date,civility:string,phoneNumber:string,post:string, address:string,startDateEmployee:Date,actif:boolean, role: string[]): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        lastName,
        email,
        password,
        service,
        birthDate,
        dateOfHiring,
        civility,
         phoneNumber,
         post,
        address,
        startDateEmployee,
        actif,
        role,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
