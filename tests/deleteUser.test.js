const { test, expect } = require('@playwright/test');

test('DELETE /api/users/2 - should delete user', async ({ request }) => {
  const response = await request.delete('https://reqres.in/api/users/2');
  expect(response.status()).toBe(204); // Expect No Content
});
