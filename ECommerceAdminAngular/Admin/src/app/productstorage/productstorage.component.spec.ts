import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductstorageComponent } from './productstorage.component';

describe('ProductstorageComponent', () => {
  let component: ProductstorageComponent;
  let fixture: ComponentFixture<ProductstorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductstorageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductstorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
