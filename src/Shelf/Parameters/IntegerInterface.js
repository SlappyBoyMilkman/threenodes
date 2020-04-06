import React from "react";
import InputBase from "./base"
const DragUtil = require("../../util/drag");
const throttle = require("../../util/throttle")
class IntegerInterface extends InputBase{
  constructor( props ){
    super( props );
    this.state = {
      input: props.input,
      value: props.input.value
    }
  }

  handleChange( e ){
    let value = e.target.value
    if( !parseInt(value) ){
      value = 0;
    }else{
      value = parseFloat( value )
    }

    this.state.input.handleChange( value )
  }

  dragStart(){
    this.setState({
      startValue: this.state.value
    })
  }

  updateDrag(){
    let value = this.state.startValue + ( this.state.diff.x / 10 )
    this.state.input.handleChange( value )
  }

  dragEnd(){
  }

  render(){
    return(
      <InputBase
        input = { this.state.input }
        value = { this.state.value }
      >
        <div
          draggable = "true"
          onDragStart = {
            ( e ) => {
              DragUtil.dragStart.bind( this )( e, this.dragStart.bind( this ) )
            }
          }
          onDrag = {
            ( e ) => {
              throttle(
                () => {
                  DragUtil.drag.bind( this )( e, this.updateDrag.bind( this ) )
                },
                400
              )()
            }
          }
          onDragEnd = {
            ( e ) => {
              DragUtil.dragEnd( this.dragEnd.bind( this ) )
            }
          }
        >
          <input value = { this.state.value } onChange = { this.handleChange.bind( this ) }/>
        </div>
      </InputBase>
    )
  }
}

export default IntegerInterface
