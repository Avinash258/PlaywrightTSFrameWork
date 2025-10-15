import { APIRequestContext } from '@playwright/test';

export interface DeviceData {
  name: string;
  data?: {
    color?: string;
    capacity?: string;
    price?: number;
    generation?: string;
    year?: number;
    'CPU model'?: string;
    'Hard disk size'?: string;
    [key: string]: any;
  };
}

export interface Device extends DeviceData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export class RestfulApiHelper {
  private api: APIRequestContext;
  private baseUrl = 'https://api.restful-api.dev';

  constructor(api: APIRequestContext) {
    this.api = api;
  }

  /**
   * GET /objects - Get all objects
   */
  async getAllObjects() {
    const response = await this.api.get(`${this.baseUrl}/objects`);
    return response;
  }

  /**
   * GET /objects?id=3&id=5&id=10 - Get objects by IDs
   */
  async getObjectsByIds(ids: string[]) {
    const queryParams = ids.map(id => `id=${id}`).join('&');
    const response = await this.api.get(`${this.baseUrl}/objects?${queryParams}`);
    return response;
  }

  /**
   * GET /objects/{id} - Get single object by ID
   */
  async getObjectById(id: string) {
    const response = await this.api.get(`${this.baseUrl}/objects/${id}`);
    return response;
  }

  /**
   * POST /objects - Create a new object
   */
  async createObject(data: DeviceData) {
    const response = await this.api.post(`${this.baseUrl}/objects`, {
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }

  /**
   * PUT /objects/{id} - Update an object (full update)
   */
  async updateObject(id: string, data: DeviceData) {
    const response = await this.api.put(`${this.baseUrl}/objects/${id}`, {
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }

  /**
   * PATCH /objects/{id} - Partially update an object
   */
  async partialUpdateObject(id: string, data: Partial<DeviceData>) {
    const response = await this.api.patch(`${this.baseUrl}/objects/${id}`, {
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }

  /**
   * DELETE /objects/{id} - Delete an object
   */
  async deleteObject(id: string) {
    const response = await this.api.delete(`${this.baseUrl}/objects/${id}`);
    return response;
  }

  /**
   * Helper method to create a sample device
   */
  createSampleDevice(name: string = 'Test Device'): DeviceData {
    return {
      name: name,
      data: {
        color: 'Blue',
        capacity: '128 GB',
        price: 799.99,
        generation: '5th',
        year: 2024
      }
    };
  }

  /**
   * Helper method to create a sample phone
   */
  createSamplePhone(name: string = 'Apple iPhone 15'): DeviceData {
    return {
      name: name,
      data: {
        color: 'Midnight',
        capacity: '256 GB',
        price: 999.99,
        year: 2024,
        'CPU model': 'A16 Bionic',
        generation: '15th'
      }
    };
  }

  /**
   * Helper method to create a sample laptop
   */
  createSampleLaptop(name: string = 'Dell Laptop'): DeviceData {
    return {
      name: name,
      data: {
        year: 2023,
        price: 1299.99,
        'CPU model': 'Intel Core i7',
        'Hard disk size': '1 TB'
      }
    };
  }
}
