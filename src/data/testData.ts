export interface User {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  postalCode?: string;
}

export interface Product {
  name: string;
  price: string;
  description: string;
}

export const testUsers = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  }
} as const;

export const testProducts = {
  backpack: {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.'
  },
  boltTshirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.'
  }
} as const;

export const errorMessages = {
  lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  requiredField: 'Error: First Name is required'
} as const;
