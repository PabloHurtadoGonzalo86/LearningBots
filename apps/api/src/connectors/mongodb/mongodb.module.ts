import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const user = configService.get('MONGO_USER', 'mindcraft');
        const password = configService.get('MONGO_PASSWORD', 'mindcraft_user_2026');
        const host = configService.get('MONGO_HOST', 'localhost');
        const port = configService.get('MONGO_PORT', 27017);
        const database = configService.get('MONGO_DATABASE', 'mindcraft');

        return {
          uri: `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=${database}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongodbModule {}
