import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrairyView } from './librairy-view';

describe('LibrairyView', () => {
  let component: LibrairyView;
  let fixture: ComponentFixture<LibrairyView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrairyView],
    }).compileComponents();

    fixture = TestBed.createComponent(LibrairyView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
