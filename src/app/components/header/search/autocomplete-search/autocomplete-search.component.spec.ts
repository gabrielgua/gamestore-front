import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteSearchComponent } from './autocomplete-search.component';

describe('AutocompleteSearchComponent', () => {
  let component: AutocompleteSearchComponent;
  let fixture: ComponentFixture<AutocompleteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
