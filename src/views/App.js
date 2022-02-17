import React, { useState } from "react";

import "../css/App.css";

import bellImage from "../img/bells.png";

import {
  Container,
  Segment,
  Image,
  Menu,
  Header,
  Dropdown,
} from "semantic-ui-react";

// data imports
import seaCreaturesData from "../data/seaCreaturesData";
import fishData from "../data/fishData";
import insectData from "../data/insectData";

export default function App() {
  const [display_array, setDisplayArray] = useState(seaCreaturesData);
  const [direction, setDirection] = useState("desc");

  const priceWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const sort_array = (array, element, order) => {
    if (order === "toggle") {
      if (direction === "asc") {
        setDirection("desc");
      } else {
        setDirection("asc");
      }
      return array.sort(dynamicsort(element, direction));
    } else {
      return array.sort(dynamicsort(element, order));
    }
  };

  const dynamicsort = (property, order) => {
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
  };

  return (
    <div className="App">
      <Menu
        inverted
        style={{ borderRadius: 0, marginBottom: 0, position: "relative" }}
        size="small"
      >
        <Menu.Menu position="left">
          <Dropdown item icon="wrench" simple>
            <Dropdown.Menu>
              <Dropdown.Divider />
              <Dropdown.Header>SORT BY</Dropdown.Header>
              <Dropdown.Item
                onClick={() =>
                  setDisplayArray(sort_array(display_array, "price", "toggle"))
                }
                icon="money"
                text="Sort by price"
              />
              <Dropdown.Item
                onClick={() =>
                  setDisplayArray(sort_array(display_array, "name", "toggle"))
                }
                icon="sort alphabet down"
                text="Sort alphabetically"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Dropdown item icon="paw" simple>
            <Dropdown.Menu>
              <Dropdown.Divider />
              <Dropdown.Header>TYPE SELECT</Dropdown.Header>
              <Dropdown.Item
                onClick={() => setDisplayArray(fishData)}
                icon="rain"
                text="View Fish"
              />
              <Dropdown.Item
                onClick={() => setDisplayArray(insectData)}
                icon="bug"
                text="View Bugs"
              />
              <Dropdown.Item
                onClick={() => setDisplayArray(seaCreaturesData)}
                icon="anchor"
                text="View Sea Creatures"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <div style={{ overflowY: "auto", height: "100%", padding: "0px 25px 35px 25px" }}>
        {display_array.map((item) => (
          <Segment vertical>
            <Segment basic>
              <Header as="h1">
                <Image src={require(`../img/${item.img}`)} />{" "}
                <Header.Content>
                  {/* remove any characters over 21 */}
                  {item.name.length > 20
                    ? item.name.slice(0, 20) + "..."
                    : item.name}

                  <Header.Subheader>
                    <Image inline src={bellImage} />{" "}
                    {priceWithCommas(item.price)}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Segment>
          </Segment>
        ))}
      </div>
    </div>
  );
}
