import { Game, VotingScaleType } from 'Graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { CloseGameDto } from 'Modules/games/dto/input/CloseGame.dto';
import { CreateGameDto } from 'Modules/games/dto/input/CreateGame.dto';
import { EnterGameDto } from 'Modules/games/dto/input/EnterGame.dto';
import { GamesService } from 'Modules/games/Games.service';
import { LeaveGameDto } from 'Modules/games/dto/input/LeaveGame.dto';
import { ResetGameDto } from 'Modules/games/dto/input/ResetGame.dto';
import { SetGameIssueDto } from 'Modules/games/dto/input/SetGameIssue.dto';
import { VoteDto } from 'Modules/games/dto/input/Vote.dto';

describe('GamesService', () => {
  let service: GamesService;
  let module: TestingModule;

  const mockedCache = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: CACHE_MANAGER,
          useValue: mockedCache,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  afterEach(() => {
    module.close();
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a game properly', async () => {
    const gameEntity = { id: 'game-id' };

    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(gameEntity);

    const result = await service.getGame('id');

    expect(mockedCache.get).toHaveBeenCalledWith('game-id');
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should create and return a new game properly', async () => {
    jest.spyOn(mockedCache, 'set').mockReturnValueOnce(true);

    const dto: CreateGameDto = {
      name: 'name',
      id: 'id',
      votingScale: VotingScaleType.fibonacci,
      ownerId: 'id',
      ownerName: 'owner',
    };

    const gameEntity: Game = {
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

    const result = await service.createGame(dto);

    expect(mockedCache.set).toHaveBeenCalledWith('game-id', gameEntity, {
      ttl: 12220,
    });
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should enter in a game properly', async () => {
    const gameEntity = { id: 'id', users: [] };

    const dto: EnterGameDto = {
      gameId: 'id',
      userId: 'id',
      userName: 'name',
    };

    jest.spyOn(mockedCache, 'set').mockReturnValueOnce(true);
    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(gameEntity);

    const result = await service.enterGame(dto);

    expect(mockedCache.get).toHaveBeenCalledWith('game-id');
    expect(mockedCache.set).toHaveBeenCalledWith(
      'game-id',
      {
        ...gameEntity,
        users: [
          {
            id: dto.userId,
            name: dto.userName,
            online: true,
            vote: null,
          },
        ],
      },
      {
        ttl: 12220,
      },
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should leave a game properly', async () => {
    const gameEntity = {
      id: 'id',
      users: [
        {
          id: 'id',
          name: 'name',
          online: true,
          vote: null,
        },
      ],
    };

    const dto: LeaveGameDto = {
      gameId: 'id',
      userId: 'id',
    };

    jest.spyOn(mockedCache, 'set').mockReturnValueOnce(true);
    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(gameEntity);

    const result = await service.leaveGame(dto);

    expect(mockedCache.get).toHaveBeenCalledWith('game-id');
    expect(mockedCache.set).toHaveBeenCalledWith(
      'game-id',
      {
        ...gameEntity,
        users: [],
      },
      {
        ttl: 12220,
      },
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should leave a game where user has voted properly', async () => {
    const gameEntity = {
      id: 'id',
      users: [
        {
          id: 'id',
          name: 'name',
          online: true,
          vote: '1',
        },
      ],
    };

    const dto: LeaveGameDto = {
      gameId: 'id',
      userId: 'id',
    };

    jest.spyOn(mockedCache, 'set').mockReturnValueOnce(true);
    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(gameEntity);

    const result = await service.leaveGame(dto);

    expect(mockedCache.get).toHaveBeenCalledWith('game-id');
    expect(mockedCache.set).toHaveBeenCalledWith(
      'game-id',
      {
        ...gameEntity,
        users: [
          {
            id: 'id',
            name: 'name',
            online: false,
            vote: '1',
          },
        ],
      },
      {
        ttl: 12220,
      },
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should vote properly', async () => {
    const gameEntity = {
      id: 'id',
      closed: false,
      users: [
        {
          id: 'id',
          name: 'name',
          online: true,
          vote: '1',
        },
      ],
    };

    const dto: VoteDto = {
      gameId: 'id',
      userId: 'id',
      vote: '5',
    };

    jest.spyOn(mockedCache, 'set').mockReturnValueOnce(true);
    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(gameEntity);

    const result = await service.vote(dto);

    expect(mockedCache.get).toHaveBeenCalledWith('game-id');
    expect(mockedCache.set).toHaveBeenCalledWith(
      'game-id',
      {
        ...gameEntity,
        users: [
          {
            id: 'id',
            name: 'name',
            online: true,
            vote: '5',
          },
        ],
      },
      {
        ttl: 12220,
      },
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it("Shouldn't vote on a closed game properly", async () => {
    const gameEntity = {
      id: 'id',
      closed: true,
      users: [
        {
          id: 'id',
          name: 'name',
          online: true,
          vote: '1',
        },
      ],
    };

    const dto: VoteDto = {
      gameId: 'id',
      userId: 'id',
      vote: '5',
    };

    jest.spyOn(mockedCache, 'set');
    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(gameEntity);

    const result = await service.vote(dto);

    expect(mockedCache.get).toHaveBeenCalledWith('game-id');
    expect(mockedCache.set).not.toBeCalled();
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should close a game properly', async () => {
    const gameEntity = {
      id: 'id',
      closed: false,
      users: [],
      ownerId: 'ownerId',
    };

    const dto: CloseGameDto = {
      gameId: 'id',
      userId: 'ownerId',
    };

    jest.spyOn(mockedCache, 'set').mockReturnValueOnce(true);
    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(gameEntity);

    const result = await service.closeGame(dto);

    expect(mockedCache.get).toHaveBeenCalledWith('game-id');
    expect(mockedCache.set).toHaveBeenCalledWith(
      'game-id',
      {
        ...gameEntity,
        closed: true,
      },
      {
        ttl: 12220,
      },
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should set the game issue data properly', async () => {
    const gameEntity = {
      id: 'id',
      closed: false,
      users: [],
      ownerId: 'ownerId',
    };

    const dto: SetGameIssueDto = {
      gameId: 'id',
      userId: 'ownerId',
      issueId: 'issueId',
    };

    jest.spyOn(mockedCache, 'set').mockReturnValueOnce(true);
    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(gameEntity);

    const result = await service.setGameIssue(dto);

    expect(mockedCache.get).toHaveBeenCalledWith('game-id');
    expect(mockedCache.set).toHaveBeenCalledWith(
      'game-id',
      {
        ...gameEntity,
        issueId: 'issueId',
      },
      {
        ttl: 12220,
      },
    );
    expect(result).toStrictEqual(gameEntity);
  });

  it('Should reset the game properly', async () => {
    const gameEntity = {
      id: 'id',
      closed: true,
      ownerId: 'ownerId',
      issueId: 'issueId',
      users: [
        {
          id: 'id',
          name: 'name',
          online: true,
          vote: '1',
        },
        {
          id: 'id2',
          name: 'name2',
          online: false,
          vote: '1',
        },
      ],
    };

    const dto: ResetGameDto = {
      gameId: 'id',
      userId: 'ownerId',
    };

    jest.spyOn(mockedCache, 'set').mockReturnValueOnce(true);
    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(gameEntity);

    const result = await service.resetGame(dto);

    expect(mockedCache.get).toHaveBeenCalledWith('game-id');
    expect(mockedCache.set).toHaveBeenCalledWith(
      'game-id',
      {
        id: 'id',
        closed: false,
        ownerId: 'ownerId',
        issueId: null,
        users: [
          {
            id: 'id',
            name: 'name',
            online: true,
            vote: null,
          },
        ],
      },
      {
        ttl: 12220,
      },
    );
    expect(result).toStrictEqual(gameEntity);
  });
});
