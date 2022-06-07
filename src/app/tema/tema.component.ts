import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema();
  temas: Tema[] = [];

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas();
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe({
      next: (res: Tema[]) => {
        this.temas = res;
      }
    })
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe({
      next: (res: Tema) => {
        this.tema = res;
        alert('Tema cadastrado com sucesso')
        this.findAllTemas();
        this.tema = new Tema();
      },
      error: err => console.log(err)
    })
  }

}
