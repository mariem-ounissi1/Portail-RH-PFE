import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/test/';
const API_URL_USER = 'http://localhost:8081/api/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}


  getUserById(idUser:any): Observable<any> {
    return this.http.get<any>(API_URL_USER + idUser);
  }
  getAllUser(){
    return this.http.get<any[]>(API_URL_USER + 'all');
  }

  editUser(user:any){
    return this.http.post<any>(API_URL_USER + 'edit',user);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  enableUser(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL_USER}administrative-requests/enable/${id}`);
  }

  disableUser(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL_USER}administrative-requests/disable/${id}`);
  }




}
