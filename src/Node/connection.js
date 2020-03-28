import React, { Component } from "react";

class Connection extends Component {
  constructor( props ){
    super( props );
    this.state = {
      input: props.el,
      output: props.output,
      update: true,
      diff: { x: 0, y: 0 }
    }
    window.setTimeout( this.getDiff.bind( this ), 40 );
    this.state.input.parent.addListener( "updateCoords", this.__update.bind( this ) );
    this.state.output.parent.addListener( "updateCoords", this.__update.bind( this ) );
  }


  __update(){
    let diff = this.getDiff();
    this.setState({ update: !this.state.update });
  }

  getLeft( div ){
    if( div == document.body || div == null ){
      return 0
    }else{
      return div.offsetLeft + this.getLeft( div.parentElement );
    }
  }

  getTop( div ){
    if( div == document.body || div == null ){
      return 0
    }else{
      return div.offsetTop + this.getTop( div.parentElement );
    }
  }

  getDiff(){
    let inp = this.state.input.ref
    let out = this.state.output.ref
    let diff = {
      x: this.getLeft( inp ) - this.getLeft( out ),
      y: this.getTop( inp ) - this.getTop( out )
    }
    this.setState({ diff: diff })
  }

  getD(){
    return `M 205 205 q 0 10 ${ (this.state.diff.x / 2) }  ${ (this.state.diff.y) / 2 } q ${ this.state.diff.x / 2 } ${ (this.state.diff.y / 2) - 10 } ${ ( (this.state.diff.x / 2) ) } ${ (this.state.diff.y / 2) }`
  }

  render(){
    return(
      <svg width = "600" height = "600" className = "connection">
        <path d = { this.getD() } stroke="black" fill = "none"></path>
      </svg>
    )
  }
}

export default Connection
