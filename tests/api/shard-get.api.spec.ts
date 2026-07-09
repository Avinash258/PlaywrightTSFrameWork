import { test, expect } from '@playwright/test';
import { RestfulApiHelper } from '../../src/utils/restfulApi';
import { apiGetCases } from '../../src/data/shardTestCases';

test.describe('Sharded API - GET Operations', () => {
  let apiHelper: RestfulApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new RestfulApiHelper(request);
  });

  for (const testCase of apiGetCases) {
    test(`GET object ${testCase.label} returns ${testCase.expectedStatus}`, async () => {
      const response = await apiHelper.getObjectById(testCase.objectId);
      expect(response.status()).toBe(testCase.expectedStatus);

      if (testCase.expectedStatus === 200) {
        const object = await response.json();
        expect(object).toHaveProperty('id');
        expect(object).toHaveProperty('name');
      }
    });
  }
});
