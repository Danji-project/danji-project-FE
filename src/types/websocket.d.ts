// WebSocket 라이브러리 타입 정의
declare global {
  interface Window {
    SockJS: any;
    Stomp: any;
  }
}

export {};
