import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario();
  idUsuario: number;
  confirmarSenh: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    if (environment.token === '') {
      this.router.navigate(['/entrar'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUser(this.idUsuario)
  }

  confirmSenha(e: any) {
    this.confirmarSenh = e.target.value;
  }

  tipoUser(e: any) {
    this.tipoUsuario = e.target.value;
  }

  atualizar() {
    this.usuario.tipo = this.tipoUsuario
    if (this.usuario.senha !== this.confirmarSenh) {
      alert('senha incorretas')
    } else {

      this.authService.cadastrar(this.usuario).subscribe({
        next: (res: Usuario) => {
          this.usuario = res
          this.router.navigate(['/inicio'])
          alert('Usuário cadastrado com sucesso, faça login novamente')
          environment.token = '';
          environment.foto = '';
          environment.nome = '';
          environment.id = 0;
          this.router.navigate(['/entrar'])
        }
      })
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUsuario(id).subscribe({
      next: (res: Usuario) => {

      }
    })
  }

}
