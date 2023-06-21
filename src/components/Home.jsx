import React from "react";
import { Badge } from "react-bootstrap";
import AccountBalance from "./AccountBalance";

const Home = (props) => {
  return (
    <div className="home">
      <h1>
        <Badge variant="primary">Bank of React</Badge>
      </h1>
      <AccountBalance
        credit={props.credit}
        debit={props.debit}
      ></AccountBalance>
    </div>
  );
};

export default Home;
