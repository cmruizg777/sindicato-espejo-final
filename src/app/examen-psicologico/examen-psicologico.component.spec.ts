import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenPsicologicoComponent } from './examen-psicologico.component';

describe('ExamenPsicologicoComponent', () => {
  let component: ExamenPsicologicoComponent;
  let fixture: ComponentFixture<ExamenPsicologicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenPsicologicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenPsicologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
