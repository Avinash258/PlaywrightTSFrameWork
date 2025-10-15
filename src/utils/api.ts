import { APIRequestContext, expect } from '@playwright/test';
import { getEnvironment } from '../config/environment';

export class ApiHelper {
  private api: APIRequestContext;
  private config = getEnvironment();

  constructor(api: APIRequestContext) {
    this.api = api;
  }

  async login(username: string, password: string) {
    const response = await this.api.post(`${this.config.apiUrl}/login`, {
      data: { username, password }
    });
    return response;
  }

  async getProducts() {
    const response = await this.api.get(`${this.config.apiUrl}/products`);
    expect(response.status()).toBe(200);
    return response.json();
  }

  async getProductById(id: string) {
    const response = await this.api.get(`${this.config.apiUrl}/products/${id}`);
    expect(response.status()).toBe(200);
    return response.json();
  }

  async addToCart(productId: string, quantity: number = 1) {
    const response = await this.api.post(`${this.config.apiUrl}/cart`, {
      data: { productId, quantity }
    });
    return response;
  }

  async getCart() {
    const response = await this.api.get(`${this.config.apiUrl}/cart`);
    expect(response.status()).toBe(200);
    return response.json();
  }

  async clearCart() {
    const response = await this.api.delete(`${this.config.apiUrl}/cart`);
    return response;
  }

  async checkout(orderData: Record<string, unknown>) {
    const response = await this.api.post(`${this.config.apiUrl}/checkout`, {
      data: orderData
    });
    return response;
  }

  async getOrderHistory() {
    const response = await this.api.get(`${this.config.apiUrl}/orders`);
    expect(response.status()).toBe(200);
    return response.json();
  }

  async verifyResponseStatus(response: { status: () => number }, expectedStatus: number) {
    expect(response.status()).toBe(expectedStatus);
  }

  async verifyResponseBody(response: { json: () => Promise<Record<string, unknown>> }, expectedFields: string[]) {
    const body = await response.json();
    expectedFields.forEach(field => {
      expect(body).toHaveProperty(field);
    });
    return body;
  }
}

// Legacy function for backward compatibility
export async function login(api: APIRequestContext, username: string, password: string) {
  const helper = new ApiHelper(api);
  return helper.login(username, password);
}
