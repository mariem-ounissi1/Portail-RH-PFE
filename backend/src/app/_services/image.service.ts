import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://localhost:8081/api/image';

  constructor(private http: HttpClient) { }

  uploadImage(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.baseUrl}/${id}/uploadImage`, formData);
  }

  updateProfilePicture(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.put(`${this.baseUrl}/${id}/updateProfilePicture`, formData);
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get<any>( this.baseUrl+'/'+id+'/getImage', );
  }
}
