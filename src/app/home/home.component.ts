import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Jogo } from '../models/jogo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jogos: Jogo[] = [];
  jogoDestaque = new Jogo();

  constructor(private homeService: HomeService) {}
  
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
