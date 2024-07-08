import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmergencyProceduresPage } from './emergency-procedures.page';

describe('EmergencyProceduresPage', () => {
  let component: EmergencyProceduresPage;
  let fixture: ComponentFixture<EmergencyProceduresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyProceduresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
