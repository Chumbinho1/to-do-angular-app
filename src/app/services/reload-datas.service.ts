import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReloadDatasService {
  reloadDatas: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  reloadDatasEvent() {
    this.reloadDatas.emit();
  }
}
