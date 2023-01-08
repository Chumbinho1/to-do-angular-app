import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit, OnChanges {

  @Input('focusCondition') focus: boolean = true;

  constructor(
    private _elementRef: ElementRef,
    private _renderer2: Renderer2
  ) { }

  ngAfterViewInit(): void {
    if (this.focus) {
      setTimeout(() => {
        if (this._elementRef.nativeElement) { this._elementRef.nativeElement.focus() }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.focus) {
      setTimeout(() => {
        if (this._elementRef.nativeElement) { this._elementRef.nativeElement.focus() }
      });
    }
  }

}
