import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>("https://fmrm-blog-pessoal.herokuapp.com/usuarios/logar", usuarioLogin)
  }

  cadastrar(usuario: Usuario) {
    return this.http.post<Usuario>('https://fmrm-blog-pessoal.herokuapp.com/usuarios/cadastrar', usuario)

  }
}
