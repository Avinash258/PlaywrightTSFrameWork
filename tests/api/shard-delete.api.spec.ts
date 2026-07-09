import { test, expect } from '@playwright/test';
import { RestfulApiHelper, Device } from '../../src/utils/restfulApi';
import { apiDeleteCases } from '../../src/data/shardTestCases';

test.describe('Sharded API - DELETE Operations', () => {
  let apiHelper: RestfulApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new RestfulApiHelper(request);
  });

  for (const testCase of apiDeleteCases) {
    test(`DELETE scenario ${testCase.label}`, async () => {
      if (testCase.scenario === 'verify-404') {
        const response = await apiHelper.deleteObject('999999999');
        expect(response.status()).toBe(404);
        return;
      }

      const createResponse = await apiHelper.createObject(
        apiHelper.createSampleDevice(`DELETE seed ${testCase.label} ${Date.now()}`)
      );
      const created: Device = await createResponse.json();

      const deleteResponse = await apiHelper.deleteObject(created.id);
      expect(deleteResponse.status()).toBe(200);

      const verifyResponse = await apiHelper.getObjectById(created.id);
      expect(verifyResponse.status()).toBe(404);

      if (testCase.scenario === 'double-delete') {
        const secondDelete = await apiHelper.deleteObject(created.id);
        expect(secondDelete.status()).toBe(404);
      }
    });
  }
});
