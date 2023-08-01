import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioJogosComponent } from './usuario-jogos.component';

describe('UsuarioJogosComponent', () => {
  let component: UsuarioJogosComponent;
  let fixture: ComponentFixture<UsuarioJogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioJogosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
