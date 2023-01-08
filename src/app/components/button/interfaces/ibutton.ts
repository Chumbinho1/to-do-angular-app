import { EventEmitter } from "@angular/core";
import { TooltipProprieties } from "src/app/interfaces/tooltip_proprieties";

export interface IButton {
    tooltipConfig: TooltipProprieties;
    clickAction: EventEmitter<boolean>;

    onClickEvent(): void;

}