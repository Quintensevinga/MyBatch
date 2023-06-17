import mongoose from 'mongoose';
import supertest from 'supertest';
import { createServer } from '../server';
import { beerRecipe, myRecipe, addIngredient } from '../models/models';
import { disconnectDBForTesting } from '../models/db';

beforeEach(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/checking');
});

/* Closing database connection after each test. */
afterEach(async () => {
  await addIngredient.deleteMany();
  await beerRecipe.deleteMany();
  await myRecipe.deleteMany();
  disconnectDBForTesting();
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
      expect(response.body.length).toEqual(1);

      // Check the response data
      expect(response.body[0]._id).toBe(ingredient.id);
      expect(response.body[0].name).toBe(ingredient.name);
      expect(response.body[0].amount).toBe(ingredient.amount);
      expect(response.body[0].type).toBe(ingredient.type);
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

test('DELETE inventory/:id', async () => {
  const post = await addIngredient.create({
    name: 'Mcheck',
    amount: 'Loremipsum',
    type: 'soft',
  });

  await supertest(app)
    .delete('/inventory/' + post.id)
    .expect(200)
    .then(async () => {
      expect(await addIngredient.findOne({ _id: post.id })).toBeFalsy();
    });
});

test('GET /ourrecipes', async () => {
  const ingredient = await beerRecipe.create({
    name: 'Pilsnersds',
    style: 'Pilsner',
    description: 'A crisp and light-bodied beer with a clean malt profile and floral hop aroma.',
    batchSize: '20 liters',
    ingredients: {
      malts: [
        {
          name: 'Pilsner Malt',
          amount: '4 kg',
        },
      ],
      hops: [
        {
          name: 'Saaz',
          amount: '30 g',
          time: '60 minutes',
        },
        {
          name: 'Saaz',
          amount: '20 g',
          time: '15 minutes',
        },
        {
          name: 'Saaz',
          amount: '20 g',
          time: '5 minutes',
        },
      ],
      yeast: 'Czech Lager',
    },
    instructions: [
      'Mash the Pilsner malt with hot water at 65°C for 60 minutes.',
      'Boil the wort and add Saaz hops for bittering at 60 minutes.',
      'Add Saaz hops at 15 minutes remaining in the boil.',
      'Add Saaz hops at 5 minutes remaining in the boil.',
      'Cool the wort and transfer to a fermentation vessel.',
      'Pitch the Czech Lager yeast and ferment at 10-12°C for one to two weeks.',
      'Bottle or keg the beer, carbonate, and enjoy!',
    ],
  });

  await supertest(app)
    .get('/our-recipes')
    .expect(200)
    .then((response) => {
      // Check the response type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check the response data
      expect(response.body[0]._id).toBe(ingredient.id);
      expect(response.body[0].name).toBe(ingredient.name);
      expect(response.body[0].style).toBe(ingredient.style);
      expect(response.body[0].description).toBe(ingredient.description);
    });
});

test('GET /myrecipe', async () => {
  const ingredient = await myRecipe.create({
    name: 'English',
    style: 'eng',
    ingredients: {
      hops: [
        {
          name: 'Saaz',
          amount: '3',
        },
      ],
      malts: [
        {
          name: 'Pilsner Malt',
          amount: '232',
        },
      ],
      yeast: [
        {
          name: 'Czech Lager',
          amount: '232',
        },
      ],
    },
    instructions: 'English',
  });

  await supertest(app)
    .get('/my-recipes')
    .expect(200)
    .then((response) => {
      // Check the response type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check the response data
      expect(response.body[0]._id).toBe(ingredient.id);
      expect(response.body[0].name).toBe(ingredient.name);
      expect(response.body[0].style).toBe(ingredient.style);
      expect(response.body[0].instructions).toBe(ingredient.instructions);
    });
});

test('POST /myrecipes', async () => {
  const data = {
    name: 'English',
    style: 'eng',
    ingredients: {
      hops: [
        {
          name: 'Saaz',
          amount: '3',
        },
      ],
      malts: [
        {
          name: 'Pilsner Malt',
          amount: '232',
        },
      ],
      yeast: [
        {
          name: 'Czech Lager',
          amount: '232',
        },
      ],
    },
    instructions: 'English',
  };

  await supertest(app)
    .post('/my-recipes')
    .send(data)
    .expect(201)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(data.name);
      expect(response.body.style).toBe(data.style);
      expect(response.body.instructions).toBe(data.instructions);

      // Check the data in the database
      const oneIngredient = await myRecipe.findOne({ _id: response.body._id });
      expect(oneIngredient).toBeTruthy();
      expect(oneIngredient?.name).toBe(data.name);
      expect(oneIngredient?.style).toBe(data.style);
      expect(oneIngredient?.instructions).toBe(data.instructions);
    });
});
