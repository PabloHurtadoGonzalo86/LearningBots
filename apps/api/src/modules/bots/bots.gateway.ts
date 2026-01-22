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

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  private startBroadcasting() {
    this.updateInterval = setInterval(async () => {
      const bots = await this.botsService.getAllBots();
      this.server.emit('bots:state', bots);
    }, 1000);
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
