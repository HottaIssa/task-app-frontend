import { Component, ElementRef, HostListener, inject, output } from '@angular/core';

@Component({
  selector: 'app-dropdown-layout',
  imports: [],
  templateUrl: './dropdown-layout.html',
  styles: ``,
})
export class DropdownLayout {
  onClose = output<void>();
  private elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.onClose.emit();
    }
  }
}
