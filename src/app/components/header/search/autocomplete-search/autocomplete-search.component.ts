import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, filter, map, switchMap } from 'rxjs';
import { Animations } from 'src/app/animations/animations';
import { JogoResumo } from 'src/app/models/jogos/jogo.resumo';
import { JogosHeaderSearchListService } from 'src/app/service/jogos/jogos-header-search-list.service';

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.css'],
  animations: [Animations]

})
export class AutocompleteSearchComponent implements OnInit {

  @Output() submitted = new EventEmitter();

	jogos$ = new Observable<JogoResumo[]>;
  
	form = this.formBuilder.group({
    search: new FormControl('')
	})
  
  showSearchDropdown: boolean = false;
  showModal: boolean = false;

  constructor(
    private jogoService: JogosHeaderSearchListService, 
    private formBuilder: FormBuilder, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setSearch();
  }

  get search() {
		return this.form.get('search');
	}

  resetForm(): void {
    this.form.reset();
  }

  private setSearch() {
		this.jogos$ = this.search?.valueChanges
			.pipe(
        map(term => term!),
        debounceTime(300),
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

	handleSubmitSearch(): void {
    
		if (this.search?.value) {
			localStorage.setItem('search', this.search.value);
			this.resetForm();
			this.router.navigate(['jogos'])
        .then(() => {
          this.close();
        })
		} 
	}

  private close(): void {
    this.submitted.emit();
  }
}
