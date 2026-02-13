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
    <div class="bg-white border border-gray-200 rounded shadow-lg text-sm max-w-[95vw]">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        z-index: 9999;
        display: block;
        transition: opacity 0.1s ease-out;
        /* Evita que el contenido sea más ancho que la pantalla en móviles */
        max-width: 95vw;
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
  @HostBinding('style.opacity') get styleOpacity() {
    return this.isReady() ? '1' : '0';
  }

  ngOnInit() {
    window.addEventListener('scroll', this.updatePosition, true);
    window.addEventListener('resize', this.updatePosition, true);
    document.addEventListener('click', this.onClickOutside, true);
  }

  ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver(() => {
      this.calcularPosicion();
    });
    // Observamos el propio dropdown por si su contenido cambia de tamaño
    this.resizeObserver.observe(this.elementRef.nativeElement);

    // Forzamos un cálculo inicial
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

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const gap = 4; // Espacio entre el botón y el menú
    const edgePadding = 8; // Mínima distancia con el borde de la pantalla

    // --- CALCULO VERTICAL (Y) ---
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const dropdownHeight = dropdownRect.height;

    // Si no cabe abajo y hay más espacio arriba, lo ponemos arriba
    if (spaceBelow < dropdownHeight && triggerRect.top > spaceBelow) {
      this.top.set(triggerRect.top - dropdownHeight - gap);
    } else {
      this.top.set(triggerRect.bottom + gap);
    }

    // --- CALCULO HORIZONTAL (X) con colisión ---
    const dropdownWidth = dropdownRect.width;

    // 1. Intentar alinear a la izquierda del trigger
    let finalLeft = triggerRect.left;

    // 2. Si se sale por la derecha (Left + Ancho > AnchoPantalla),
    // lo alineamos al borde derecho de la pantalla (menos el padding)
    if (finalLeft + dropdownWidth > viewportWidth - edgePadding) {
      finalLeft = viewportWidth - dropdownWidth - edgePadding;
    }

    // 3. Si al ajustarlo a la derecha, ahora se sale por la izquierda
    // (ej: pantalla movil muy estrecha), forzarlo al padding izquierdo
    if (finalLeft < edgePadding) {
      finalLeft = edgePadding;
    }

    this.left.set(finalLeft);
    this.isReady.set(true);
  }

  onClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!this.elementRef.nativeElement.contains(target) && !this.trigger().contains(target)) {
      this.onClose.emit();
    }
  };
}
