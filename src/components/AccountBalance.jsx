import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountBalance = (props) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const toDebits = () => {
      return navigate("/Debits");
    };

    const toCredits = () => {
      return navigate("/Credits");
    };

    return (
      <div>
        <div className="account">
          <h2>Balance: ${props.credit - props.debit}</h2>
        </div>
        <div
          className={isHovered ? "pointer-cursor" : ""}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2 id="navigation" onClick={toCredits}>
            Credit: ${props.credit}
          </h2>
          <h2 id="navigation" onClick={toDebits}>
            Debit: ${props.debit}
          </h2>
        </div>
      </div>
    );
}

export default AccountBalance