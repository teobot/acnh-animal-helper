import React, { Component } from 'react'
import Fade from "react-reveal"

export class ItemContainer extends Component {
    render() {
      return (
        <div className="item-container p-1 border-bottom">
          <Fade>{this.props.children}</Fade>
        </div>
      );
    }
  }

export default ItemContainer
