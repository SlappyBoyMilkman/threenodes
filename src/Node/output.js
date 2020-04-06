import React from "react";
import Connection from "./connection.js"
const throttle = require("../util/throttle")
const DragUtil = require("../util/drag");
const Library = require("../NodeLibrary/library")


class Output extends React.Component{
  constructor( props ){
    super();
    this.state = {
      index: props.index,
      output: props.output
    }
  }

  componentWillReceiveProps( props ){
    this.setState({
      index: props.index
    })
  }

  componentDidMount(){
    this.state.output.assignRef( this.refs.output )
  }



  getStyle(){
    return({
      left: `${this.state.index * 15}px`
    })
  }

  dragStart( e ){
  }

  drag(){

  }

  updateDrag( e ){

  }

  onMouseEnter(){
    this.setState({ mouseOver: true })
  }

  onMouseLeave(){
    this.setState({ mouseOver: false })
  }

  dragEnd(){
    this.setState({ offset: undefined, diff: undefined })
  }

  connections(){
    return this.state.output.connections.map(
      ( el, index ) => {
        return(
          <Connection output = { this.state.output } el = { el } key = { index }></Connection>
        )
      }
    );
  }

  getD(){
    if( this.state.diff ){
      return(
        `M 205 205 q 0 10 ${ (this.state.diff.x / 2) }  ${ (this.state.diff.y) / 2 } q ${ this.state.diff.x / 2 } ${ (this.state.diff.y / 2) - 10 } ${ ( (this.state.diff.x / 2) + 10 ) } ${ (this.state.diff.y / 2) + 20 }`
      )
    }
  }

  potential(){
    return(
      <svg width = "600" height = "600" className = "connection">
        <path d = { this.getD() } stroke="black" fill = "none"></path>
      </svg>
    )
  }

  hover(){
    if( this.state.mouseOver ){
      return(
        <div className = "output__hover">
        {this.state.output.type}
        </div>
      )
    }
  }

  render(){
    return(
      <div
      className = "node__output"
      style = { this.getStyle() }
      draggable = "true"
      ref = "output"
      onMouseEnter = { this.onMouseEnter.bind( this ) }
      onMouseLeave = { this.onMouseLeave.bind( this ) }
      onDragStart = {
        ( e ) => {
          e.dataTransfer.setData( "id", this.state.output.id );
          e.dataTransfer.setData( "type", this.state.output.type );
          DragUtil.dragStart.bind( this )( e, this.dragStart.bind( this ) )
        }
      }
      onDrag = {
        ( e ) => {
          e.stopPropagation()
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
          this.connections()
        }
        {
          this.hover()
        }
        {
          this.potential()
        }
      </div>
    )
  }
}

export default Output
