import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { SliderDesktopComponent } from './components/slider-desktop/slider-desktop.component';
import { SafePipe } from './pipes/safe.pipe';
import { SliderMobileComponent } from './components/slider-mobile/slider-mobile.component';
import { JogosAvaliacaoComponent } from './components/jogos-avaliacao/jogos-avaliacao.component';
import { SliderJogoComponent } from './components/slider-jogo/slider-jogo.component';

import localePt from '@angular/common/locales/pt';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FooterComponent } from './components/footer/footer.component';
import { JogosListComponent } from './components/jogos-list/jogos-list.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { AccessDeniedComponent } from './components/errors/access-denied/access-denied.component';
import { CadastroComponent } from './components/auth/cadastro/cadastro.component';
import { LogoComponent } from './components/shared/logo/logo.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthHeaderComponent } from './components/auth/shared/auth-header/auth-header.component';
import { PedidosListComponent } from './components/usuario/logado/pedidos-list/pedidos-list.component';
import { LoadingPipe } from './pipes/loading/loading.pipe';
import { PedidosListSkeletonComponent } from './components/usuario/logado/pedidos-list/pedidos-list-skeleton/pedidos-list-skeleton.component';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

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
    NotFoundComponent,
    AccessDeniedComponent,
    CadastroComponent,
    LogoComponent,
    LoaderComponent,
    LoginComponent,
    AuthHeaderComponent,
    PedidosListComponent,
    LoadingPipe,
    PedidosListSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      closeButton: true,
      easing: 'ease',
      // positionClass: 'inline'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
      }
    }),
  ],
  providers: [
    JwtHelperService,
    { provide: LOCALE_ID, useValue: 'pt-BR', },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



