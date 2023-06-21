import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountBalance from "./AccountBalance";
import { Button, Col, Form, Row, Container, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Debits = (props) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const navigateToSettings = () => {
    return navigate("");
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        addDebit(form);
      }
      setValidated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addDebit = (form) => {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, "0");
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentMonth}-${currentDay}-${currentYear}`;

    const newDebit = {
      desc: form.desc.value,
      amount: form.amount.value,
      date: currentDate,
    };

    const updatedDebit = props.debit + parseInt(form.amount.value);
    props.setDebit(updatedDebit);
    props.setDebits((prevDebits) => [...prevDebits, newDebit]);

    form.desc.value = "";
    form.amount.value = "";
  };

  return (
    <div>
      <h1>
        <Badge variant='primary'>Debits</Badge>
      </h1>
      <AccountBalance
        credit={props.credit}
        debit={props.debit}
      ></AccountBalance>
      <div className="form">
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  name="desc"
                  type="text"
                  placeholder="Description"
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  required
                  name="amount"
                  type="number"
                  placeholder="Amount"
                ></Form.Control>
              </Form.Group>
            </Row>
            <Button type="submit">Add Debit</Button>
          </Form>
        </Container>
      </div>
      <div>
        {props.debits.map((debit) => (
          <div className="trans">
            <h3>Description: {debit.desc}</h3>
            <h3>Amount: ${debit.amount}</h3>
            <h3>Date: {debit.date}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Debits;
