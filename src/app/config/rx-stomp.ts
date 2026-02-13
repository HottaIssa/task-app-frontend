import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {
  brokerURL: 'ws://localhost:8080/ws',

  heartbeatIncoming: 4000, // ✅ Cambiar de 0 a 4000
  heartbeatOutgoing: 4000, // ✅ Cambiar de 20000 a 4000
  reconnectDelay: 5000, // ✅ Cambiar de 200 a 5000 (esperar más entre reintentos)

  connectionTimeout: 5000, // ✅ Agregar: timeout para conexión
  maxWebSocketChunkSize: 8 * 1024 * 1024, // ✅ Agregar: tamaño máximo de frame
};
