import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Cashwithdrawal1Page } from './cashwithdrawal1.page';

describe('Cashwithdrawal1Page', () => {
  let component: Cashwithdrawal1Page;
  let fixture: ComponentFixture<Cashwithdrawal1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Cashwithdrawal1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Cashwithdrawal1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
