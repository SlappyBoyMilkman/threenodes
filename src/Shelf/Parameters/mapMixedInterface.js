import React from "react";
import InputBase from "./base"

class MapMixedVariablesInterface extends InputBase{
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

  __update( input ){
    this.setState({ input: input })
  }

  mapMixed(){
    let entries = Object.entries( this.state.input.mixedConnections );
    return entries.map(
      function( entry, index ){
        let key = entry[0]
        let value = entry[1]
        return(
          <div>
            <div>{key}</div>
            <div>{value.output.parent.value}</div>
            <input value = { value.remap } onChange = { ( e ) => {
              this.state.input.__updateMixedRemap( key, e, this.__update.bind( this ) )
            } }/>
          </div>
        )
      }.bind( this )
    );
  }

  render(){
    return(
      <InputBase
        input = { this.state.input }
        value = { this.state.value }
      >
        <div>
          {
            this.mapMixed()
          }
        </div>
      </InputBase>
    )
  }
}

export default MapMixedVariablesInterface
