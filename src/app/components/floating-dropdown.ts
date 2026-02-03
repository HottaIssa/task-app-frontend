import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  OnInit,
  signal,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'app-floating-dropdown',
  standalone: true,
  template: `
    <div class="bg-white border border-gray-200 rounded shadow-lg p-4">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed; /* Clave: Se sale del flujo normal y del overflow hidden */
        z-index: 9999;
        display: block;
      }
    `,
  ],
})
export class FloatingDropdown implements OnInit {
  trigger = input.required<HTMLElement>();
  onClose = output<void>();

  private elementRef = inject(ElementRef);
  private resizeObserver: ResizeObserver | null = null;

  top = signal(0);
  left = signal(0);

  @HostBinding('style.top.px') get styleTop() {
    return this.top();
  }
  @HostBinding('style.left.px') get styleLeft() {
    return this.left();
  }

  ngOnInit() {
    // Escuchas globales
    window.addEventListener('scroll', this.updatePosition, true);
    window.addEventListener('resize', this.updatePosition, true);
    document.addEventListener('click', this.onClickOutside, true);
  }

  ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver(() => {
      this.calcularPosicion();
    });
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.updatePosition, true);
    window.removeEventListener('resize', this.updatePosition, true);
    document.removeEventListener('click', this.onClickOutside, true);
    this.resizeObserver?.disconnect();
  }

  updatePosition = () => {
    this.calcularPosicion();
  };

  calcularPosicion() {
    if (!this.trigger().isConnected) {
      this.onClose.emit();
      return;
    }

    const triggerRect = this.trigger().getBoundingClientRect();
    const dropdownRect = this.elementRef.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - triggerRect.bottom;

    const dropdownHeight = dropdownRect.height;

    if (spaceBelow < dropdownHeight && triggerRect.top > dropdownHeight) {
      this.top.set(triggerRect.top - dropdownHeight);
    } else {
      this.top.set(triggerRect.bottom + 4);
    }

    const viewportWidth = window.innerWidth;
    const dropdownWidth = dropdownRect.width;

    if (triggerRect.left + dropdownWidth > viewportWidth) {
      this.left.set(triggerRect.right - dropdownWidth);
    } else {
      this.left.set(triggerRect.left);
    }
  }

  onClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!this.elementRef.nativeElement.contains(target) && !this.trigger().contains(target)) {
      this.onClose.emit();
    }
  };
}
