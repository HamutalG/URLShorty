import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/urlshorty',
        connectionFactory: (connection: Connection) => {
          console.log('✅ Connected to MongoDB');
          connection.on('error', (err) =>
            console.error('❌ MongoDB connection error:', err),
          );
          return connection;
        },
      }),
    }),
    UrlModule,
  ],
})
export class AppModule {}
