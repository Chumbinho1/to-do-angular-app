import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipProprieties } from 'src/app/interfaces/tooltip_proprieties';
import { IButton } from './interfaces/ibutton';
import { IButtonConfig } from './interfaces/ibutton_config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements IButton {
  @Input() buttonConfig: IButtonConfig = {};
  @Input() tooltipConfig: TooltipProprieties = {};
  @Input() disableCondition: boolean = false;

  @Output() clickAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClickEvent(): void {
    this.clickAction.emit();
  }
}
