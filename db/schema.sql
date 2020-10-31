CREATE TABLE bills
(
    id              serial PRIMARY KEY,
    created_on      TIMESTAMP    NOT NULL,
    updated_on      TIMESTAMP    NOT NULL,
    due_date        TIMESTAMP    NOT NULL,
    payment_date    TIMESTAMP,
    name            VARCHAR(255) NOT NULL,
    value           INT          NOT NULL,
    corrected_value INT          NOT NULL,
    interest        INT          NOT NULL,
    more            INT          NOT NULL
);