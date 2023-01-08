import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task';
import { Subject, first, takeUntil } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReloadDatasService } from 'src/app/services/reload-datas.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IButtonConfig } from 'src/app/components/button/interfaces/ibutton_config';
import { TooltipProprieties } from 'src/app/interfaces/tooltip_proprieties';
import { AddEditTaskFormComponent } from '../add-edit-task-form/add-edit-task-form.component';
import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit, OnDestroy {
  @Input() tasks: Task[] = [];

  @Output() tasksChange: EventEmitter<Task[]> = new EventEmitter<Task[]>()

  bsModalRef!: BsModalRef;

  url: string = 'tasks';

  editButtonConfig: IButtonConfig = {
    classes: 'btn btn-sm btn-success',
    icon: 'bi bi-pencil'
  }
  deleteButtonConfig: IButtonConfig = {
    classes: 'btn btn-sm btn-danger',
    icon: 'bi bi-trash',
  }

  editButtonTooltipConfig: TooltipProprieties = {
    label: "Editar Tarefa",
    container: 'body',
    placement: 'bottom'
  }
  deleteButtonTooltipConfig: TooltipProprieties = {
    label: "Deletar Tarefa",
    container: 'body',
    placement: 'bottom'
  }

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _localStorageService: LocalStorageService,
    private _reloadDatasService: ReloadDatasService,
    private _confirmService: ConfirmService,
    private _bsModalService: BsModalService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this._reloadDatasService.reloadDatas.subscribe(() => this.getAll());
    this.getAll();
  }

  private getAll() {
    this._localStorageService
      .get('tasks')
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.tasksChange.emit(tasks);
      });
  }

  toggleSelect(id: number) {
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasks[index].done = !this.tasks[index].done;
    this._localStorageService.set(this.url, this.tasks)
  }

  edit(id: number): void {
    const saveButtonConfig: IButtonConfig = {
      label: 'Salvar',
      classes: 'btn btn-success',
      icon: 'bi bi-pencil',
      type: 'submit'
    }
    const cancelButtonConfig: IButtonConfig = {
      label: 'Cancelar',
      classes: 'btn btn-secondary',
      type: 'button'
    }
    const initialState: ModalOptions = {
      initialState: {
        title: 'Editar Tarefa',
        cancelButtonConfig: cancelButtonConfig,
        saveButtonConfig: saveButtonConfig,
        id: id
      },
      class: 'modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
      keyboard: false,
    };
    this.bsModalRef = this._bsModalService.show(AddEditTaskFormComponent, initialState);
  }

  delete(id: number): void {
    const confirmButtonConfig: IButtonConfig = {
      label: 'Sim',
      classes: 'btn btn-danger',
      icon: 'bi bi-trash'
    }
    const denyButtonConfig: IButtonConfig = {
      label: 'Não',
      classes: 'btn btn-secondary',
    }
    const initialState: ModalOptions = {
      initialState: {
        title: 'Deletar Tarefa',
        message: 'Deseja mesmo deletar está tarefa?',
        denyButtonConfig: denyButtonConfig,
        confirmButtonConfig: confirmButtonConfig
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
    };
    this.bsModalRef = this._bsModalService.show(ConfirmModalComponent, initialState);
    this._confirmService.confirmEvent
      .pipe(first())
      .subscribe((confirmOrDeny) => {
        if (confirmOrDeny) {
          const index = this.tasks.findIndex(task => task.id === id);
          this.tasks.splice(index, 1);
          this._localStorageService.set(this.url, this.tasks);
        }
      })
  }

}
