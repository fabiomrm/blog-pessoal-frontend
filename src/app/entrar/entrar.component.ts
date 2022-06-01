import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';

import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
  }

  entrar() {
    this.authService.entrar(this.usuarioLogin).subscribe({
      next: ((res: UsuarioLogin) => {
        this.usuarioLogin = res;
        environment.token = this.usuarioLogin.token;
        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome;
        environment.foto = this.usuarioLogin.foto;

        console.log({ ...environment })

        this.router.navigate(['/inicio']);
      }),
      error: err => {
        if (err.status === 401) {
          alert('Usuário ou senha incorretos')
        }
      }
    })
  }

}
