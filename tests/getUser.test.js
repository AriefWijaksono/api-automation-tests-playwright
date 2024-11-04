const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

const ajv = new Ajv();

const userSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' }
      },
      required: ['id', 'email', 'first_name', 'last_name']
    }
  },
  required: ['data']
};

test('GET /api/users/2 - should return a single user', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2');
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Validate schema
  const validate = ajv.compile(userSchema);
  const valid = validate(responseBody);
  expect(valid).toBe(true);
});
