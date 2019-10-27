export interface ICustomerAccount {
  email: string;
  password: string;
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  account: ICustomerAccount;
}
