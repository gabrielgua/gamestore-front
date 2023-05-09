import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JogoComponent } from './jogo/jogo.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'jogos/:uriNome', component: JogoComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
