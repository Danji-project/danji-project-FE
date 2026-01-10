# 단체 채팅 기능 구현 가이드

## 개요

WebSocket을 이용한 실시간 단체 채팅 기능이 구현되었습니다.

## 구현 흐름

### 1. 토큰 발급

- `/api/auth/token` - GET 요청으로 임시 토큰 발급

### 2. WebSocket 연결

- `useGroupChat` 훅에서 자동으로 토큰을 받아 WebSocket 연결
- `/api/ws/chat?token={token}`으로 핸드셰이크

### 3. 채팅방 구독

- `/subscribe`를 통해 기존 구독 채널 리스트 확인
- 받은 roomId들을 사용하여 `/topic/chat/{roomId}` 구독

### 4. 메시지 송수신

- **송신**: `/pub/chat/{roomId}`로 메시지 전송
  - 포맷: `{"message": "메시지 내용"}`
- **수신**: `/topic/chat/{roomId}` 구독을 통해 실시간 메시지 수신

## 파일 구조

### 생성된 파일

```
src/
├── utils/websocket.ts              # WebSocket 매니저 (싱글톤)
├── hooks/useGroupChat.ts           # WebSocket 관리 커스텀 훅
├── components/common/chatting-bodies/
│   ├── GroupChatting.tsx           # 단체 채팅 목록
│   └── GroupChatting.module.scss   # 단체 채팅 스타일
├── types/websocket.d.ts            # TypeScript 타입 정의
└── pages/chat-detail/
    └── ChattingDetail.tsx          # 채팅 상세 페이지 (수정됨)
```

## 컴포넌트 구조

### GroupChatting (단체 채팅 목록)

- `/api/chat/group` API에서 단체 채팅 목록 조회
- 각 채팅방 클릭 시 `/chat-detail/{roomId}`로 이동
- 로딩, 에러, 빈 상태 처리

### ChattingDetail (채팅 상세 페이지)

- `useGroupChat` 훅으로 WebSocket 관리
- 현재 방의 메시지만 필터링하여 표시
- 메시지 전송 기능
- 실시간 메시지 수신

## 사용 예제

### 커스텀 훅 사용

```typescript
const { isConnected, messages, sendMessage } = useGroupChat();

// 메시지 전송
sendMessage(roomId, "메시지 내용");

// 현재 방의 메시지
const roomMessages = messages.filter((msg) => msg.roomId === roomId);
```

## 주요 기능

✅ WebSocket 자동 연결
✅ 임시 토큰 자동 발급
✅ 다중 채팅방 구독
✅ 실시간 메시지 송수신
✅ 자동 메시지 스크롤
✅ 연결 상태 표시
✅ 에러 처리

## 구성도

```
ChattingBodies (채팅 메인)
    ├── DirectChatting (1:1 채팅)
    ├── GroupChatting (단체 채팅 목록) ← 클릭
    │   └── navigate to /chat-detail/{roomId}
    ├── ReceivedPrompt (받은 요청)
    └── SentPrompt (보낸 요청)

ChattingDetail (채팅 상세)
    ├── useGroupChat 훅
    │   └── chatWSManager (WebSocket 관리)
    ├── 메시지 표시 (groupMessagesByDate로 날짜별 분류)
    └── 메시지 입력/전송
```

## 주의사항

1. **CDN 로드**: index.html에 SockJS와 STOMP CDN이 포함되어 있습니다.
2. **토큰**: 매 세션마다 새로운 토큰이 발급됩니다.
3. **타입 안정성**: TypeScript 타입이 설정되어 있으므로 컴파일 시점에 오류를 잡을 수 있습니다.
4. **메모리 누수**: 컴포넌트 언마운트 시 WebSocket이 자동으로 정리됩니다.

## 테스트 방법

1. 채팅 탭에서 "단체 채팅" 선택
2. 채팅방 목록 확인
3. 특정 채팅방 클릭
4. 메시지 입력 및 전송
5. 다른 사용자의 메시지 실시간 수신 확인
