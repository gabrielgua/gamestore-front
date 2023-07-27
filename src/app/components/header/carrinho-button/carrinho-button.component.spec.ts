import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoButtonComponent } from './carrinho-button.component';

describe('CarrinhoButtonComponent', () => {
  let component: CarrinhoButtonComponent;
  let fixture: ComponentFixture<CarrinhoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhoButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
