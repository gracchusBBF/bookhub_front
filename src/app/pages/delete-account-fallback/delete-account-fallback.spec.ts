import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountFallback } from './delete-account-fallback';

describe('DeleteAccountFallback', () => {
  let component: DeleteAccountFallback;
  let fixture: ComponentFixture<DeleteAccountFallback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAccountFallback],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAccountFallback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
