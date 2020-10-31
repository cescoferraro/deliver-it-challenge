/** Types generated for queries found in "./src/server/main.ts" */

/** 'AllBills' parameters type */
export type IAllBillsParams = void;

/** 'AllBills' return type */
export interface IAllBillsResult {
  id: number;
  created_on: Date;
  updated_on: Date;
  due_date: Date;
  payment_date: Date | null;
  name: string;
  value: number;
  corrected_value: number;
  interest: number;
  more: number;
}

/** 'AllBills' query type */
export interface IAllBillsQuery {
  params: IAllBillsParams;
  result: IAllBillsResult;
}

/** 'CreateBill' parameters type */
export interface ICreateBillParams {
  user: {
    name: string | null | void,
    created_on: Date | null | void,
    updated_on: Date | null | void,
    value: number | null | void,
    corrected_value: number | null | void,
    due_date: Date | null | void,
    payment_date: Date | null | void,
    more: number | null | void,
    interest: number | null | void
  };
}

/** 'CreateBill' return type */
export interface ICreateBillResult {
  id: number;
}

/** 'CreateBill' query type */
export interface ICreateBillQuery {
  params: ICreateBillParams;
  result: ICreateBillResult;
}

