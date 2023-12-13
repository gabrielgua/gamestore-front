import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { JogoFilter } from 'src/app/models/jogos/jogo.filter';
import { JogoPageableRequest } from 'src/app/models/jogos/jogo.pageable';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { PageableModel } from 'src/app/models/pageables/pageable.model';
import { JogosListService } from 'src/app/service/jogos/jogos-list.service';

@Component({
  selector: 'app-jogos-admin-list',
  templateUrl: './jogos-admin-list.component.html',
  styleUrls: ['./jogos-admin-list.component.css'],
  animations: [Animations]
})
export class JogosAdminListComponent implements OnInit {


  constructor(private service: JogosListService) {}

  pageableJogos$ = new Observable<PageableModel<JogoResumo>>;


  private pageable: JogoPageableRequest = {}
  private filter: JogoFilter = {}

  private jogoId: number = 0; 

  ngOnInit(): void {
    this.service.init(this.pageable, this.filter);
    this.pageableJogos$ = this.service.getPageableJogos();
  }

  @HostListener('document: click', ['$event'])
  private handleDocumentClick(event: any): void {
    if(event.target.id != 'btn-detalhes') {
      this.closeActions();
    }
  }

  openActions(jogoId: number): void {
    if (this.jogoId === jogoId) {
      this.jogoId = 0;
      return 
    }

    this.jogoId = jogoId
  }

  closeActions(): void {
    this.jogoId = 0;
  }

  showFilter(jogoId: number): boolean {
    return this.jogoId === jogoId;
  }


}
