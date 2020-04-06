import React from "react";
import InputBase from "./base"

class TextArea extends InputBase{
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

  getValue(){
    if( this.state.input.value === undefined ){
      return ""
    }else{
      return this.state.input.value
    }
  }

  render(){
    return(
      <InputBase
        input = { this.state.input }
        value = { this.state.input.value }
      >
        <textarea value = { this.getValue() } onChange = { this.handleChange.bind( this ) }/>
      </InputBase>
    )
  }
}

export default TextArea
