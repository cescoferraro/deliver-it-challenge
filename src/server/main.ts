import express from "express";
import cors from "cors";
import { Client } from "pg";
import { sql } from "@pgtyped/query";
import { IAllBillsQuery, ICreateBillQuery } from "./main.types";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: true }));

const connectionString =
  "postgres://qfekqmhk:8suZ3jbhC0Ez0c9Nf_jxgZ0_uEBRJQxN@tuffi.db.elephantsql.com:5432/qfekqmhk";
const client = new Client({ connectionString: connectionString });
void client.connect();

const listBills = async (req, res) => {
  const allBills = sql<IAllBillsQuery>`SELECT *
                                         FROM bills;`;
  const users = await allBills.run(null, client);
  res.send(users);
};
app.get("/api/bills", listBills);

const createBill = async (req, res) => {
  const { body } = req;
  const createBill = sql<
    ICreateBillQuery
  >`INSERT INTO bills (name, created_on, updated_on, value, corrected_value,
                                                                due_date,
                                                                payment_date, more, interest)
    VALUES
    $user
    (name, created_on, updated_on, value, corrected_value, due_date,
        payment_date, more, interest)
    RETURNING id`;

  let more = 0;
  let interest = 0;
  const { value, due_date, payment_date } = body;
  console.log(body);
  const date = new Date(due_date).getTime();
  const time = new Date(payment_date).getTime();
  if (date < time) {
    // To calculate the no. of days between two dates
    const Difference_In_Time = time - date;
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log("vencido");
    console.log(Difference_In_Days);
    switch (true) {
      case Difference_In_Days < 3:
        console.log(33);
        more = Math.round(value * 0.02);
        interest = Math.round(value * 0.001 * Difference_In_Days);
        break;
      case Difference_In_Days <= 5:
        more = Math.round(value * 0.03);
        interest = Math.round(value * 0.002 * Difference_In_Days);
        console.log(33);
        break;
      default:
        more = Math.round(value * 0.05);
        interest = Math.round(value * 0.003 * Difference_In_Days);
        console.log(33);
        break;
    }
  }
  const corrected_value = value + more + interest;
  await createBill.run(
    {
      user: {
        created_on: new Date(),
        updated_on: new Date(),
        name: body.name,
        value,
        due_date,
        payment_date,
        more,
        corrected_value,
        interest,
      },
    },
    client
  );
  res.send({
    name: "cesco",
  });
};

app.post("/api/bills", createBill);

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
