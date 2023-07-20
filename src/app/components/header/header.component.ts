import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, filter, map, switchMap } from 'rxjs';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Animations } from '../../animations/animations';
import { JogosHeaderSearchListService } from '../../service/jogos/jogos-header-search-list.service';

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.css'],
animations: [Animations]
})
export class HeaderComponent implements AfterViewInit {

	@ViewChild('header') header!: ElementRef;

	constructor( 
		private changeDetector: ChangeDetectorRef, 
		private router: Router, 
		private jogoService: JogosHeaderSearchListService,
		private formBuilder: FormBuilder) {}

	jogos$ = new Observable<JogoResumo[]>;

	form = this.formBuilder.group({
		search: new FormControl('')
	})

	breakToMobileWidth = 800;
	mobile: boolean = false;
	showMobileMenu: boolean = false;
	showSearchDropdown: boolean = false;

	ngAfterViewInit(): void {
		this.manageScreenSize(this.header.nativeElement.offsetWidth);
		this.setSearch();
		this.changeDetector.detectChanges();
	}

	get search() {
		return this.form.get('search');
	}

	private setSearch() {
		this.jogos$ = this.search?.valueChanges
			.pipe(
            map(term => term!.trim()),
            debounceTime(500),
            filter(term => {
               this.showSearchDropdown = false;
               return term !== '';
            }),
            switchMap(term => this.jogoService.search(term)
               .pipe(
                  map(res => {
                     this.showSearchDropdown = true;
                     return res.content;
               }))
		))!;
	}

	manageScreenSize(width: number): void {
		const isMobile = width <= this.breakToMobileWidth;
		this.mobile = isMobile;   
		this.showMobileMenu = this.showMobileMenu && !isMobile ? false : this.showMobileMenu;
	}


	@HostListener('document: click', ['$event'])
		handleDocumentClick(event: any) {
		let ids = ['search-dropdown']

			if(!ids.includes(event.target?.id)) {
				this.resetDropDown();
			}    
	}

	resetDropDown(): void {
		this.showSearchDropdown = false;
	}

	resetSearch(): void {
      this.form.reset();
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

}
