import { Component, inject, signal } from '@angular/core';
import { GuestResponse } from '../../types/U';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-invitations',
  imports: [DatePipe],
  templateUrl: './invitations.html',
  styles: ``,
})
export class Invitations {
  userService = inject(UserService);
  guests = signal([] as GuestResponse[]);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.userService.getInvitations().subscribe((response) => {
      this.guests.set(response);
    });
  }
}
