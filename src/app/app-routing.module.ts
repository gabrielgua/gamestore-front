import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JogoComponent } from './jogo/jogo.component';
import { JogosListComponent } from './jogos-list/jogos-list.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'jogos', component: JogosListComponent},
  {path: 'jogos/:uriNome', component: JogoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
