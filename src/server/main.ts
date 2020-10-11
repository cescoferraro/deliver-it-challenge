import express from "express";
import cors from "cors";

const app = express();

app.use(cors({origin: true}));

app.get('/api', (req, res) => {
    const result: LoginType = {
        name: "guririzinho",
        password: "password",
    };
    res.send(result)
})

app.listen({port: 4000}, () =>
    console.log(
        `🚀 Server ready at http://localhost:4000`
    )
);
