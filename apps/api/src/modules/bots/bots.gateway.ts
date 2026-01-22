import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BotsService } from './bots.service.js';
import { RedisService } from '../../connectors/redis/redis.service.js';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BotsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private updateInterval: NodeJS.Timeout | null = null;

  constructor(
    private readonly botsService: BotsService,
    private readonly redisService: RedisService,
  ) {}

  afterInit() {
    console.log('WebSocket Gateway initialized');
    this.startBroadcasting();
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Send recent messages on connect
    const recentMessages = await this.getRecentMessagesFromAllBots();
    recentMessages.forEach((msg) => client.emit('message:new', msg));
  }

  private async getRecentMessagesFromAllBots() {
    const botNames = ['Andy', 'Bruno', 'Carlos', 'Diana', 'Elena', 'Felix', 'Gina', 'Hugo', 'Iris', 'Juan'];
    const allMessages: Array<{ sender: string; content: string; type: string; timestamp: string }> = [];

    for (const botName of botNames) {
      const messages = await this.botsService.getBotMessages(botName);
      if (messages && messages.length > 0) {
        allMessages.push(...messages.slice(0, 5));
      }
    }

    return allMessages
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 20);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  private lastMessageTimestamps: Map<string, string> = new Map();

  private startBroadcasting() {
    this.updateInterval = setInterval(async () => {
      const bots = await this.botsService.getAllBots();
      this.server.emit('bots:state', bots);

      // Check for new messages from all bots
      await this.broadcastRecentMessages();
    }, 1000);
  }

  private async broadcastRecentMessages() {
    const botNames = ['Andy', 'Bruno', 'Carlos', 'Diana', 'Elena', 'Felix', 'Gina', 'Hugo', 'Iris', 'Juan'];

    for (const botName of botNames) {
      const messages = await this.botsService.getBotMessages(botName);
      if (messages && messages.length > 0) {
        const latestMessage = messages[0];
        const lastKnown = this.lastMessageTimestamps.get(botName);

        if (latestMessage.timestamp && latestMessage.timestamp !== lastKnown) {
          this.lastMessageTimestamps.set(botName, latestMessage.timestamp);
          this.server.emit('message:new', latestMessage);
        }
      }
    }
  }

  @SubscribeMessage('subscribe:bot')
  async handleSubscribeBot(client: Socket, botName: string) {
    client.join(`bot:${botName}`);
    const state = await this.botsService.getBot(botName);
    client.emit('bot:update', state);
  }

  @SubscribeMessage('unsubscribe:bot')
  handleUnsubscribeBot(client: Socket, botName: string) {
    client.leave(`bot:${botName}`);
  }

  broadcastBotUpdate(botName: string, data: unknown) {
    this.server.to(`bot:${botName}`).emit('bot:update', data);
  }

  broadcastNewMessage(message: unknown) {
    this.server.emit('message:new', message);
  }
}
