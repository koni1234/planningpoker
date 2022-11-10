import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GamesModule } from './games/Games.module';
import { UsersModule } from './users/Users.module';
import { PubSubModule } from './pubSub/PubSub.module';
import { JiraModule } from './jira/Jira.module';
import { ConfigModule } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      url: 'redis://' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT,
    }),
    PubSubModule,
    GamesModule,
    UsersModule,
    JiraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
