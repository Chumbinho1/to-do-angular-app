import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddEditTaskFormComponent } from '../components/add-edit-task-form/add-edit-task-form.component';
import { TooltipProprieties } from 'src/app/interfaces/tooltip_proprieties';
import { IButtonConfig } from 'src/app/components/button/interfaces/ibutton_config';
import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';
import { first } from 'rxjs';
import { ConfirmService } from 'src/app/services/confirm.service';
import { Task } from '../models/task';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  bsModalRef!: BsModalRef;

  tasks: Task[] = [];

  newButtonConfig: IButtonConfig = {
    label: 'Incluir',
    classes: 'btn btn-primary',
    icon: 'bi bi-plus-circle',
    hideButtonLabelClass: 'd-lg-inline d-none'
  }
  deleteDoneTasksButtonConfig: IButtonConfig = {
    label: 'Deletar Concluídas',
    classes: 'btn btn-danger',
    icon: 'bi bi-trash',
    hideButtonLabelClass: 'd-lg-inline d-none'

  }

  newButtonTooltipConfig: TooltipProprieties = {
    label: "Incluir Nova Tarefa",
    container: 'body',
    placement: 'bottom'
  }
  DeleteDoneTasksButtonTooltipConfig: TooltipProprieties = {
    label: "Deletar Tarefas Concluídas",
    container: 'body',
    placement: 'bottom'
  }

  constructor(
    private _bsModalService: BsModalService,
    private _confirmService: ConfirmService,
    private _localStorageService: LocalStorageService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._changeDetectorRef.detectChanges()
  }

  new(): void {
    const saveButtonConfig: IButtonConfig = {
      label: 'Salvar',
      classes: 'btn btn-primary',
      icon: 'bi bi-plus-circle',
      type: 'submit'
    }
    const cancelButtonConfig: IButtonConfig = {
      label: 'Cancelar',
      classes: 'btn btn-secondary',
      type: 'button'
    }

    const initialState: ModalOptions = {
      initialState: {
        title: 'Nova Tarefa',
        saveButtonConfig: saveButtonConfig,
        cancelButtonConfig: cancelButtonConfig
      },
      class: 'modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
      keyboard: false,

    };
    this.bsModalRef = this._bsModalService.show(AddEditTaskFormComponent, initialState);
  }

  deleteDoneTasks(): void {
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
        title: 'Deletar Tarefas Concluídas',
        message: 'Deseja mesmo deletar as tarefas concluídas?',
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
          this.tasks = this.tasks.filter(task => task.done === false);
          this._localStorageService.set('tasks', this.tasks);
        }
      })
  }

  get disableDeleteDoneTasksCondition(): boolean {
    return this.tasks.find(task => task.done == true) ? false : true;
  }
}
