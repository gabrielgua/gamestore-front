import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderJogoComponent } from './slider-jogo.component';

describe('SliderJogoComponent', () => {
  let component: SliderJogoComponent;
  let fixture: ComponentFixture<SliderJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderJogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
