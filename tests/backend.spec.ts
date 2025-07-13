import { test, expect, request } from '@playwright/test';
import { User } from '../src/dataModels/user';

const BASE_URI = 'https://reqres.in';

test('Verify GET Request on /api/users Response @backend', async ({ request }) => {

  const response = await request.get(BASE_URI + '/api/users?page=2');
  console.log('Response ', response);
  expect(response.ok()).toBeTruthy();

  // Assertions 
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('page', 2);
  expect(body).toHaveProperty('data');
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);

  // Assert each user object matches the expected data types
  for (const user of body.data as User[]) {
    expect(typeof user.id).toBe('number');
    expect(typeof user.email).toBe('string');
    expect(typeof user.first_name).toBe('string');
    expect(typeof user.last_name).toBe('string');
    expect(typeof user.avatar).toBe('string');
  }
});

test('Verify POST /api/users throws 401 without AuthToken @backend', async ({ request }) => {
  const payload = {
    name: 'morpheus',
    job: 'leader',
  };

  const response = await request.post(BASE_URI + '/api/users', {
    data: payload,
  });
  console.log('Response ', response);

  // Assert 401 Unauthorized
  expect(response.status()).toBe(401);
  expect(response.ok()).toBeFalsy();

  // Optionally, check for error message in body
  const body = await response.json();
  // If the API returns a message or error property, check it here
  expect(body).toHaveProperty('error');

  // Assert 'report-to' header exists pointing towards Heroku
  const reportToHeader = response.headers()['report-to'];
  expect(reportToHeader).toBeDefined();
  let reportTo;
  try {
    reportTo = JSON.parse(reportToHeader);
  } catch (e) {
    throw new Error('report-to header is not valid JSON');
  }
  expect(reportTo).toHaveProperty('group');
  expect(typeof reportTo.group).toBe('string');
  expect(reportTo).toHaveProperty('max_age');
  expect(typeof reportTo.max_age).toBe('number');
  expect(reportTo).toHaveProperty('endpoints');
  expect(Array.isArray(reportTo.endpoints)).toBe(true);
  expect(reportTo.endpoints.length).toBeGreaterThan(0);
  expect(reportTo.endpoints[0]).toHaveProperty('url');
  expect(typeof reportTo.endpoints[0].url).toBe('string');
});


