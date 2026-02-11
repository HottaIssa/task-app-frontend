import {
  Component,
  ElementRef,
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
    <div class="bg-white border border-gray-200 rounded shadow-lg text-sm">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed; /* Clave: Se sale del flujo normal y del overflow hidden */
        z-index: 9999;
        display: block;
        transition: opacity 0.1s ease-out;
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

  isReady = signal(false);

  @HostBinding('style.top.px') get styleTop() {
    return this.top();
  }
  @HostBinding('style.left.px') get styleLeft() {
    return this.left();
  }

  @HostBinding('style.visibility') get styleVisibility() {
    return this.isReady() ? 'visible' : 'hidden';
  }

  // Opcional: Controlar opacidad para evitar parpadeos visuales si hay transición
  @HostBinding('style.opacity') get styleOpacity() {
    return this.isReady() ? '1' : '0';
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

    setTimeout(() => this.calcularPosicion(), 0);
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
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const dropdownHeight = dropdownRect.height;

    if (spaceBelow < dropdownHeight && triggerRect.top > dropdownHeight) {
      this.top.set(triggerRect.top - dropdownHeight);
    } else {
      this.top.set(triggerRect.bottom + 4);
    }

    const dropdownWidth = dropdownRect.width;

    if (triggerRect.left + dropdownWidth > viewportWidth) {
      this.left.set(triggerRect.right - dropdownWidth);
    } else {
      this.left.set(triggerRect.left);
    }

    this.isReady.set(true);
  }

  onClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!this.elementRef.nativeElement.contains(target) && !this.trigger().contains(target)) {
      this.onClose.emit();
    }
  };
}
