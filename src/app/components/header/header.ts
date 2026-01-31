import { Component, signal } from '@angular/core';
import { DropdownLayout } from "../dropdown-layout/dropdown-layout";
import { Profile } from '../profile/profile';

@Component({
  selector: 'app-header',
  imports: [DropdownLayout, Profile],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  isMenuOpen = signal(false);
  isProfileOpen = signal(false);

  openProfile() {
    this.isMenuOpen.set(false);
    this.isProfileOpen.set(true);
  }

  Logout() {
    localStorage.removeItem('token');
  }
}
