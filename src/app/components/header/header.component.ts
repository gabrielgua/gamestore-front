import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';
import { TipoUsuario } from 'src/app/models/usuarios/tipo.usuario';
import { Usuario } from 'src/app/models/usuarios/usuario';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Animations } from '../../animations/animations';
import { JogosHeaderSearchListService } from '../../service/jogos/jogos-header-search-list.service';
import { Jogo } from 'src/app/models/jogos/jogo';
import { PageableModel } from 'src/app/models/pageables/pageable.model';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [Animations]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('header') header!: ElementRef;
  usuario = new Usuario();

  constructor(
    private changeDetector: ChangeDetectorRef, 
    private router: Router, 
    private jogoService: JogosHeaderSearchListService,
    private usuarioService: UsuarioService, 
    private authService: AuthService,
    private formBuilder: FormBuilder) {}
 
  jogos$ = new Observable<JogoResumo[]>;

  form = this.formBuilder.group({
    search: new FormControl('')
  })

  breakToMobileWidth = 800;
  mobile: boolean = false;
  showMobileMenu: boolean = false;
  showUsuarioMenu: boolean = false;
  showSearchDropdown: boolean = false;

  ngAfterViewInit(): void {
    this.resetDropDown();
    this.resetSearch();
    this.manageScreenSize(this.header.nativeElement.offsetWidth);
    this.getUsuario();
    this.handleSearch();
    this.changeDetector.detectChanges();
  }

  get search() {
    return this.form.get('search');
  }

  private handleSearch(): void {
    this.jogos$ = this.search?.valueChanges
      .pipe(
        map(term => term!.trim()),
        debounceTime(500),
        filter(term => {
			this.showSearchDropdown = false;
			return term !== '';
		}),
        switchMap(term => this.jogoService.search(term)
          .pipe(map(res => {
			this.showSearchDropdown = true;
			return res.content;
		  }))
    ))!;
    
  }

  private getUsuario(): void {
    this.usuarioService.init();
    this.usuarioService.getUsuario().subscribe(usuario => {
      if (this.isLoggedIn()) {
        this.usuario = usuario;
      }
    });
  }

  isAdmin(): boolean {
    return this.usuario?.tipo === TipoUsuario.ADMIN;
  }

  manageScreenSize(width: number): void {
    const isMobile = width <= this.breakToMobileWidth;
    this.mobile = isMobile;   
    this.showMobileMenu = this.showMobileMenu && !isMobile ? false : this.showMobileMenu;
  }


  @HostListener('document: click', ['$event'])
  handleDocumentClick(event: any) {
    let ids = ['search-dropdown', 'profile-avatar', 'profile-btn']

     if(!ids.includes(event.target?.id)) {
        this.resetDropDown();
        this.showUsuarioMenu = false;
     }    
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  } 
  
  resetDropDown(): void {
    this.showSearchDropdown = false;
  }
  
  resetSearch(): void {
    this.search?.reset();
  }

  handleSubmitSearch(): void {
    this.showMobileMenu = false;

    if (this.search?.value) {
      localStorage.setItem('search', this.search.value);
      this.resetSearch();
      this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => {
        this.router.navigate(['/jogos']);
      });
    } 

  }

  handleProfileClick(): void {
    this.showUsuarioMenu = !this.showUsuarioMenu;
  }

  handleLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['sing-in']);
    this.resetUsuario();
  }

  private resetUsuario(): void {
    this.usuario = new Usuario();
  }
}
