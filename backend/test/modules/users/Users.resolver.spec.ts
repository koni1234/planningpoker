import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '../../../src/modules/users/Users.resolver';
import { CreateUserDto } from '../../../src/modules/users/dto/input/CreateUser.dto';
import { UsersService } from '../../../src/modules/users/Users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let module: TestingModule;

  const mockedUsersService = {
    getUser: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: UsersService, useValue: mockedUsersService },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  afterEach(() => {
    module.close();
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('Should return a user properly', async () => {
    const userEntity = { id: 'user-id' };

    jest.spyOn(mockedUsersService, 'getUser').mockReturnValueOnce(userEntity);

    const result = await resolver.getUser('id');

    expect(mockedUsersService.getUser).toHaveBeenCalledWith('id');
    expect(result).toStrictEqual(userEntity);
  });

  it('Should create and return a new user properly', async () => {
    const userEntity = { id: 'uuid', name: 'username' };
    const dto: CreateUserDto = { name: 'username' };

    jest
      .spyOn(mockedUsersService, 'createUser')
      .mockReturnValueOnce(userEntity);

    const result = await resolver.createUser(dto);

    expect(mockedUsersService.createUser).toHaveBeenCalledWith(dto);
    expect(result).toStrictEqual(userEntity);
  });
});
