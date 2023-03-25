import { Test, TestingModule } from '@nestjs/testing';
import { CloseGameDto } from 'Modules/games/dto/input/CloseGame.dto';
import { CreateGameDto } from 'Modules/games/dto/input/CreateGame.dto';
import { EnterGameDto } from 'Modules/games/dto/input/EnterGame.dto';
import { GamesResolver } from 'Modules/games/Games.resolver';
import { GamesService } from 'Modules/games/Games.service';
import { LeaveGameDto } from 'Modules/games/dto/input/LeaveGame.dto';
import { PUB_SUB } from 'Modules/pubSub/PubSub.module';
import { ResetGameDto } from 'Modules/games/dto/input/ResetGame.dto';
import { VoteDto } from 'Modules/games/dto/input/Vote.dto';
import { VotingScaleType } from 'Graphql';

describe('GamesResolver', () => {
  let resolver: GamesResolver;
  let module: TestingModule;

  const mockedGamesService = {
    getGame: jest.fn(),
    createGame: jest.fn(),
    enterGame: jest.fn(),
    leaveGame: jest.fn(),
    vote: jest.fn(),
    closeGame: jest.fn(),
    resetGame: jest.fn(),
    setGameIssue: jest.fn(),
  };

  const mockedPubSub = {
    publish: jest.fn(),
    asyncIterator: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        GamesResolver,
        { provide: PUB_SUB, useValue: mockedPubSub },
        { provide: GamesService, useValue: mockedGamesService },
      ],
    }).compile();

    resolver = module.get<GamesResolver>(GamesResolver);
  });

  afterEach(() => {
    module.close();
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('Should return a game properly', async () => {
    const gameEntity = { id: 'game-id' };

    jest.spyOn(mockedGamesService, 'getGame').mockReturnValueOnce(gameEntity);

    const result = await resolver.getGame('id');

    expect(mockedGamesService.getGame).toHaveBeenCalledWith('id');
    expect(mockedPubSub.publish).toHaveBeenCalledWith(
      'gameCreated',
      gameEntity,
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should create and return a new game properly', async () => {
    const gameEntity = { id: 'game-id', name: 'new game' };
    const dto: CreateGameDto = {
      id: 'game-id',
      ownerId: 'owner-id',
      ownerName: 'owner',
      name: 'new game',
      votingScale: VotingScaleType.fibonacci,
    };

    jest
      .spyOn(mockedGamesService, 'createGame')
      .mockReturnValueOnce(gameEntity);

    const result = await resolver.createGame(dto);

    expect(mockedGamesService.createGame).toHaveBeenCalledWith(dto);
    expect(mockedPubSub.publish).toHaveBeenCalledWith(
      'gameCreated',
      gameEntity,
    );

    expect(result).toStrictEqual(gameEntity);
  });

  it('Should enter in a game properly', async () => {
    const gameEntity = { id: 'game-id' };
    const dto: EnterGameDto = {
      gameId: 'game-id',
      userId: 'user-id',
      userName: 'username',
    };

    jest.spyOn(mockedGamesService, 'enterGame').mockReturnValueOnce(gameEntity);

    const result = await resolver.enterGame(dto);

    expect(mockedGamesService.enterGame).toHaveBeenCalledWith(dto);
    expect(mockedPubSub.publish).toHaveBeenCalledWith(
      'gameUpdated',
      gameEntity,
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should leave a game properly', async () => {
    const gameEntity = { id: 'game-id' };
    const dto: LeaveGameDto = {
      gameId: 'game-id',
      userId: 'user-id',
    };

    jest.spyOn(mockedGamesService, 'leaveGame').mockReturnValueOnce(gameEntity);

    const result = await resolver.leaveGame(dto);

    expect(mockedGamesService.leaveGame).toHaveBeenCalledWith(dto);
    expect(mockedPubSub.publish).toHaveBeenCalledWith(
      'gameUpdated',
      gameEntity,
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should vote a game properly', async () => {
    const gameEntity = { id: 'game-id' };
    const dto: VoteDto = {
      gameId: 'game-id',
      userId: 'user-id',
      vote: 'XL',
    };

    jest.spyOn(mockedGamesService, 'vote').mockReturnValueOnce(gameEntity);

    const result = await resolver.vote(dto);

    expect(mockedGamesService.vote).toHaveBeenCalledWith(dto);
    expect(mockedPubSub.publish).toHaveBeenCalledWith(
      'gameUpdated',
      gameEntity,
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should close a game properly', async () => {
    const gameEntity = { id: 'game-id' };
    const dto: CloseGameDto = {
      gameId: 'game-id',
      userId: 'user-id',
    };

    jest.spyOn(mockedGamesService, 'closeGame').mockReturnValueOnce(gameEntity);

    const result = await resolver.closeGame(dto);

    expect(mockedGamesService.closeGame).toHaveBeenCalledWith(dto);
    expect(mockedPubSub.publish).toHaveBeenCalledWith(
      'gameUpdated',
      gameEntity,
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should reset a game properly', async () => {
    const gameEntity = { id: 'game-id' };
    const dto: ResetGameDto = {
      gameId: 'game-id',
      userId: 'user-id',
    };

    jest.spyOn(mockedGamesService, 'resetGame').mockReturnValueOnce(gameEntity);

    const result = await resolver.resetGame(dto);

    expect(mockedGamesService.resetGame).toHaveBeenCalledWith(dto);
    expect(mockedPubSub.publish).toHaveBeenCalledWith(
      'gameUpdated',
      gameEntity,
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should resolve gameCreated subscription properly', () => {
    resolver.gameCreated();

    expect(mockedPubSub.asyncIterator).toHaveBeenCalledWith('gameCreated');
  });

  it('Should resolve gameUpdated subscription properly', () => {
    resolver.gameUpdated();

    expect(mockedPubSub.asyncIterator).toHaveBeenCalledWith('gameUpdated');
  });
});
