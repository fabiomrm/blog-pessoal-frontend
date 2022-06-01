import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {


  usuario: Usuario = new Usuario();
  confirmarSenh: string;
  tipoUsuario: string;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  confirmSenha(e: any) {
    this.confirmarSenh = e.target.value;
  }

  tipoUser(e: any) {
    this.tipoUsuario = e.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario
    if (this.usuario.senha !== this.confirmarSenh) {
      alert('senha incorretas')
    } else {

      this.authService.cadastrar(this.usuario).subscribe({
        next: (res: Usuario) => {
          this.usuario = res
          this.router.navigate(['/entrar'])
          alert('Usuário cadastrado com sucesso')
        }
      })
    }
  }

}
