import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMobileComponent } from './slider-mobile.component';

describe('SliderMobileComponent', () => {
  let component: SliderMobileComponent;
  let fixture: ComponentFixture<SliderMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
