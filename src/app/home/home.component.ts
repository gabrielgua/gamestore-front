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
  showCarousel: boolean = false;
  mobileCarouselWidth: number = 800; //px 

  constructor(private homeService: JogoService) {}
  
  ngOnInit(): void {
    this.homeService.listarJogos()
      .then((jogos) => {        
        this.jogos = jogos;
      }).catch((error) => {
        console.log(error.error);
      })
  }

  manageScreenSize(screenWidth: number) {
    const mobileWidth = screenWidth <= this.mobileCarouselWidth;
    this.showCarousel = mobileWidth ? true : false;
  }


}
