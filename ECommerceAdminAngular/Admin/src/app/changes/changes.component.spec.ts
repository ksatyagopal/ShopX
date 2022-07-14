import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesComponent } from './changes.component';

describe('ChangesComponent', () => {
  let component: ChangesComponent;
  let fixture: ComponentFixture<ChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
