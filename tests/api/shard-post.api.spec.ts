import { test, expect } from '@playwright/test';
import { RestfulApiHelper, Device } from '../../src/utils/restfulApi';
import { apiCreateCases } from '../../src/data/shardTestCases';

test.describe('Sharded API - POST Operations', () => {
  let apiHelper: RestfulApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new RestfulApiHelper(request);
  });

  for (const testCase of apiCreateCases) {
    test(`POST create ${testCase.label}`, async () => {
      const timestamp = Date.now();
      let payload;

      switch (testCase.deviceType) {
        case 'phone':
          payload = apiHelper.createSamplePhone(`Shard Phone ${testCase.label} ${timestamp}`);
          break;
        case 'laptop':
          payload = apiHelper.createSampleLaptop(`Shard Laptop ${testCase.label} ${timestamp}`);
          break;
        case 'minimal':
          payload = { name: `Shard Minimal ${testCase.label} ${timestamp}` };
          break;
        default:
          payload = apiHelper.createSampleDevice(`Shard Device ${testCase.label} ${timestamp}`);
      }

      const response = await apiHelper.createObject(payload);
      expect(response.status()).toBe(200);

      const created: Device = await response.json();
      expect(created.id).toBeTruthy();
      expect(created.name).toBe(payload.name);
      expect(created).toHaveProperty('createdAt');

      await apiHelper.deleteObject(created.id);
    });
  }
});
