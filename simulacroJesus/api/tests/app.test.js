const jestOpenAPI = require('jest-openapi').default;
const axios = require('axios').default;
const path = require('path');

const BASE_URL = 'http://localhost:3000/api/v1';
const SCHEMA = '../schema/restaurant.schema.yaml';

const RESTAURANT = {
  name: 'La Esquina Verde',
  cuisine: 'Mediterranea',
  address: {
    street: 'Calle Mayor 12',
    city: 'Madrid',
    postalCode: '28013'
  },
  rating: 4.6,
  phone: '+34910000000',
  dishes: [
    { name: 'Tortilla de patata', price: 8.5, vegetarian: true },
    { name: 'Croquetas', price: 9.25, vegetarian: false }
  ]
};

jestOpenAPI(path.join(__dirname, SCHEMA));

describe('POST /restaurants', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await axios.post(BASE_URL + '/restaurants', RESTAURANT);
    expect(res.status).toEqual(201);
    expect(res).toSatisfyApiSpec();
  });
});

describe('GET /restaurants', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await axios.get(BASE_URL + '/restaurants');
    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});
