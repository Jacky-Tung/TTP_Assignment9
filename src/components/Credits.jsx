import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountBalance from "./AccountBalance";
import { Button, Col, Form, Row, Container, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Credits = (props) => {
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
        addCredit(form);
      }
      setValidated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addCredit = (form) => {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, "0");
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentMonth}-${currentDay}-${currentYear}`;

    const newCredit = {
      desc: form.desc.value,
      amount: form.amount.value,
      date: currentDate,
    };

    props.setCredit((prevCredit) => prevCredit + parseInt(form.amount.value));
    props.setCredits((prevCredits) => [...prevCredits, newCredit]);

    form.desc.value = "";
    form.amount.value = "";
  };

  return (
    <div>
      <h1>
        <Badge variant="primary">Credits</Badge>
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
            <Button type="submit">Add Credit</Button>
          </Form>
        </Container>
      </div>
      <div>
        {props.credits.map((credit) => (
          <div className="trans">
            <h3>Description: {credit.desc}</h3>
            <h3>Amount: ${credit.amount}</h3>
            <h3>Date: {credit.date}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
