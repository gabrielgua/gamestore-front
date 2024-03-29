import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { JogosListComponent } from './components/jogos-list/jogos-list.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { AccessDeniedComponent } from './components/errors/access-denied/access-denied.component';
import { CadastroComponent } from './components/auth/cadastro/cadastro.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PedidosListComponent } from './components/usuario/logado/pedidos-list/pedidos-list.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { PedidoCreateComponent } from './components/usuario/logado/pedido-create/pedido-create.component';
import { UsuarioJogosComponent } from './components/usuario/logado/usuario-jogos/usuario-jogos.component';
import { PerfilComponent } from './components/usuario/logado/perfil/perfil.component';
import { DesejosComponent } from './components/usuario/logado/desejos/desejos.component';
import { AdminUsuariosListComponent } from './components/admin/usuarios/admin-usuarios-list/admin-usuarios-list.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { JogosAdminListComponent } from './components/admin/jogos/jogos-admin-list/jogos-admin-list.component';

const routes: Routes = [

  
  // public
  {path: '', component: HomeComponent},
  {path: 'jogos', component: JogosListComponent},
  {path: 'jogos/:uriNome', component: JogoComponent},

  // auth
  {path: 'sing-up', component: CadastroComponent, canActivate: [LoggedInGuard]},
  {path: 'sing-in', component: LoginComponent, canActivate: [LoggedInGuard]},

  // logged in
  {path: 'conta/pedidos', component: PedidosListComponent, canActivate: [AuthGuard]},
  {path: 'conta/biblioteca', component: UsuarioJogosComponent, canActivate: [AuthGuard]},
  {path: 'conta/perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'conta/desejos', component: DesejosComponent, canActivate: [AuthGuard]},
  {path: 'carrinho', component: PedidoCreateComponent, canActivate: [AuthGuard]},

  // admin
  {path: 'admin/usuarios', component: AdminUsuariosListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/jogos', component: JogosAdminListComponent, canActivate: [AuthGuard, AdminGuard]},
  
  // errors
  {path: 'error/not-found', component: NotFoundComponent},
  {path: 'error/access-denied', component: AccessDeniedComponent},

  // utils
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
