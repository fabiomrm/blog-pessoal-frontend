import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem();
  postagens: Postagem[] = [];

  tema: Tema;
  temas: Tema[] = [];
  idTema: number;

  usuario: Usuario = new Usuario();
  idUsuario = environment.id;



  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (environment.token === '') {
      // alert('Sua seção expirou, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.authService.refreshToken();
    this.getAllTemas();
    this.getAllPostagens();
  }



  getAllTemas() {
    this.temaService.getAllTema().subscribe({
      next: (res: Tema[]) => {
        this.temas = res;
      },
      error: err => console.log(err)
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe({
      next: (res: Tema) => {
        console.log(res)
        this.tema = res;
      }
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe({
      next: (res: Postagem[]) => {
        this.postagens = res;
      },
      error: err => console.log(err)
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe({
      next: (res: Usuario) => {

        this.usuario = res;
      },
      error: err => console.log(err)
    })
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.usuario.id = this.idUsuario;
    this.postagem.usuario = this.usuario;

    this.postagemService.postPostagem(this.postagem).subscribe({
      next: (res: Postagem) => {
        this.postagem = res;
        alert("Postagem realizada com sucesso!")
        this.postagem = new Postagem();
        this.getAllPostagens();
      },
      error: err => console.log(err)
    })
  }



}
