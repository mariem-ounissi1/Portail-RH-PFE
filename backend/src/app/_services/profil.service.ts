import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`/api/profile?userId=${userId}`);
  }
}
