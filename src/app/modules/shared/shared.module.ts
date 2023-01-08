import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';
import { AutoFocusDirective } from 'src/app/directives/auto-focus.directive';


@NgModule({
  declarations: [
    ButtonComponent,
    ConfirmModalComponent,
    AutoFocusDirective,

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

    AutoFocusDirective,

    ButtonComponent
  ]
})
export class SharedModule { }
