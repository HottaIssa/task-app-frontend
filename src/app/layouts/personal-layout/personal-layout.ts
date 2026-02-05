import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-personal-layout',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './personal-layout.html',
  styles: ``,
})
export class PersonalLayout {
  auth = inject(AuthService);

}
