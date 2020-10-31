export interface Bills {
  id: number;
  created_on: Date;
  updated_on: Date;
  due_date: Date;
  payment_date?: Date;
  name: string;
  value: number;
  corrected_value: number;
  interest: number;
  more: number;
}

export interface BillInput {
  name: string;
  value: number;
  due_date: Date;
  payment_date: Date;
}

declare module "@unicef/material-ui-currency-textfield" {}
