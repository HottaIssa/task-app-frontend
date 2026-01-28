import { Component, signal } from '@angular/core';
import { DropdownLayout } from "../dropdown-layout/dropdown-layout";

@Component({
  selector: 'app-header',
  imports: [DropdownLayout],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  isModalOpen = signal(false);

  Logout() {
    localStorage.removeItem('token');
  }
}
