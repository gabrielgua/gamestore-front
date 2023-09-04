import { Component, HostListener } from '@angular/core';
import { Animations } from 'src/app/animations/animations';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  animations: [Animations]
})
export class AdminHeaderComponent {

  showMenu: boolean = false;

  constructor (private usuarioService: UsuarioService) {}

  isAdmin(): boolean {
    return this.usuarioService.isAdmin();
  }

  @HostListener('document: click', ['$event'])
  private handleDocumentClick(event: any): void {
    if(event.target.id != 'btn-admin') {
      this.showMenu = false;
    }
  }

}
