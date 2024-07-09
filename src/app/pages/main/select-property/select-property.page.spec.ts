import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPropertyPage } from './select-property.page';

describe('SelectPropertyPage', () => {
  let component: SelectPropertyPage;
  let fixture: ComponentFixture<SelectPropertyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
