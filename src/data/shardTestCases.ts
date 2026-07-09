/** Test case data for sharded API and UI suites (60 cases → 100 total with existing 40). */

export interface ApiGetCase {
  objectId: string;
  expectedStatus: number;
  label: string;
}

export interface ApiCreateCase {
  deviceType: 'device' | 'phone' | 'laptop' | 'minimal';
  label: string;
}

export interface ApiUpdateCase {
  field: 'name' | 'color' | 'price' | 'capacity';
  label: string;
}

export interface ApiPatchCase {
  patchField: 'name' | 'price' | 'color' | 'year';
  label: string;
}

export interface ApiDeleteCase {
  scenario: 'create-and-delete' | 'verify-404' | 'double-delete';
  label: string;
}

export interface UiAuthCase {
  username: string;
  password: string;
  expectSuccess: boolean;
  label: string;
}

export interface UiProductCase {
  productName: string;
  sortOption?: string;
  label: string;
}

export const apiGetCases: ApiGetCase[] = [
  { objectId: '1', expectedStatus: 200, label: 'object-1' },
  { objectId: '2', expectedStatus: 200, label: 'object-2' },
  { objectId: '3', expectedStatus: 200, label: 'object-3' },
  { objectId: '4', expectedStatus: 200, label: 'object-4' },
  { objectId: '5', expectedStatus: 200, label: 'object-5' },
  { objectId: '6', expectedStatus: 200, label: 'object-6' },
  { objectId: '7', expectedStatus: 200, label: 'object-7' },
  { objectId: '8', expectedStatus: 200, label: 'object-8' },
  { objectId: '9', expectedStatus: 200, label: 'object-9' },
  { objectId: '999999', expectedStatus: 404, label: 'non-existent' },
];

export const apiCreateCases: ApiCreateCase[] = [
  { deviceType: 'device', label: 'sample-device-01' },
  { deviceType: 'phone', label: 'sample-phone-02' },
  { deviceType: 'laptop', label: 'sample-laptop-03' },
  { deviceType: 'minimal', label: 'minimal-name-04' },
  { deviceType: 'device', label: 'sample-device-05' },
  { deviceType: 'phone', label: 'sample-phone-06' },
  { deviceType: 'laptop', label: 'sample-laptop-07' },
  { deviceType: 'minimal', label: 'minimal-name-08' },
  { deviceType: 'device', label: 'sample-device-09' },
  { deviceType: 'phone', label: 'sample-phone-10' },
];

export const apiUpdateCases: ApiUpdateCase[] = [
  { field: 'name', label: 'update-name-01' },
  { field: 'color', label: 'update-color-02' },
  { field: 'price', label: 'update-price-03' },
  { field: 'capacity', label: 'update-capacity-04' },
  { field: 'name', label: 'update-name-05' },
  { field: 'color', label: 'update-color-06' },
  { field: 'price', label: 'update-price-07' },
  { field: 'capacity', label: 'update-capacity-08' },
  { field: 'name', label: 'update-name-09' },
  { field: 'color', label: 'update-color-10' },
];

export const apiPatchCases: ApiPatchCase[] = [
  { patchField: 'name', label: 'patch-name-01' },
  { patchField: 'price', label: 'patch-price-02' },
  { patchField: 'color', label: 'patch-color-03' },
  { patchField: 'year', label: 'patch-year-04' },
  { patchField: 'name', label: 'patch-name-05' },
  { patchField: 'price', label: 'patch-price-06' },
  { patchField: 'color', label: 'patch-color-07' },
  { patchField: 'year', label: 'patch-year-08' },
  { patchField: 'name', label: 'patch-name-09' },
  { patchField: 'price', label: 'patch-price-10' },
];

export const apiDeleteCases: ApiDeleteCase[] = [
  { scenario: 'create-and-delete', label: 'delete-created-01' },
  { scenario: 'verify-404', label: 'delete-missing-02' },
  { scenario: 'double-delete', label: 'delete-twice-03' },
  { scenario: 'create-and-delete', label: 'delete-created-04' },
  { scenario: 'verify-404', label: 'delete-missing-05' },
];

export const uiAuthCases: UiAuthCase[] = [
  { username: 'standard_user', password: 'secret_sauce', expectSuccess: true, label: 'standard-user' },
  { username: 'locked_out_user', password: 'secret_sauce', expectSuccess: false, label: 'locked-user' },
  { username: 'problem_user', password: 'secret_sauce', expectSuccess: true, label: 'problem-user' },
  { username: 'performance_glitch_user', password: 'secret_sauce', expectSuccess: true, label: 'performance-user' },
  { username: 'invalid_user', password: 'secret_sauce', expectSuccess: false, label: 'invalid-user' },
  { username: 'standard_user', password: 'wrong_pass', expectSuccess: false, label: 'wrong-password' },
  { username: '', password: 'secret_sauce', expectSuccess: false, label: 'empty-username' },
  { username: 'standard_user', password: '', expectSuccess: false, label: 'empty-password' },
  { username: '', password: '', expectSuccess: false, label: 'empty-both' },
  { username: 'standard_user', password: 'secret_sauce', expectSuccess: true, label: 'standard-relogin' },
];

export const uiProductCases: UiProductCase[] = [
  { productName: 'Sauce Labs Backpack', label: 'backpack-visible' },
  { productName: 'Sauce Labs Bike Light', label: 'bike-light-visible' },
  { productName: 'Sauce Labs Bolt T-Shirt', label: 'tshirt-visible' },
  { productName: 'Sauce Labs Fleece Jacket', label: 'jacket-visible' },
  { productName: 'Sauce Labs Onesie', label: 'onesie-visible' },
];
