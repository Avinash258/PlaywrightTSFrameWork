import { test, expect } from '@playwright/test';
import { RestfulApiHelper, Device } from '../../src/utils/restfulApi';
import { apiPatchCases } from '../../src/data/shardTestCases';

test.describe('Sharded API - PATCH Operations', () => {
  let apiHelper: RestfulApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new RestfulApiHelper(request);
  });

  for (const testCase of apiPatchCases) {
    test(`PATCH partial update ${testCase.label}`, async () => {
      const createResponse = await apiHelper.createObject(
        apiHelper.createSamplePhone(`PATCH seed ${testCase.label} ${Date.now()}`)
      );
      const created: Device = await createResponse.json();

      const partialUpdate: Record<string, unknown> = {};
      switch (testCase.patchField) {
        case 'name':
          partialUpdate.name = `Patched ${testCase.label} ${Date.now()}`;
          break;
        case 'price':
          partialUpdate.data = { price: 599.99 };
          break;
        case 'color':
          partialUpdate.data = { color: 'Silver' };
          break;
        case 'year':
          partialUpdate.data = { year: 2026 };
          break;
      }

      const patchResponse = await apiHelper.partialUpdateObject(created.id, partialUpdate);
      expect(patchResponse.status()).toBe(200);

      const patched: Device = await patchResponse.json();
      expect(patched.id).toBe(created.id);
      expect(patched).toHaveProperty('updatedAt');

      await apiHelper.deleteObject(created.id);
    });
  }
});
