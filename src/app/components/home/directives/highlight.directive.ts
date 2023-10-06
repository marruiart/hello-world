import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  private _color: string = "transparent";
  @Input() set appHighlight(color: string) {
    this._color = color;
  }

  get appHighlight(): string {
    return this._color;
  }

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    console.log("mouseenter")
    this.setHighlight();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.unsetHighlight();
  }

  private setHighlight() {
    this.el.nativeElement.classList.add('highlight');
  }

  private unsetHighlight() {
    this.el.nativeElement.classList.remove('highlight');
  }

}
