import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema();

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/entrar']);
    }


    let id = this.route.snapshot.params['id'];
    this.findByIdTema(id)
    console.log(this.tema)
  }

  findByIdTema(id: number) {

    this.temaService.getByIdTema(id).subscribe({
      next: res => {
        this.tema = res;
      }
    })
  }

  atualizar() {
    this.temaService.putTema(this.tema).subscribe({
      next: (res: Tema) => {
        this.tema = res;
        alert('Tema atualizado com sucesso!')
        this.router.navigate(['/tema'])
      },
      error: err => console.log(err)
    })
  }

}
