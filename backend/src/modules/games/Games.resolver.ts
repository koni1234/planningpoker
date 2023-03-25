import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { GamesService } from './Games.service';
import { CreateGameDto } from './dto/input/CreateGame.dto';
import { Game } from '../../graphql';
import { Inject } from '@nestjs/common';
import { EnterGameDto } from './dto/input/EnterGame.dto';
import { LeaveGameDto } from './dto/input/LeaveGame.dto';
import { VoteDto } from './dto/input/Vote.dto';
import { CloseGameDto } from './dto/input/CloseGame.dto';
import { ResetGameDto } from './dto/input/ResetGame.dto';
import { SetGameIssueDto } from './dto/input/SetGameIssue.dto';
import { PUB_SUB } from '../pubSub/PubSub.module';

@Resolver('Game')
export class GamesResolver {
  constructor(
    @Inject(PUB_SUB) private pubSub: PubSubEngine,
    private readonly gamesService: GamesService,
  ) {}

  @Query('getGame')
  async getGame(@Args('id') id: string): Promise<Game> {
    const game = await this.gamesService.getGame(id);

    this.pubSub.publish('gameCreated', game);

    return game;
  }

  @Mutation('createGame')
  async createGame(@Args('createGameInput') dto: CreateGameDto): Promise<Game> {
    const game = await this.gamesService.createGame(dto);

    this.pubSub.publish('gameCreated', game);

    return game;
  }

  @Subscription('gameCreated', {
    resolve: (value) => value,
  })
  gameCreated() {
    return this.pubSub.asyncIterator('gameCreated');
  }

  @Mutation('enterGame')
  async enterGame(@Args('enterGameInput') dto: EnterGameDto): Promise<Game> {
    const game = await this.gamesService.enterGame(dto);

    this.pubSub.publish('gameUpdated', game);

    return game;
  }

  @Mutation('leaveGame')
  async leaveGame(@Args('leaveGameInput') dto: LeaveGameDto): Promise<Game> {
    const game = await this.gamesService.leaveGame(dto);

    this.pubSub.publish('gameUpdated', game);

    return game;
  }

  @Mutation('vote')
  async vote(@Args('voteInput') dto: VoteDto): Promise<Game> {
    const game = await this.gamesService.vote(dto);

    this.pubSub.publish('gameUpdated', game);

    return game;
  }

  @Mutation('closeGame')
  async closeGame(@Args('closeGameInput') dto: CloseGameDto): Promise<Game> {
    const game = await this.gamesService.closeGame(dto);

    this.pubSub.publish('gameUpdated', game);

    return game;
  }

  @Mutation('resetGame')
  async resetGame(@Args('resetGameInput') dto: ResetGameDto): Promise<Game> {
    const game = await this.gamesService.resetGame(dto);

    this.pubSub.publish('gameUpdated', game);

    return game;
  }

  @Mutation('setGameIssue')
  async setGameIssue(
    @Args('setGameIssueInput') dto: SetGameIssueDto,
  ): Promise<Game> {
    const game = await this.gamesService.setGameIssue(dto);

    this.pubSub.publish('gameUpdated', game);

    return game;
  }

  @Subscription('gameUpdated', {
    filter: (payload: Game, variables: { gameId: string }) =>
      payload.id === variables.gameId,
    resolve: (value) => value,
  })
  gameUpdated() {
    return this.pubSub.asyncIterator('gameUpdated');
  }
}
