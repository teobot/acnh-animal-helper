import React, { Component } from "react";

import "./App.css";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

import bellImage from "./img/bells.png";

import ItemContainer from "./components/ItemContainer"

export class App extends Component {
  constructor(props) {
    super(props);
    const seaCreaturesData = require("./data/seaCreaturesData");
    const fishData = require("./data/fishData");
    const insectData = require("./data/insectData");

    this.state = {
      display_array: seaCreaturesData.default,
      seaCreatureArray: seaCreaturesData.default,
      fishArray: fishData.default,
      insectArray: insectData.default,
      direction: "desc",
    };

    this.sort_array(this.state.display_array, "name", "asc");
  }

  priceWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  sort_array(array, element, order) {
    if(order === "toggle") {
      if(this.state.direction === "asc") {
        this.setState({
          direction: "desc"
        });
      } else {
        this.setState({
          direction: "asc"
        });
      }
      return array.sort(this.dynamicsort(element, this.state.direction));
    } else {
      return array.sort(this.dynamicsort(element, order));
    }    
  }
  dynamicsort(property, order) {
    var sort_order = 1;
    if (order === "desc") {
      sort_order = -1;
    }
    return function (a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (a[property] > b[property]) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" className="justify-content-between">

          <div className="sort-div items-div">
            {/* Change animals here */}
            <Button onClick={() => this.setState({display_array: this.sort_array(this.state.display_array, "price", "toggle" )})} variant="outline-success">Price</Button>
            <Button onClick={() => this.setState({display_array: this.sort_array(this.state.display_array, "name", "toggle" )})} variant="outline-success">Name</Button>
          </div>

          <div className="type-div items-div">
            {/* Options here */}
            <Button onClick={() => this.setState({display_array: this.state.fishArray})} variant="primary">Fish</Button>
            <Button onClick={() => this.setState({display_array: this.state.seaCreatureArray})} variant="info">Sea</Button>
            <Button onClick={() => this.setState({display_array: this.state.insectArray})} variant="success">Insects</Button>
          </div>

        </Navbar>

        {this.state.display_array.map((item) => (
          <ItemContainer key={item.key}>
            <div className="h-100 p-2">
              <Image className="h-100" src={require(`./img/${item.img}`)} />
            </div>
            <div className="p-3 m-3">
              <div className="row h5">{item.name}</div>
              <div className="row">
                <Image src={bellImage}></Image>{" "}
                {this.priceWithCommas(item.price)}
              </div>
            </div>
          </ItemContainer>
        ))}
      </div>
    );
  }
}

export default App;
