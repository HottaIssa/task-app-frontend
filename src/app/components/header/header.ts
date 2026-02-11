import { Component, inject, signal } from '@angular/core';
import { FloatingDropdown } from '../floating-dropdown';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { UserResponse } from '../../types/U';

@Component({
  selector: 'app-header',
  imports: [FloatingDropdown, RouterLink],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  isMenuOpen = signal(false);
  auth = inject(AuthService);

  userService = inject(UserService);
  profile = signal({} as UserResponse);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getMyProfile().subscribe((response) => {
      this.profile.set(response);
    });
  }
}
