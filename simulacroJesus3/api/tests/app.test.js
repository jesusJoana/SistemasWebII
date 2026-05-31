const jestOpenAPI = require('jest-openapi').default;
const axios = require('axios').default;
const path = require('path');

const BASE_URL = 'http://localhost:3000/api/v1';
const SCHEMA = '../schema/course.schema.yaml';

const STUDENT = {
  name: 'Jesus',
  email: 'jesus@example.com',
  joinedAt: '2026-05-31'
};

jestOpenAPI(path.join(__dirname, SCHEMA));

describe('GET /courses', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await axios.get(BASE_URL + '/courses?limit=2&skip=0');
    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe('GET /courses/featured', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await axios.get(BASE_URL + '/courses/featured');
    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe('POST /courses/{id}/students', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await axios.post(BASE_URL + '/courses/6463448ae7684d03f44af30f/students', STUDENT);
    expect(res.status).toEqual(201);
    expect(res).toSatisfyApiSpec();
  });
});
