import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { JogoComponent } from './jogo/jogo.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { SliderDesktopComponent } from './slider-desktop/slider-desktop.component';
import { SafePipe } from './safe.pipe';
import { SliderMobileComponent } from './slider-mobile/slider-mobile.component';
import { JogosAvaliacaoComponent } from './jogos-avaliacao/jogos-avaliacao.component';
import { SliderJogoComponent } from './slider-jogo/slider-jogo.component';

import localePt from '@angular/common/locales/pt';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FooterComponent } from './footer/footer.component';
import { JogosListComponent } from './jogos-list/jogos-list.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    JogoComponent,
    SliderDesktopComponent,
    SafePipe,
    SliderMobileComponent,
    JogosAvaliacaoComponent,
    SliderJogoComponent,
    FooterComponent,
    JogosListComponent,
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
