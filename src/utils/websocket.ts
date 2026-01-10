// WebSocket 채팅 매니저
type MessageCallback = (message: any) => void;
type SubscribeCallback = (rooms: string[]) => void;

class ChatWebSocketManager {
  private stompClient: any = null;
  private messageCallbacks: MessageCallback[] = [];
  private subscribeCallbacks: SubscribeCallback[] = [];
  private connectedRoomIds: Set<string> = new Set();
  private isConnecting = false;

  async connect(token: string): Promise<boolean> {
    if (this.isConnecting) return false;
    this.isConnecting = true;

    return new Promise((resolve) => {
      // SockJS와 STOMP를 동적으로 로드하거나, script로 이미 로드된 상태라고 가정
      try {
        // 브라우저 환경에서 window.SockJS와 window.Stomp 확인
        const SockJS = (window as any).SockJS;
        const Stomp = (window as any).Stomp;

        if (!SockJS || !Stomp) {
          console.error("SockJS or Stomp not loaded");
          this.isConnecting = false;
          resolve(false);
          return;
        }

        const socket = new SockJS(`/api/ws/chat?token=${token}`);
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect(
          {},
          () => {
            console.log("WebSocket connected");
            this.isConnecting = false;
            this.subscribeToChannels();
            resolve(true);
          },
          (error: any) => {
            console.error("WebSocket connection error:", error);
            this.isConnecting = false;
            resolve(false);
          }
        );
      } catch (error) {
        console.error("WebSocket setup error:", error);
        this.isConnecting = false;
        resolve(false);
      }
    });
  }

  private subscribeToChannels(): void {
    if (!this.stompClient) return;

    // /subscribe를 통해 기존 구독 채널 리스트 확인
    this.stompClient.subscribe("/subscribe", (message: any) => {
      try {
        const body = JSON.parse(message.body);
        const roomIds = body.data || [];
        console.log("Subscribed rooms:", roomIds);
        this.connectedRoomIds.clear();

        // 받은 아이디들을 사용하여 /topic/chat/{roomId}를 구독
        roomIds.forEach((roomId: string) => {
          this.subscribeToRoom(roomId);
        });

        // 콜백 실행
        this.subscribeCallbacks.forEach((callback) => callback(roomIds));
      } catch (error) {
        console.error("Error parsing subscribe message:", error);
      }
    });
  }

  private subscribeToRoom(roomId: string): void {
    if (!this.stompClient || this.connectedRoomIds.has(roomId)) return;

    this.stompClient.subscribe(`/topic/chat/${roomId}`, (message: any) => {
      try {
        const body = JSON.parse(message.body);
        console.log("Received message:", body);
        this.messageCallbacks.forEach((callback) => callback(body));
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    this.connectedRoomIds.add(roomId);
  }

  sendMessage(roomId: string, message: string): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error("WebSocket not connected");
      return;
    }

    // /pub/chat/{roomId}를 통해 메시지 작성
    this.stompClient.send(
      `/pub/chat/${roomId}`,
      {},
      JSON.stringify({ message })
    );
  }

  onMessage(callback: MessageCallback): void {
    this.messageCallbacks.push(callback);
  }

  onSubscribe(callback: SubscribeCallback): void {
    this.subscribeCallbacks.push(callback);
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        console.log("WebSocket disconnected");
      });
    }
    this.messageCallbacks = [];
    this.subscribeCallbacks = [];
    this.connectedRoomIds.clear();
  }

  isConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }

  getConnectedRooms(): string[] {
    return Array.from(this.connectedRoomIds);
  }
}

export const chatWSManager = new ChatWebSocketManager();
