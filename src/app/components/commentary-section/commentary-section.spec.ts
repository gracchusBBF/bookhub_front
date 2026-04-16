import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentarySection } from './commentary-section';

describe('CommentarySection', () => {
  let component: CommentarySection;
  let fixture: ComponentFixture<CommentarySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentarySection],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentarySection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
