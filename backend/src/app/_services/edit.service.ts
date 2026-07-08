// edit.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private apiUrl = 'http://localhost:8081/api/auth/user/';

  constructor(private http: HttpClient) { }

  updateUser(id: number, user: any) {
    return this.http.put(this.apiUrl+id, user);
  }

}
