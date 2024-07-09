import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StickyEmergencyButtonComponent } from './sticky-emergency-button.component';

describe('StickyEmergencyButtonComponent', () => {
  let component: StickyEmergencyButtonComponent;
  let fixture: ComponentFixture<StickyEmergencyButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StickyEmergencyButtonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StickyEmergencyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
