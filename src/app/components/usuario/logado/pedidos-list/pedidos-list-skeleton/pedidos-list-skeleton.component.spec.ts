import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosListSkeletonComponent } from './pedidos-list-skeleton.component';

describe('PedidosListSkeletonComponent', () => {
  let component: PedidosListSkeletonComponent;
  let fixture: ComponentFixture<PedidosListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosListSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
