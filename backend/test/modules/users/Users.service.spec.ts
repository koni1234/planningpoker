import { UsersService } from '../../../src/modules/users/Users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { CreateUserDto } from '../../../src/modules/users/dto/input/CreateUser.dto';

jest.mock('uuid', () => ({
  v4: () => 'uuid',
}));

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;

  const mockedCache = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CACHE_MANAGER,
          useValue: mockedCache,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    module.close();
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a user properly', async () => {
    const userEntity = { id: 'user-id' };

    jest.spyOn(mockedCache, 'get').mockReturnValueOnce(userEntity);

    const result = await service.getUser('id');

    expect(mockedCache.get).toHaveBeenCalledWith('user-id');
    expect(result).toStrictEqual(userEntity);
  });

  it('Should create and return a new user properly', async () => {
    jest.spyOn(mockedCache, 'set').mockReturnValueOnce(true);

    const dto: CreateUserDto = { name: 'username' };
    const userEntity = { id: 'uuid', name: 'username' };
    const result = await service.createUser(dto);

    expect(mockedCache.set).toHaveBeenCalledWith('user-uuid', userEntity, {
      ttl: 12220,
    });
    expect(result).toStrictEqual(userEntity);
  });
});
