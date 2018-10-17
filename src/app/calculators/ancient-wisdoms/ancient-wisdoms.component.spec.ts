import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AncientWisdomsComponent } from './ancient-wisdoms.component';

describe('AncientWisdomsComponent', () => {
  let component: AncientWisdomsComponent;
  let fixture: ComponentFixture<AncientWisdomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AncientWisdomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AncientWisdomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
