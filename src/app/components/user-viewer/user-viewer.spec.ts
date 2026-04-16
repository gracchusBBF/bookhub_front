import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewer } from './user-viewer';

describe('UserViewer', () => {
  let component: UserViewer;
  let fixture: ComponentFixture<UserViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(UserViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
