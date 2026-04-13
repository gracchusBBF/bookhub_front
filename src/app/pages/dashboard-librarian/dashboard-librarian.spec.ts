import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLibrarian } from './dashboard-librarian';

describe('DashboardLibrarian', () => {
  let component: DashboardLibrarian;
  let fixture: ComponentFixture<DashboardLibrarian>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLibrarian],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLibrarian);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
