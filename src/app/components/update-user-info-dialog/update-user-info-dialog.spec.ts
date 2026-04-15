import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserInfoDialog } from './update-user-info-dialog';

describe('UpdateUserInfoDialog', () => {
  let component: UpdateUserInfoDialog;
  let fixture: ComponentFixture<UpdateUserInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserInfoDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserInfoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
