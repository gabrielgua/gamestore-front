import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosAvaliacaoComponent } from './jogos-avaliacao.component';

describe('JogosAvaliacaoComponent', () => {
  let component: JogosAvaliacaoComponent;
  let fixture: ComponentFixture<JogosAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogosAvaliacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogosAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
