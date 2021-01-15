import React from "react";
import axios from "axios";
import "./converter.css";
import { Col, Row } from "reactstrap";

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "EUR",
      toCurrency: "RSD",
      amount: "",
      currencies: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://data.fixer.io/api/latest?access_key=00df5c4a226dc977a4fc71551ff857eb&format=1"
      )
      .then((response) => {
        console.log(response);
        const currencyAr = ["RSD"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }

        this.setState({ currencies: currencyAr });
      })
      .catch((err) => {
        console.log("oppps", err);
      });
  }

  selectHandler = (event) => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value });
      }
    }
  };

  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `http://data.fixer.io/api/latest?access_key=00df5c4a226dc977a4fc71551ff857eb&format=1?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`
        )
        .then((response) => {
          const result =
            this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
        })
        .catch((error) => {
          console.log("Opps", error.message);
        });
    } else {
      this.setState({ result: "You cant convert the same currency!" });
    }
  };

  render() {
    return (
      <>
        <div className="converter card small blue-grey col s12 m8 white-text">
          <h2>Currency Converter</h2>
          <div className="row">
            <div className="col s12">
              <label htmlFor="amount">Amount</label>
              <input
                name="amount"
                id="amount"
                type="text"
                value={this.state.amount}
                placeholder="0"
                onChange={(event) =>
                  this.setState({ amount: event.target.value })
                }
              />
            </div>

            <div className="col s6">
              <label htmlFor="from">From</label>
              <select
                className="browser-default"
                name="from"
                onChange={(event) => this.selectHandler(event)}
                value={this.state.fromCurrency} >
                {this.state.currencies.map((curr) => (
                  <option>{curr}</option>
                ))}
              </select>
            </div>

            <div className="col s6">
              <label htmlFor="to">To</label>
              <select
                className="browser-default"
                name="to"
                onChange={(event) => this.selectHandler(event)}
                value={this.state.toCurrency} >
                {this.state.currencies.map((cur) => (
                  <option>{cur}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn waves-effect waves-light" onClick={this.convertHandler}>
            Convert
          </button>
          {this.state.result && <h3>{this.state.result}</h3>}
        </div>
      </>
    );
  }
}
export default Converter;
