import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesejosComponent } from './desejos.component';

describe('DesejosComponent', () => {
  let component: DesejosComponent;
  let fixture: ComponentFixture<DesejosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesejosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesejosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
