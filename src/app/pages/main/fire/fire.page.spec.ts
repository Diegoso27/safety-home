import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirePage } from './fire.page';

describe('FirePage', () => {
  let component: FirePage;
  let fixture: ComponentFixture<FirePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
