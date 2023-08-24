import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSenhaComponent } from './edit-senha.component';

describe('EditSenhaComponent', () => {
  let component: EditSenhaComponent;
  let fixture: ComponentFixture<EditSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSenhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
