import React from "react";
import InputBase from "./base"

class StringInterface extends InputBase{
  constructor( props ){
    super( props );
    this.state = {
      input: props.input,
      value: props.input.value
    }
  }

  handleChange( e ){
    let value = e.target.value
    this.state.input.handleChange( value )
  }

  render(){
    return(
      <InputBase
        input = { this.state.input }
        value = { this.state.value }
      >
        <input value = { this.state.value } onChange = { this.handleChange.bind( this ) }/>
      </InputBase>
    )
  }
}

export default StringInterface
