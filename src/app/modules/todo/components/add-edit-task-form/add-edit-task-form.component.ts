import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Task } from '../../models/task';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { first } from 'rxjs';
import { ReloadDatasService } from 'src/app/services/reload-datas.service';
import { IButtonConfig } from 'src/app/components/button/interfaces/ibutton_config';

@Component({
  selector: 'app-add-edit-task-form',
  templateUrl: './add-edit-task-form.component.html',
  styleUrls: ['./add-edit-task-form.component.scss']
})
export class AddEditTaskFormComponent implements OnInit {
  private _reloadDatas: boolean = false

  form!: FormGroup;
  formId: string = 'add-edit-form';

  id!: number;

  title: string = '';

  cancelButtonConfig: IButtonConfig = {};
  saveButtonConfig: IButtonConfig = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService,
    private _reloadDatasService: ReloadDatasService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.saveButtonConfig.formId = this.formId
    this.bsModalRef.onHidden?.pipe(first()).subscribe(() => {
      if (this._reloadDatas) this._reloadDatasService.reloadDatasEvent();
    });
    this.buildForm();
  }

  private buildForm() {
    let controlsConfig;
    if (this.id === undefined) {
      controlsConfig = {
        id: [null],
        task: [null, [Validators.required]],
        done: [false, [Validators.required]]
      };
    } else {
      controlsConfig = {
        id: [null, [Validators.required]],
        task: [null, [Validators.required]],
        done: [null, [Validators.required]]
      };
    }

    this.form = this._formBuilder.group(controlsConfig);

    if (this.id) {
      this.getDatas(this.id);
    }
  }

  private getDatas(id: number): void {
    this._localStorageService
      .get('tasks')
      .subscribe((tasksList: Task[]) => {
        const tasks: Task[] = tasksList;
        const task = tasks[tasks.findIndex(task => task.id === id)];

        this.form.patchValue(task);
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.id === null) {
      this.create();
    } else {
      this.update();
    }
  }

  private create(): void {
    this._localStorageService
      .get('tasks')
      .subscribe((tasksList: Task[]) => {
        const tasks: Task[] = [];
        const formValues = this.form.value;

        if (tasksList) {
          tasks.push(...tasksList)
        }

        if (tasks.length > 0) {
          formValues.id = tasks[tasks.length - 1].id + 1;
          tasks.push(formValues);
        } else {
          formValues.id = 1;
          tasks.push(formValues);
        }

        this._localStorageService.set('tasks', tasks);

        this._reloadDatas = true;

        this.bsModalRef.hide();
      });
  }

  private update(): void {
    this._localStorageService
      .get('tasks')
      .subscribe((tasksList: Task[]) => {
        const tasks: Task[] = [];
        const formValues = this.form.value;

        tasks.push(...tasksList);
        tasks[tasks.findIndex(task => task.id === formValues.id)] = formValues;

        this._localStorageService.set('tasks', tasks);

        this._reloadDatas = true;

        this.bsModalRef.hide();
      });
  }

  close(): void {
    this.bsModalRef.hide();
  }

}