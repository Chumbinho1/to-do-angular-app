import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmService } from 'src/app/services/confirm.service';
import { IButtonConfig } from '../../button/interfaces/ibutton_config';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  title: string = ''

  message: string = ''

  confirmButtonConfig: IButtonConfig = {}
  denyButtonConfig: IButtonConfig = {}

  constructor(
    private _confirmService: ConfirmService,
    public bsModalRef: BsModalRef

  ) { }

  confirmOrDeny(confirmDeny: boolean) {
    this._confirmService.confirm(confirmDeny);
    this.close();
  }

  close() {
    this.bsModalRef.hide();
  }
}
