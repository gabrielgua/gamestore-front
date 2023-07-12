import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public checkUsername(username: string): Observable<boolean> {

    const request = { username: username }
    console.log(request);
    
    return this.http.post<boolean>(`${environment.API_URL}/usuarios/check-username`, request);
  }
}
