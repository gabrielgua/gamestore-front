import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { JogosListComponent } from './components/jogos-list/jogos-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'jogos', component: JogosListComponent},
  {path: 'jogos/:uriNome', component: JogoComponent},


  {path: 'error/not-found', component: NotFoundComponent},
  {path: 'error/access-denied', component: AccessDeniedComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
