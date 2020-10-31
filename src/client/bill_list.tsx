import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Inbox } from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import * as React from "react";
import { Bills } from "../typings/LoginType";

interface Props {
  loading: boolean;
  state: Bills[];
}

export const BillList = (props: Props): React.ReactElement => (
  <>
    {props.loading
      ? "loading"
      : props.state.map((d, index) => {
          const date = new Date(d.payment_date);
          const duedate = new Date(d.due_date);
          return (
            <List key={index}>
              <ListItem button>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div>
                      <Typography>Nome: {d.name}</Typography>
                      <Typography>
                        Data de Pagamento: {date.toLocaleDateString()}
                      </Typography>
                      <Typography>
                        Data de Vencimento: {duedate.toLocaleDateString()}
                      </Typography>
                    </div>
                  }
                  secondary={
                    <Typography>
                      <CurrencyFormat
                        value={d.value / 100}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"R$"}
                      />
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          );
        })}
  </>
);
