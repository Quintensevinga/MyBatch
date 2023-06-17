import mongoose from 'mongoose';
import supertest from 'supertest';
import { createServer } from '../server';
import { beerRecipe, myRecipe, addIngredient } from '../models/models';

beforeEach(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/mybatch');
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

const app = createServer();

test('GET /ingredients', async () => {
  const ingredient = await addIngredient.create({
    name: 'Maltone',
    amount: 'Loremipsum',
    type: 'soft',
  });

  await supertest(app)
    .get('/inventory')
    .expect(200)
    .then((response) => {
      // Check the response type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      //   expect(response.body.length).toEqual(1);

      // Check the response data
      expect(response.body[response.body.length - 1]._id).toBe(ingredient.id);
      expect(response.body[response.body.length - 1].name).toBe(ingredient.name);
      expect(response.body[response.body.length - 1].amount).toBe(ingredient.amount);
      expect(response.body[response.body.length - 1].type).toBe(ingredient.type);
    });
});

test('POST /ingredients', async () => {
  const data = {
    name: 'Maltone',
    amount: 'Loremipsum',
    type: 'soft',
  };

  await supertest(app)
    .post('/inventory')
    .send(data)
    .expect(201)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(data.name);
      expect(response.body.amount).toBe(data.amount);
      expect(response.body.type).toBe(data.type);

      // Check the data in the database
      const oneIngredient = await addIngredient.findOne({ _id: response.body._id });
      expect(oneIngredient).toBeTruthy();
      expect(oneIngredient?.name).toBe(data.name);
      expect(oneIngredient?.amount).toBe(data.amount);
      expect(oneIngredient?.type).toBe(data.type);
    });
});
