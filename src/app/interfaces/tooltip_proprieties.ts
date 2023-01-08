import { AvailbleBSPositions } from "ngx-bootstrap/positioning";

export interface TooltipProprieties {
    label?: string;
    placement?: AvailbleBSPositions;
    container?: string;
    delay?: number;
    triggers?: string;
}