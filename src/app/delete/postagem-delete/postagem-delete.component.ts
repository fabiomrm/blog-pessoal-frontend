import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem();

  idPostagem: number;

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

    this.idPostagem = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem);

  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe({
      next: (res: Postagem) => {
        this.postagem = res;
      },
      error: err => console.log(err)
    })
  }

  apagar() {
    this.postagemService.deletePostagem(this.idPostagem).subscribe({
      next: () => {
        alert('Postagem deletada com sucesso!')
        this.router.navigate(['/inicio'])
      },
      error: err => console.log(err)
    })
  }

}
