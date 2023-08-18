import { Component, Input } from '@angular/core';
import { Animations } from 'src/app/animations/animations';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.css'],
  animations: [Animations]
})
export class EditAvatarComponent {

  private AVATAR_API = 'https://api.dicebear.com/6.x/bottts/svg?seed=';
  @Input() usuario: Usuario | undefined;
  randomAvatar: string = '';
  showConfirmAvatarButtons: boolean = false;
  imageLoading: boolean = true;

  constructor(private usuarioService: UsuarioService) {}

  gerarAvatar(username: string): void {
    this.showConfirmAvatarButtons = true;
    this.imageLoading = true;
    
    const random = crypto.randomUUID();
    this.randomAvatar = this.AVATAR_API + username + random;        
  }

  closeAvatarChange(): void {
    this.showConfirmAvatarButtons = false;
    this.randomAvatar = '';
  }

  confirmAvatarChange(): void {
    if (!this.randomAvatar.length) {
      return;
    }

    this.usuarioService.changeAvatar(this.randomAvatar);
    this.closeAvatarChange();
  }



}
