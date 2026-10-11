import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /healthz returns ok', () => {
    return request(app.getHttpServer())
      .get('/healthz')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('POST /notes then GET /notes', async () => {
    const server = app.getHttpServer();

    await request(server)
      .post('/notes')
      .send({ text: 'купить хлеб' })
      .expect(201)
      .expect({ id: 1, text: 'купить хлеб' });

    await request(server)
      .get('/notes')
      .expect(200)
      .expect([{ id: 1, text: 'купить хлеб' }]);
  });

  it('GET /notes/:id and DELETE /notes/:id', async () => {
    const server = app.getHttpServer();

    await request(server)
      .post('/notes')
      .send({ text: 'вторая' })
      .expect(201);

    await request(server)
      .get('/notes/1')
      .expect(200)
      .expect({ id: 1, text: 'вторая' });

    await request(server).delete('/notes/1').expect(200);
    await request(server).get('/notes/1').expect(404);
  });
});
