import { Component, inject, signal } from '@angular/core';
import { FloatingDropdown } from "../floating-dropdown";
import { AuthService } from '../../services/auth-service';
import { RouterLink } from "@angular/router";
import { Profile } from "../profile/profile";
import { DropdownLayout } from "../dropdown-layout/dropdown-layout";

@Component({
  selector: 'app-header',
  imports: [FloatingDropdown, RouterLink, Profile, DropdownLayout],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  isMenuOpen = signal(false);
  isProfileOpen = signal(false);
  auth = inject(AuthService);

  openProfile() {
    this.isMenuOpen.set(false);
    this.isProfileOpen.set(true);
  }

  Logout() {
    localStorage.removeItem('token');
  }
}
