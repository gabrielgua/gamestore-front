import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosAdminListComponent } from './jogos-admin-list.component';

describe('JogosAdminListComponent', () => {
  let component: JogosAdminListComponent;
  let fixture: ComponentFixture<JogosAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogosAdminListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogosAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
