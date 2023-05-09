import { Component, OnInit } from '@angular/core';
import { JogoService } from '../service/jogo.service';
import { JogoResumo } from '../models/jogo.resumo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jogos: JogoResumo[] = [];
  jogoDestaque = new JogoResumo();

  constructor(private homeService: JogoService) {}
  
  ngOnInit(): void {
    this.homeService.listarJogos()
      .then((jogos) => {        
        this.jogoDestaque = jogos[0];
        this.jogos = jogos;
        // this.jogos.shift();

      }).catch((error) => {
        console.log(error.error);
      })
  }


}
