import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal-layout',
  imports: [],
  templateUrl: './modal-layout.html',
  styles: ``,
})
export class ModalLayout {
  modalTitle = input<string>();
  onClose = output<void>();

  onBackdropClick() {
    this.onClose.emit();
  }
}
