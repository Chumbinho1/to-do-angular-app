import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    ButtonComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipModule,
    ModalModule.forRoot()
  ],
  exports: [
    ReactiveFormsModule,
    TooltipModule,
    ModalModule,

    ButtonComponent
  ]
})
export class SharedModule { }
