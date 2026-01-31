import { Component, inject, OnInit, output, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { UserResponse } from '../../types/U';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styles: ``,
})
export class Profile implements OnInit {
  authService = inject(AuthService);
  profile = signal({} as UserResponse);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.authService.getMyProfile().subscribe((response) => {
      this.profile.set(response);
    });
  }
}
