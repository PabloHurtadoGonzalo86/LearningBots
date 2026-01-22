import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ImprovementsService } from './improvements.service.js';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ImprovementsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private analyzeInterval: NodeJS.Timeout | null = null;

  constructor(private readonly improvementsService: ImprovementsService) {}

  afterInit() {
    this.startAnalyzing();
  }

  private startAnalyzing() {
    this.analyzeInterval = setInterval(async () => {
      const improvements = await this.improvementsService.analyzeSystem();
      if (improvements.length > 0) {
        this.server.emit('improvements:update', improvements);
      }
    }, 10000);
  }

  @SubscribeMessage('get:improvements')
  handleGetImprovements(client: Socket) {
    const improvements = this.improvementsService.getImprovements();
    client.emit('improvements:update', improvements);
  }
}
