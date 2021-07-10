import React, { Component } from 'react'

export class Accordion extends Component {
    constructor() {
        super();
        this._handleClick = this._handleClick.bind(this);
      }
      
      componentDidMount() {
        this._handleClick();
      }
      
      _handleClick() {
        const acc = this._acc.children;
        for (let i = 0; i < acc.length; i++) {
          let a = acc[i];
          a.onclick = () => a.classList.toggle("active");
        }
      }
    render() {
        return (
            <div>
                 <div ref={a => this._acc = a} onClick={this._handleClick}>{this.props.children}</div>
            </div>
        )
    }
}

export default Accordion
