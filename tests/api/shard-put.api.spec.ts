import { test, expect } from '@playwright/test';
import { RestfulApiHelper, Device } from '../../src/utils/restfulApi';
import { apiUpdateCases } from '../../src/data/shardTestCases';

test.describe('Sharded API - PUT Operations', () => {
  let apiHelper: RestfulApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new RestfulApiHelper(request);
  });

  for (const testCase of apiUpdateCases) {
    test(`PUT full update ${testCase.label}`, async () => {
      const createResponse = await apiHelper.createObject(
        apiHelper.createSampleDevice(`PUT seed ${testCase.label} ${Date.now()}`)
      );
      const created: Device = await createResponse.json();

      const updatedData = {
        name: `Updated ${testCase.label} ${Date.now()}`,
        data: {
          color: testCase.field === 'color' ? 'Green' : 'Blue',
          capacity: testCase.field === 'capacity' ? '1 TB' : '256 GB',
          price: testCase.field === 'price' ? 1499.99 : 899.99,
          year: 2025,
        },
      };

      const updateResponse = await apiHelper.updateObject(created.id, updatedData);
      expect(updateResponse.status()).toBe(200);

      const updated: Device = await updateResponse.json();
      expect(updated.id).toBe(created.id);
      expect(updated.name).toBe(updatedData.name);
      expect(updated).toHaveProperty('updatedAt');

      await apiHelper.deleteObject(created.id);
    });
  }
});
