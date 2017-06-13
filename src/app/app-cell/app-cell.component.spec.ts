import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCellComponent } from './app-cell.component';

describe('AppCellComponent', () => {
  let component: AppCellComponent;
  let fixture: ComponentFixture<AppCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
