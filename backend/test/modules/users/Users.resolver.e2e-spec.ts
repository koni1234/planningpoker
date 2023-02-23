import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/modules/app.module';
import { INestApplication } from '@nestjs/common';

const gql = '/graphql';

describe('GraphQL UsersResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create and get a new user', () => {
    let userId;

    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation {createUser(createUserInput: { name: "Username" }) {id name vote online}}',
      })
      .expect(200)
      .expect((res) => {
        userId = res.body.data.createUser.id;

        expect(res.body.data.createUser).toEqual({
          id: userId,
          name: 'Username',
          vote: null,
          online: null,
        });
      })
      .then(() =>
        request(app.getHttpServer())
          .post(gql)
          .send({
            query: '{getUser(id: "' + userId + '") {name}}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.getUser).toEqual({
              name: 'Username',
            });
          }),
      );
  });
});
