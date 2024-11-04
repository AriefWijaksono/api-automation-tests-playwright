const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

const ajv = new Ajv();

const updateUserSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    job: { type: 'string' },
    updatedAt: { type: 'string' }
  },
  required: ['name', 'job', 'updatedAt']
};

test('PUT /api/users/2 - should update user', async ({ request }) => {
  const response = await request.put('https://reqres.in/api/users/2', {
    data: { name: 'morpheus', job: 'zion resident' }
  });
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Validate schema
  const validate = ajv.compile(updateUserSchema);
  const valid = validate(responseBody);
  expect(valid).toBe(true);
});
