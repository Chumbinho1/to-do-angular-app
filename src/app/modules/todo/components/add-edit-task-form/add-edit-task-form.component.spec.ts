import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTaskFormComponent } from './add-edit-task-form.component';

describe('AddEditTaskFormComponent', () => {
  let component: AddEditTaskFormComponent;
  let fixture: ComponentFixture<AddEditTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTaskFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
