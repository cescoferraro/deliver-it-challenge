import * as React from "react";
import { Button } from "@material-ui/core";
import { CreateBillDialog } from "./create_bill_dialog";
import { BillList } from "./bill_list";
import { useFetchBills } from "./use_fetch_bill";
import { BillInput } from "../typings/LoginType";

export const App = (): React.ReactElement => {
  const [dialog, setDialog] = React.useState(false);
  const { loading, state, refetch } = useFetchBills();
  console.log(state);
  const input: BillInput = {
    name: "",
    value: null,
    due_date: null,
    payment_date: null,
  };
  return (
    <div style={{ padding: 24 }}>
      <Button
        fullWidth={true}
        variant={"contained"}
        onClick={() => setDialog(true)}
      >
        Add Bill
      </Button>
      <BillList loading={loading} state={state} />
      <CreateBillDialog
        input={input}
        refetch={refetch}
        open={dialog}
        onClose={() => setDialog(!dialog)}
      />
    </div>
  );
};
