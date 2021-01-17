import React, { useState } from "react";
import axios from "axios";
import "./converter.css";
import { Col, Row } from "reactstrap";

function Convertor() {
  const [result, setResult] = useState();
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("RSD");
  const [amount, setAmount] = useState("");
  const [currencies, setCurrencies] = useState([]);

  useState(() => {
    axios
      .get(
        "http://data.fixer.io/api/latest?access_key=00df5c4a226dc977a4fc71551ff857eb&format=1"
      )
      .then((response) => {
        const currencyAr = ["RSD"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        setCurrencies(currencyAr);
      })
      .catch((err) => {
        console.log("oppps", err);
      });
  }, []);

  const selectHandler = (e) => {
    setResult('')
    if (e.target.name === "from") {
      setFromCurrency(e.target.value);
    } else {
      if (e.target.name === "to") {
        setToCurrency(e.target.value);
      }
    }
  };

 const  convertHandler = () => {
    if (fromCurrency !== toCurrency) {
      axios
        .get(
          `http://data.fixer.io/api/latest?access_key=00df5c4a226dc977a4fc71551ff857eb&format=1?base=${fromCurrency}&symbols=${toCurrency}`
        )
        .then((response) => {
          const result =
            amount * response.data.rates[toCurrency];
          setResult(result.toFixed(3))
        })
        .catch((error) => {
          console.log("Opps", error.message);
        });
    } else {
     setResult("You cant convert the same currency!");
    }
  };

  return (
    <div className="converter card small blue-grey col s12 m8 white-text">
      <h2>Currency Converter</h2>
      <div className="row">
        <div className="col s12">
          <label htmlFor="amount">Amount</label>
          <input
            name="amount"
            id="amount"
            type="text"
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="col s6">
          <label htmlFor="from">From</label>
          <select
            className="browser-default"
            name="from"
            onChange={(e) => selectHandler(e)}
            value={fromCurrency}
          >
            {currencies.map((curr) => (
              <option>{curr}</option>
            ))}
          </select>
        </div>

        <div className="col s6">
          <label htmlFor="to">To</label>
          <select
            className="browser-default"
            name="to"
            onChange={(e) => selectHandler(e)}
            value={toCurrency}
          >
            {currencies.map((cur) => (
              <option>{cur}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="btn waves-effect waves-light"
        onClick={convertHandler}
      >
        Convert
      </button>
      {result && (
        <h3>
          {result} {toCurrency}
        </h3>
      )}
    </div>
  );
}

export default Convertor;
