import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenPsicosensometricoComponent } from './examen-psicosensometrico.component';

describe('ExamenPsicosensometricoComponent', () => {
  let component: ExamenPsicosensometricoComponent;
  let fixture: ComponentFixture<ExamenPsicosensometricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenPsicosensometricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenPsicosensometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
