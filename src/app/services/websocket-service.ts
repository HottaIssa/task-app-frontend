import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { myRxStompConfig } from '../config/rx-stomp';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends RxStomp {
  constructor() {
    super();
  }

  initiate(): void {
    if (!this.active) {
      this.configure(myRxStompConfig);
      this.activate();
    } else {
      console.log('⚠️ WebSocket ya está activo');
    }
  }

  closeConnection(): void {
    if (this.active) {
      this.deactivate().then(() => {
        console.log('🔌 WebSocket desconectado');
      });
    }
  }

  isConnected(): boolean {
    return this.active;
  }
}
