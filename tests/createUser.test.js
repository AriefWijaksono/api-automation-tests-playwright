const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

const ajv = new Ajv();

const createUserSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    job: { type: 'string' },
    id: { type: 'string' },
    createdAt: { type: 'string' }
  },
  required: ['name', 'job', 'id', 'createdAt']
};

test('POST /api/users - should create a new user', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users', {
    data: { name: 'morpheus', job: 'leader' }
  });
  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  // Validate schema
  const validate = ajv.compile(createUserSchema);
  const valid = validate(responseBody);
  expect(valid).toBe(true);
});
