import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./components/Home";
import Debits from "./components/Debits";
import { useEffect, useState } from "react";
import axios from "axios";
import Credits from "./components/Credits";
import { Badge, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [debit, setDebit] = useState(-1);
  const [credit, setCredit] = useState(-1);
  const [debits, setDebits] = useState([]);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const getDebit = async () => {
      try {
        const res = await axios.get(
          `https://bank-of-react-b745wfs0u-ajlapid718.vercel.app/debits`
        );
        setDebit(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getCredit = async () => {
      try {
        const res = await axios.get(
          `https://bank-of-react-b745wfs0u-ajlapid718.vercel.app/credits`
        );
        setCredit(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (debit === -1 && credit === -1) {
      getDebit();
      getCredit();
    }
  }, [debit, credit]);

  return (
    <Router>
      <div className="App">
        <Link to="/" className="link">
          <Badge variant="primary">Home</Badge>
        </Link>
        <Routes>
          <Route path="/" element={<Home credit={credit} debit={debit} />} />
          <Route
            path="/Debits"
            element={
              <Debits
                credit={credit}
                debit={debit}
                setDebit={setDebit}
                debits={debits}
                setDebits={setDebits}
              />
            }
          />
          <Route
            path="/Credits"
            element={
              <Credits
                credit={credit}
                debit={debit}
                setCredit={setCredit}
                credits={credits}
                setCredits={setCredits}
              ></Credits>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
