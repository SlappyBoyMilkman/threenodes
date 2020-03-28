import React from "react";
import Input from "./input"
import Output from "./output"

const throttle = require("../util/throttle")
const DragUtil = require("../util/drag");

class Node extends React.Component{
  constructor( props ){
    super();
    this.state = {
      node: props.node,
      x: props.node.x,
      y: props.node.y
    }
    this.state.node.bindComponent( this )
  }

  componentWillReceiveProps( props ){
    this.setState({
      node: props.node
    })
  }

  getStyle(){
    return({
      left: `${this.state.x}px`,
      top: `${this.state.y}px`
    })
  }

  mapInputs(){
    return this.state.node.inputs.map(
      ( input, index ) => {
        return(
          <Input
          index = { index }
          input = { input }
          key = {`node_input--${index}`}
          />
        )
      }
    )
  }

  mapOutputs(){
    return this.state.node.outputs.map(
      ( output, index ) => {
        return(
          <Output
          index = { index }
          output = { output }
          key = {`node_input--${index}`}
          />
        )
      }
    )
  }

  updateDrag(){
    let x = this.state.diff.x
    let y = this.state.diff.y
    this.setState({
      x: this.state.start.x + x,
      y: this.state.start.y + y
    })
    this.state.node.updateCoords( x, y )
  }

  dragStart(){
    this.setState({
      start: {
        x: this.state.x,
        y: this.state.y
      }
    })
  }

  dragEnd(){
    this.state.node.update();
  }

  render(){
    return(
      <div
      className = "node"
      style = {this.getStyle()}
      onDragStart = {
        ( e ) => {
          DragUtil.dragStart.bind( this )( e, this.dragStart.bind( this ) )
        }
      }
      draggable = "true"
      onDrag = {
        ( e ) => {
          throttle(
            () => {
              DragUtil.drag.bind( this )( e, this.updateDrag.bind( this ) )
            },
            100
          )()
        }
      }
      onDragEnd = {
        ( e ) => {
          DragUtil.dragEnd( this.dragEnd.bind( this ) )
        }
      }
      >
        {
          this.mapInputs()
        }
        <div className = "node__name">
          {
            this.state.node.name
          }
        </div>
        {
          this.mapOutputs()
        }
      </div>
    )
  }
}

export default Node
