import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbadminComponent } from './dbadmin.component';

describe('DbadminComponent', () => {
  let component: DbadminComponent;
  let fixture: ComponentFixture<DbadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
