import { Injectable, signal, inject, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './websocket-service';
import { AuthService } from './auth-service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import type { Notification } from '../types/U';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  private wsService = inject(WebSocketService);
  private authService = inject(AuthService);

  private readonly apiUrl = 'http://localhost:8080/api/notifications';

  private notificationsState = signal<Notification[]>([]);
  public notifications = this.notificationsState.asReadonly();

  public unreadCount = computed(() => this.notificationsState().filter((n) => !n.isRead).length);

  private wsConnectedState = signal<boolean>(false);
  public wsConnected = this.wsConnectedState.asReadonly();

  private isLoadingState = signal<boolean>(false);
  public isLoading = this.isLoadingState.asReadonly();

  constructor() {
    this.init();
  }

  private init(): void {
    const userId = this.authService.getId();

    if (!userId) {
      console.warn('⚠️ No hay usuario autenticado');
      return;
    }

    this.wsService.initiate();

    this.loadInitialNotifications();

    this.subscribeToRealTime(userId);

    this.monitorWebSocketConnection();
  }

  private loadInitialNotifications(): void {
    this.isLoadingState.set(true);

    this.http
      .get<any>(`${this.apiUrl}/unread?page=0&size=20`)
      .pipe(
        map((response) => {
          return response.content ? response.content : response;
        }),
        catchError((error) => {
          console.error('❌ Error cargando notificaciones:', error);
          return of([]);
        }),
      )
      .subscribe((data: Notification[]) => {
        this.notificationsState.set(data);
        this.isLoadingState.set(false);
      });
  }

  private subscribeToRealTime(userId: string): void {
    const destination = `/topic/notifications/${userId}`;

    const subscription = this.wsService.watch(destination).subscribe({
      next: (message: any) => {

        try {
          const newNotification: Notification = JSON.parse(message.body);

          this.notificationsState.update((current) => [newNotification, ...current]);

          this.playNotificationSound();

          this.showToast(newNotification);
        } catch (e) {
          console.error('❌ Error parseando notificación:', e);
        }
      },
      error: (error) => {
        console.error('❌ Error en suscripción:', error);
      },
      complete: () => {
        console.log('⚠️ Suscripción completada');
      },
    });
  }

  private monitorWebSocketConnection(): void {
    setInterval(() => {
      const isConnected = this.wsService.isConnected();
      if (isConnected !== this.wsConnectedState()) {
        this.wsConnectedState.set(isConnected);
      }
    }, 2000);
  }

  public markAsRead(notificationId: string): void {
    this.http
      .patch(`${this.apiUrl}/${notificationId}/read`, {})
      .pipe(
        catchError((error) => {
          console.error('❌ Error marcando como leída:', error);
          return of(null);
        }),
      )
      .subscribe(() => {

        this.notificationsState.update((list) =>
          list.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)),
        );
      });
  }

  public markAllAsRead(): void {
    this.http
      .patch(`${this.apiUrl}/read-all`, {})
      .pipe(
        catchError((error) => {
          console.error('❌ Error marcando todas como leídas:', error);
          return of(null);
        }),
      )
      .subscribe(() => {

        this.notificationsState.update((list) => list.map((n) => ({ ...n, isRead: true })));
      });
  }

  public deleteNotification(notificationId: string): void {
    this.http
      .delete(`${this.apiUrl}/${notificationId}`)
      .pipe(
        catchError((error) => {
          console.error('❌ Error eliminando notificación:', error);
          return of(null);
        }),
      )
      .subscribe(() => {

        this.notificationsState.update((list) => list.filter((n) => n.id !== notificationId));
      });
  }

  private playNotificationSound(): void {
    try {
      const audio = new Audio('assets/sounds/notification.mp3');
      audio.volume = 0.5;
      audio.play().catch((e) => {
        console.log('⚠️ No se pudo reproducir sonido:', e);
      });
    } catch (e) {
      console.error('❌ Error reproduciendo sonido:', e);
    }
  }

  private showToast(notification: Notification): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.type, {
        body: notification.message,
        icon: 'assets/logo.png',
      });
    }
  }

  public requestNotificationPermission(): void {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        console.log('Permiso de notificaciones:', permission);
      });
    }
  }

  public cleanup(): void {
    this.wsService.closeConnection();
    this.notificationsState.set([]);
  }
}
