import React from "react";
import Parameters from "./parameters.js"
import NodeInterface from "./nodeInterface.js"

const DragUtil = require("../util/drag")
const $ = require("jquery")

class Shelf extends React.Component{
  constructor( props ){
    super();
    this.state = {
      splitHeight: 50,
      shelfWidth: 30,
      nodes: props.nodes
    }
  }

  componentWillReceiveProps( props ){
    this.setState({
      nodes: props.nodes
    })
  }

  componentDidMount(){
    this.getSplitHeight()
    $( window ).on( "resize", this.getSplitHeight.bind( this ) )
  }

  getSplitHeight(){
    this.setState({ splitHeight: 50 })
  }



  updateSplit(){
    let rect = this.refs.shelfInner.getBoundingClientRect();
    this.setState({
      splitHeight: (this.state.drag.y / rect.height) * 100
    })
  }


  getFirstStyle(){
    if( this.refs.shelfInner ){
      return({
        height: `${ this.refs.shelfInner.offsetHeight * ( this.state.splitHeight / 100 ) - this.refs.verticalBorder.offsetHeight }px`
      })
    }
  }

  getSecondStyle(){
    if( this.refs.shelfInner ){
      return({
        height: `${ this.refs.shelfInner.offsetHeight - (this.refs.shelfInner.offsetHeight * ( this.state.splitHeight / 100 )) }px`
      })
    }
  }

  updateWidth(){
    let width = (1 - (this.state.drag.x / window.innerWidth)) * 100;
    this.setState({ shelfWidth: width })
  }

  getStyle(){
    let width = window.innerWidth * ( this.state.shelfWidth / 100 )
    return({
      width: `${width}px`,
      left: `${window.innerWidth - width}px`
    })
  }

  render(){
    return(
      <div className = "shelf" style = { this.getStyle() }>
        <div className = "item" ref = "shelfInner">
          <div className = "vertical-half" style = { this.getFirstStyle() }>
            <Parameters/>
          </div>
          <div
            ref = "verticalBorder"
            className = "shelf__border shelf__border--vertical"
            draggable = "true"
            onDragStart = { DragUtil.dragStart.bind( this ) }
            onDrag = {
              function( e ){
                DragUtil.drag.bind( this )( e, this.updateSplit.bind( this ) )
              }.bind( this )
            }
          ></div>
          <div className = "vertical-half" style = { this.getSecondStyle() }>
            <NodeInterface nodes = { this.state.nodes }/>
          </div>
          <div
          className = "shelf__border shelf__border--horizontal"
          draggable = "true"
          onDragStart = { DragUtil.dragStart.bind( this ) }
          onDrag = {
            function( e ){
              DragUtil.drag.bind( this )( e, this.updateWidth.bind( this ) )
            }.bind( this )
          }
          ></div>
        </div>

      </div>
    )
  }
}

export default Shelf;
