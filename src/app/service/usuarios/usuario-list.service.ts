import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioListService {

  usuarios$ = new BehaviorSubject<Usuario[]>([]);

  constructor(private http: HttpClient) { }
}
