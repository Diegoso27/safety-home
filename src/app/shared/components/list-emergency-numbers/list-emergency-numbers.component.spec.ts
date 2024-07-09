import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListEmergencyNumbersComponent } from './list-emergency-numbers.component';

describe('ListEmergencyNumbersComponent', () => {
  let component: ListEmergencyNumbersComponent;
  let fixture: ComponentFixture<ListEmergencyNumbersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmergencyNumbersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEmergencyNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
