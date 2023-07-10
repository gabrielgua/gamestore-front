import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosListComponent } from './jogos-list.component';

describe('JogosListComponent', () => {
  let component: JogosListComponent;
  let fixture: ComponentFixture<JogosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
