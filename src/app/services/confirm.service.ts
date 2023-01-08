import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  confirmEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  confirm(confirm: boolean) {
    this.confirmEvent.emit(confirm);
  }
}
