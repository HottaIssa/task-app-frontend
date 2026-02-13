import { Component, inject, signal, OnDestroy } from '@angular/core';
import { FloatingDropdown } from '../floating-dropdown';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { UserResponse } from '../../types/U';
import { NotificationService } from '../../services/notification-service'; // Asegúrate de la ruta correcta
import { DatePipe, CommonModule } from '@angular/common';
import type { Notification } from '../../types/U';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FloatingDropdown, DatePipe, CommonModule, RouterLink],
  templateUrl: './header.html',
  styles: ``,
})
export class Header implements OnDestroy {
  // Servicios
  auth = inject(AuthService);
  userService = inject(UserService);
  notifService = inject(NotificationService); // Inyección de tu nuevo servicio
  private router = inject(Router);

  // Estados de UI
  isMenuOpen = signal(false);
  isNotificationsOpen = signal(false);

  profile = signal({} as UserResponse);

  ngOnInit(): void {
    this.loadData();
    // Nota: El NotificationService se inicializa solo en su constructor
  }

  ngOnDestroy(): void {
    // Cerramos la conexión socket al salir (opcional, si el header se destruye al hacer logout)
    this.notifService.cleanup();
  }

  loadData() {
    this.userService.getMyProfile().subscribe((response) => {
      this.profile.set(response);
    });
  }

  // --- Lógica de Notificaciones ---

  toggleNotifications() {
    this.isNotificationsOpen.update((v) => !v);
    if (this.isNotificationsOpen()) {
      this.isMenuOpen.set(false); // Cierra el menú de usuario si se abre este
    }
  }

  handleNotificationClick(notification: Notification) {
    if (!notification.isRead) {
      this.notifService.markAsRead(notification.id);
    }

    if (notification.taskId) {
      this.router.navigate([`p/${notification.projectId}`, { outlets: { modal: ['t', notification.taskId] } }]);
    }

    this.isNotificationsOpen.set(false);
  }

  markAllRead() {
    this.notifService.markAllAsRead();
  }
}
