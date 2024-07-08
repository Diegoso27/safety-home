import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishProfilePage } from './finish-profile.page';

describe('FinishProfilePage', () => {
  let component: FinishProfilePage;
  let fixture: ComponentFixture<FinishProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
