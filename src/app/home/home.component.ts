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

  constructor(private homeService: HomeService) {}
  
  ngOnInit(): void {
    this.homeService.listarJogos()
      .then((jogos) => {        
        this.jogos = jogos;
      }).catch((error) => {
        console.log(error.error);
      })
  }


}
