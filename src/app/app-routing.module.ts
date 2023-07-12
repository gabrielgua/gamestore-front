import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { JogosListComponent } from './components/jogos-list/jogos-list.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { AccessDeniedComponent } from './components/errors/access-denied/access-denied.component';
import { CadastroComponent } from './components/auth/cadastro/cadastro.component';

const routes: Routes = [

  

  {path: '', component: HomeComponent},
  {path: 'jogos', component: JogosListComponent},
  {path: 'jogos/:uriNome', component: JogoComponent},


  {path: 'sing-up', component: CadastroComponent},


  {path: 'error/not-found', component: NotFoundComponent},
  {path: 'error/access-denied', component: AccessDeniedComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
