const jestOpenAPI = require('jest-openapi').default;
const axios = require('axios').default;
const path = require('path');

const BASE_URL = 'http://localhost:3000/api/v2';
const SCHEMA = '../schema/post.schema.yaml';

const COMMENT = {
  user: 'Jesus',
  text: 'Buen post para practicar MongoDB',
  createdAt: '2026-05-30'
};

jestOpenAPI(path.join(__dirname, SCHEMA));

describe('GET /posts', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await axios.get(BASE_URL + '/posts?limit=2&skip=0');
    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe('GET /posts/latest', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await axios.get(BASE_URL + '/posts/latest');
    expect(res.status).toEqual(200);
    expect(res).toSatisfyApiSpec();
  });
});

describe('POST /posts/{id}/comments', () => {
  it('should satisfy OpenAPI spec', async () => {
    const res = await axios.post(BASE_URL + '/posts/6463448ae7684d03f44af30f/comments', COMMENT);
    expect(res.status).toEqual(201);
    expect(res).toSatisfyApiSpec();
  });
});
