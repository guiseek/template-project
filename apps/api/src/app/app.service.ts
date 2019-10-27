import { Injectable } from '@nestjs/common';
import { ICustomer } from '@guiseek/data';

@Injectable()
export class AppService {
  customers: ICustomer[] = [];

  getData(): { message: string } {
    return ({ message: 'Welcome to api!' });
  }
  addCustomer(data: ICustomer) {
    return this.customers.push(data);
  }
  getCustomers() {
    return this.customers;
  }
}
