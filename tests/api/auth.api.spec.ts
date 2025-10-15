import { test, expect } from '@playwright/test';
import { RestfulApiHelper, Device } from '../../src/utils/restfulApi';

test.describe('RESTful API Tests - https://restful-api.dev/', () => {
  let apiHelper: RestfulApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new RestfulApiHelper(request);
  });

  test.describe('GET Operations', () => {
    test('should get all objects successfully @smoke', async () => {
      const response = await apiHelper.getAllObjects();
      
      expect(response.status()).toBe(200);
      const objects = await response.json();
      expect(Array.isArray(objects)).toBeTruthy();
      expect(objects.length).toBeGreaterThan(0);
      
      // Verify object structure
      const firstObject = objects[0];
      expect(firstObject).toHaveProperty('id');
      expect(firstObject).toHaveProperty('name');
    });

    test('should get single object by ID', async () => {
      const response = await apiHelper.getObjectById('7');
      
      expect(response.status()).toBe(200);
      const object = await response.json();
      expect(object).toHaveProperty('id');
      expect(object.id).toBe('7');
      expect(object).toHaveProperty('name');
      expect(object).toHaveProperty('data');
    });

    test('should get multiple objects by IDs', async () => {
      const ids = ['3', '5', '10'];
      const response = await apiHelper.getObjectsByIds(ids);
      
      expect(response.status()).toBe(200);
      const objects: Device[] = await response.json();
      expect(Array.isArray(objects)).toBeTruthy();
      expect(objects.length).toBeLessThanOrEqual(ids.length);
      
      // Verify all returned objects have valid IDs
      objects.forEach(obj => {
        expect(obj).toHaveProperty('id');
        expect(ids.includes(obj.id)).toBeTruthy();
      });
    });

    test('should return 404 for non-existent object', async () => {
      const response = await apiHelper.getObjectById('999999999');
      expect(response.status()).toBe(404);
      
      const error = await response.json();
      expect(error).toHaveProperty('error');
    });
  });

  test.describe('POST Operations - Create Objects', () => {
    test('should create a new device object @smoke', async () => {
      const newDevice = apiHelper.createSampleDevice('Test Device ' + Date.now());
      const response = await apiHelper.createObject(newDevice);
      
      expect(response.status()).toBe(200);
      const createdObject: Device = await response.json();
      
      // Verify created object
      expect(createdObject).toHaveProperty('id');
      expect(createdObject.id).toBeTruthy();
      expect(createdObject.name).toBe(newDevice.name);
      expect(createdObject.data).toMatchObject(newDevice.data!);
      expect(createdObject).toHaveProperty('createdAt');
    });

    test('should create a new phone object', async () => {
      const newPhone = apiHelper.createSamplePhone('iPhone 15 Pro ' + Date.now());
      const response = await apiHelper.createObject(newPhone);
      
      expect(response.status()).toBe(200);
      const createdObject: Device = await response.json();
      
      expect(createdObject.id).toBeTruthy();
      expect(createdObject.name).toBe(newPhone.name);
      expect(createdObject.data?.color).toBe('Midnight');
      expect(createdObject.data?.capacity).toBe('256 GB');
      expect(createdObject.data?.price).toBe(999.99);
    });

    test('should create a laptop object with minimal data', async () => {
      const laptop = {
        name: 'MacBook Pro ' + Date.now(),
        data: {
          year: 2024,
          price: 2399.99
        }
      };
      
      const response = await apiHelper.createObject(laptop);
      expect(response.status()).toBe(200);
      
      const createdObject: Device = await response.json();
      expect(createdObject.name).toBe(laptop.name);
      expect(createdObject.data?.year).toBe(2024);
      expect(createdObject.data?.price).toBe(2399.99);
    });

    test('should create object with only name', async () => {
      const simpleObject = {
        name: 'Simple Device ' + Date.now()
      };
      
      const response = await apiHelper.createObject(simpleObject);
      expect(response.status()).toBe(200);
      
      const createdObject: Device = await response.json();
      expect(createdObject.name).toBe(simpleObject.name);
      expect(createdObject).toHaveProperty('id');
    });
  });

  test.describe('PUT Operations - Full Update', () => {
    test('should fully update an existing object', async () => {
      // First create an object
      const newDevice = apiHelper.createSampleDevice('Device to Update ' + Date.now());
      const createResponse = await apiHelper.createObject(newDevice);
      const createdObject: Device = await createResponse.json();
      
      // Update the object
      const updatedData = {
        name: 'Updated Device ' + Date.now(),
        data: {
          color: 'Red',
          capacity: '512 GB',
          price: 1299.99,
          year: 2025
        }
      };
      
      const updateResponse = await apiHelper.updateObject(createdObject.id, updatedData);
      expect(updateResponse.status()).toBe(200);
      
      const updatedObject: Device = await updateResponse.json();
      expect(updatedObject.id).toBe(createdObject.id);
      expect(updatedObject.name).toBe(updatedData.name);
      expect(updatedObject.data?.color).toBe('Red');
      expect(updatedObject.data?.capacity).toBe('512 GB');
      expect(updatedObject).toHaveProperty('updatedAt');
    });

    test('should handle updating non-existent object', async () => {
      const updatedData = apiHelper.createSampleDevice('Non-existent Device');
      const response = await apiHelper.updateObject('999999999', updatedData);
      
      // API returns 404 for non-existent objects
      expect(response.status()).toBe(404);
      
      const error = await response.json();
      expect(error).toHaveProperty('error');
    });
  });

  test.describe('PATCH Operations - Partial Update', () => {
    test('should partially update an existing object @smoke', async () => {
      // First create an object
      const newPhone = apiHelper.createSamplePhone('Phone to Patch ' + Date.now());
      const createResponse = await apiHelper.createObject(newPhone);
      const createdObject: Device = await createResponse.json();
      
      // Partially update the object (only change name)
      const partialUpdate = {
        name: 'Patched Phone ' + Date.now()
      };
      
      const patchResponse = await apiHelper.partialUpdateObject(createdObject.id, partialUpdate);
      expect(patchResponse.status()).toBe(200);
      
      const patchedObject: Device = await patchResponse.json();
      expect(patchedObject.id).toBe(createdObject.id);
      expect(patchedObject.name).toBe(partialUpdate.name);
      expect(patchedObject).toHaveProperty('updatedAt');
    });

    test('should update only price in existing object', async () => {
      // Create object
      const laptop = apiHelper.createSampleLaptop('Laptop for Price Update ' + Date.now());
      const createResponse = await apiHelper.createObject(laptop);
      const createdObject: Device = await createResponse.json();
      
      // Update only price
      const priceUpdate = {
        data: {
          price: 1599.99
        }
      };
      
      const patchResponse = await apiHelper.partialUpdateObject(createdObject.id, priceUpdate);
      expect(patchResponse.status()).toBe(200);
      
      const patchedObject: Device = await patchResponse.json();
      expect(patchedObject.data?.price).toBe(1599.99);
    });
  });

  test.describe('DELETE Operations', () => {
    test('should delete an existing object @smoke', async () => {
      // First create an object to delete
      const deviceToDelete = apiHelper.createSampleDevice('Device to Delete ' + Date.now());
      const createResponse = await apiHelper.createObject(deviceToDelete);
      const createdObject: Device = await createResponse.json();
      
      // Delete the object
      const deleteResponse = await apiHelper.deleteObject(createdObject.id);
      expect(deleteResponse.status()).toBe(200);
      
      const deleteResult = await deleteResponse.json();
      expect(deleteResult).toHaveProperty('message');
      
      // Verify object is deleted by trying to get it
      const getResponse = await apiHelper.getObjectById(createdObject.id);
      expect(getResponse.status()).toBe(404);
    });

    test('should handle deleting non-existent object', async () => {
      const response = await apiHelper.deleteObject('999999999');
      expect(response.status()).toBe(404);
      
      const error = await response.json();
      expect(error).toHaveProperty('error');
    });
  });

  test.describe('End-to-End API Workflows', () => {
    test('complete CRUD workflow for device', async () => {
      // CREATE
      const newDevice = {
        name: 'Samsung Galaxy S24 ' + Date.now(),
        data: {
          color: 'Phantom Black',
          capacity: '256 GB',
          price: 899.99,
          year: 2024
        }
      };
      
      const createResponse = await apiHelper.createObject(newDevice);
      expect(createResponse.status()).toBe(200);
      const createdDevice: Device = await createResponse.json();
      const deviceId = createdDevice.id;
      
      // READ
      const readResponse = await apiHelper.getObjectById(deviceId);
      expect(readResponse.status()).toBe(200);
      const readDevice: Device = await readResponse.json();
      expect(readDevice.id).toBe(deviceId);
      expect(readDevice.name).toBe(newDevice.name);
      
      // UPDATE
      const updatedData = {
        name: 'Samsung Galaxy S24 Ultra ' + Date.now(),
        data: {
          color: 'Titanium Gray',
          capacity: '512 GB',
          price: 1199.99,
          year: 2024
        }
      };
      
      const updateResponse = await apiHelper.updateObject(deviceId, updatedData);
      expect(updateResponse.status()).toBe(200);
      const updatedDevice: Device = await updateResponse.json();
      expect(updatedDevice.name).toBe(updatedData.name);
      expect(updatedDevice.data?.capacity).toBe('512 GB');
      
      // PATCH
      const patchData = {
        data: {
          price: 1099.99
        }
      };
      
      const patchResponse = await apiHelper.partialUpdateObject(deviceId, patchData);
      expect(patchResponse.status()).toBe(200);
      const patchedDevice: Device = await patchResponse.json();
      expect(patchedDevice.data?.price).toBe(1099.99);
      
      // DELETE
      const deleteResponse = await apiHelper.deleteObject(deviceId);
      expect(deleteResponse.status()).toBe(200);
      
      // VERIFY DELETION
      const verifyResponse = await apiHelper.getObjectById(deviceId);
      expect(verifyResponse.status()).toBe(404);
    });

    test('should handle multiple object creation and retrieval', async () => {
      const deviceIds: string[] = [];
      
      // Create multiple objects
      for (let i = 0; i < 3; i++) {
        const device = apiHelper.createSampleDevice(`Batch Device ${i} - ${Date.now()}`);
        const response = await apiHelper.createObject(device);
        const createdDevice: Device = await response.json();
        deviceIds.push(createdDevice.id);
      }
      
      // Retrieve all created objects
      const getResponse = await apiHelper.getObjectsByIds(deviceIds);
      expect(getResponse.status()).toBe(200);
      const devices: Device[] = await getResponse.json();
      expect(devices.length).toBeGreaterThan(0);
      
      // Cleanup - delete all created objects
      for (const id of deviceIds) {
        await apiHelper.deleteObject(id);
      }
    });
  });

  test.describe('Data Validation Tests', () => {
    test('should validate response schema for created object', async () => {
      const device = apiHelper.createSamplePhone('Schema Test Phone ' + Date.now());
      const response = await apiHelper.createObject(device);
      
      expect(response.status()).toBe(200);
      const object: Device = await response.json();
      
      // Validate schema
      expect(object).toHaveProperty('id');
      expect(object).toHaveProperty('name');
      expect(object).toHaveProperty('createdAt');
      expect(typeof object.id).toBe('string');
      expect(typeof object.name).toBe('string');
      expect(typeof object.createdAt).toBe('string');
      
      // Validate data structure
      if (object.data) {
        expect(typeof object.data).toBe('object');
      }
    });

    test('should handle special characters in device name', async () => {
      const device = {
        name: 'Test Device !@#$%^&*() ' + Date.now(),
        data: {
          price: 999.99
        }
      };
      
      const response = await apiHelper.createObject(device);
      expect(response.status()).toBe(200);
      
      const createdObject: Device = await response.json();
      expect(createdObject.name).toBe(device.name);
    });

    test('should handle large price values', async () => {
      const device = {
        name: 'Expensive Device ' + Date.now(),
        data: {
          price: 999999.99
        }
      };
      
      const response = await apiHelper.createObject(device);
      expect(response.status()).toBe(200);
      
      const createdObject: Device = await response.json();
      expect(createdObject.data?.price).toBe(999999.99);
    });
  });

  test.describe('Performance Tests', () => {
    test('should handle rapid consecutive API calls', async () => {
      const startTime = Date.now();
      
      // Make 5 rapid GET requests
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(apiHelper.getObjectById('7'));
      }
      
      const responses = await Promise.all(promises);
      const endTime = Date.now();
      
      // All requests should succeed
      responses.forEach(response => {
        expect(response.status()).toBe(200);
      });
      
      // Should complete in reasonable time (less than 10 seconds)
      expect(endTime - startTime).toBeLessThan(10000);
    });
  });
});
