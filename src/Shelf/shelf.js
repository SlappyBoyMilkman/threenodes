import React from "react";
import Parameters from "./parameters"
import NodeInterface from "./nodeInterface"

const DragUtil = require("../util/drag")
const throttle = require("../util/throttle")

class Shelf extends React.Component{
  constructor( props ){
    super();
    this.state = {
      nodes: props.nodes,
      length: props.length,
      index: props.index,
      selected: props.selected,
      type: props.type,
      selectedNetwork: props.selectedNetwork
    }
  }

  componentWillReceiveProps( props ){
    this.setState({
      index: props.index,
      length: props.length,
      selected: props.selected,
      nodes: props.nodes,
      type: props.type,
      selectedNetwork: props.selectedNetwork
    })
  }

  inner(){
    if( this.state.type === "Parameters" ){
      return(
        <Parameters
        nodes = { this.state.nodes }
        selected = { this.state.selected }
        />
      )
    }else if( this.state.type === "NodeInterface" ){
      return(
        <NodeInterface
        nodes = { this.state.nodes }
        selected = { this.state.selected }
        />
      )
    }

  }

  dragStart(){
    let rect = this.refs.shelf.getBoundingClientRect();
    this.setState({ init: rect })
  }

  drag( e ){
    console.log( this.state.init.height + this.state.diff.y );
    this.setState({
      height: `${this.state.init.height + this.state.diff.y}px`
    })
  }

  dragEnd(){

  }

  border(){
    if( this.state.index !== this.state.length - 1 ){
      return(
        <div className = "shelf__border shelf__border--vertical"
          onDragStart = {
            ( e ) => {
              DragUtil.dragStart.bind( this )( e, this.dragStart.bind( this ) )
            }
          }
          onDrag = {
            ( e ) => {
              throttle(
                () => {
                  DragUtil.drag.bind( this )( e, this.drag.bind( this ) )
                },
                100
              )()
            }
          }
          draggable = "true"
        ></div>
      )
    }
  }

  getStyle(){
    if( this.state.height ){
      return({
        height: `${ this.state.height }`
      })
    }
  }

  getClassName(){
    if( this.state.index === this.state.length - 1 ){
      return "inner__shelf inner__shelf--last"
    }else{
      return "inner__shelf"
    }
  }

  breadcrumbs(){
    if( this.state.selectedNetwork ){

    }
  }

  render(){
    return(
      <div className = { this.getClassName() } ref = "shelf" style = { this.getStyle() }>
        {
          this.breadcrumbs()
        }
        {
          this.inner()
        }
        {
          this.border()
        }
      </div>
    )
  }
}

export default Shelf
