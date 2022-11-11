import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateGameDto } from './dto/input/CreateGame.dto';
import { Game, User } from '../../graphql';
import { EnterGameDto } from './dto/input/EnterGame.dto';
import { LeaveGameDto } from './dto/input/LeaveGame.dto';
import { VoteDto } from './dto/input/Vote.dto';
import { CloseGameDto } from './dto/input/CloseGame.dto';
import { ResetGameDto } from './dto/input/ResetGame.dto';
import { SetGameIssueDto } from './dto/input/SetGameIssue.dto';

@Injectable()
export class GamesService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async getGame(id: string): Promise<Game | undefined> {
    return await this.cacheService.get<Game>('game-' + id);
  }

  async createGame(dto: CreateGameDto): Promise<Game> {
    const game: Game = {
      name: dto.name,
      ownerId: dto.ownerId,
      id: dto.id,
      votingScale: dto.votingScale,
      users: [
        {
          id: dto.ownerId,
          name: dto.ownerName,
          online: true,
          vote: null,
        },
      ],
      closed: false,
      issueId: null,
    };

    await this.cacheService.set('game-' + game.id, game, {
      ttl: 12220,
    });

    return game;
  }

  async enterGame(dto: EnterGameDto): Promise<Game> {
    const game = await this.getGame(dto.gameId);
    const gameUser = game.users.find((user) => user.id === dto.userId);

    if (gameUser) {
      gameUser.online = true;
    } else {
      game.users.push({
        id: dto.userId,
        name: dto.userName,
        online: true,
        vote: null,
      });
    }

    await this.cacheService.set('game-' + game.id, game, {
      ttl: 12220,
    });

    console.log(game.users);

    return game;
  }

  async leaveGame(dto: LeaveGameDto): Promise<Game> {
    const game = await this.getGame(dto.gameId);
    const gameUser = game.users.find((user) => user.id === dto.userId);

    if (gameUser.vote) {
      gameUser.online = false;
    } else {
      game.users = game.users.filter((user) => user.id !== dto.userId);
    }

    await this.cacheService.set('game-' + game.id, game, {
      ttl: 12220,
    });

    return game;
  }

  async vote(dto: VoteDto): Promise<Game> {
    const game = await this.getGame(dto.gameId);
    const user = game.users.find((user) => user.id === dto.userId);

    if (user && !game.closed) {
      user.vote = dto.vote;
      await this.cacheService.set('game-' + game.id, game, {
        ttl: 12220,
      });
    }

    return game;
  }

  async closeGame(dto: CloseGameDto): Promise<Game> {
    const game = await this.getGame(dto.gameId);

    if (game.ownerId === dto.userId && !game.closed) {
      game.closed = true;
      await this.cacheService.set('game-' + game.id, game, {
        ttl: 12220,
      });
    }

    return game;
  }

  async setGameIssue(dto: SetGameIssueDto): Promise<Game> {
    const game = await this.getGame(dto.gameId);

    if (game.ownerId === dto.userId && !game.closed) {
      game.issueId = dto.issueId;
      await this.cacheService.set('game-' + game.id, game, {
        ttl: 12220,
      });
    }

    return game;
  }

  async resetGame(dto: ResetGameDto): Promise<Game> {
    const game = await this.getGame(dto.gameId);

    if (game.ownerId === dto.userId) {
      game.closed = false;
      game.issueId = null;
      game.users = game.users.reduce((onlineUsers: User[], user: User) => {
        if (!!user.online) {
          onlineUsers.push({ ...user, vote: null });
        }
        return onlineUsers;
      }, []);

      await this.cacheService.set('game-' + game.id, game, {
        ttl: 12220,
      });
    }

    return game;
  }
}
