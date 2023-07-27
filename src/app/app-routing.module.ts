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

const routes: Routes = [

  
  // public
  {path: '', component: HomeComponent},
  {path: 'jogos', component: JogosListComponent},
  {path: 'jogos/:uriNome', component: JogoComponent},

  // auth
  {path: 'sing-up', component: CadastroComponent, canActivate: [LoggedInGuard]},
  {path: 'sing-in', component: LoginComponent, canActivate: [LoggedInGuard]},

  //private
  {path: 'pedidos', component: PedidosListComponent, canActivate: [AuthGuard]},
  {path: 'carrinho', component: PedidoCreateComponent, canActivate: [AuthGuard]},


  // errors
  {path: 'error/not-found', component: NotFoundComponent},
  {path: 'error/access-denied', component: AccessDeniedComponent},

  //utils
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
