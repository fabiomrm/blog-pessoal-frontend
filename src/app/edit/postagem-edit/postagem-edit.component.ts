import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem();
  tema: Tema = new Tema();
  temas: Tema[] = [];
  idTema: number;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit(): void {

    window.scroll(0, 0);


    if (environment.token === '') {
      this.router.navigate(['/entrar']);
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id);
    this.findAllTemas();
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe({
      next: (res: Postagem) => {
        this.postagem = res;
      },
      error: err => console.log(err)
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe({
      next: (res: Tema) => {
        this.tema = res;
      },
      error: err => console.log(err)
    })
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe({
      next: (res: Tema[]) => {
        this.temas = res;
      },
      error: err => console.log(err)
    })
  }

  atualizar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.postagemService.putPostagem(this.postagem).subscribe({
      next: (res: Postagem) => {
        this.postagem = res;
        alert('Postagem atualizada com sucesso!')
        this.router.navigate(['/inicio'])
      },
      error: err => console.log(err)
    })
  }

}
