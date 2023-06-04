import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('container') container!: ElementRef;


  constructor(private homeService: JogoService) {}
  
  ngOnInit(): void {
    this.homeService.listarJogos()
      .then((jogos) => {        
        this.jogos = jogos;
        this.manageScreenSize(this.container.nativeElement.offsetWidth);
      }).catch((error) => {
        console.log(error.error);
      })
  }

  manageScreenSize(screenWidth: number) {
    this.showCarousel = screenWidth <= this.mobileCarouselWidth;
  }
}
