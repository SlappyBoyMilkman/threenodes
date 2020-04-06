import React from "react";
import Parameters from "./parameters.js"
import NodeInterface from "./nodeInterface.js"
import ShelfTab from "./shelfTab"
import Shelf from "./shelf"
const DragUtil = require("../util/drag")
const $ = require("jquery")

class Shelves extends React.Component{
  constructor( props ){
    super();
    this.state = {
      splitHeight: 50,
      shelfWidth: 30,
      nodes: props.nodes,
      selected: props.selected,
      shelves: [
        "Parameters",
        "NodeInterface"
      ],
      selectedNetwork: undefined
    }
  }

  componentWillReceiveProps( props ){
    this.setState({
      nodes: props.nodes,
      selected: props.selected
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



  toggleShelf( name ){
    let existIndex = false
    let shelves;
    this.state.shelves.forEach(
      function( shelf, index ){
        if( shelf === name ){
          existIndex = index;
        }
      }
    );
    if( existIndex !== false ){
      this.state.shelves.splice( existIndex, 1 )
      shelves = this.state.shelves;
    }else{
      shelves = this.state.shelves;
      shelves.push( name )
    }
    this.setState({ shelves: shelves })
  }

  tabs(){
    let tabs = [
      {
        name: "File",
        items: [
          {
            name: "New Scene",
            click: function(){
            }.bind( this ),
            getValue: function(){
              return false
            }.bind( this )
          }
        ]
      },
      {
        name: "Workspace",
        items: [
          {
            name: "Parameters",
            click: function(){
              this.toggleShelf( "Parameters" )
            }.bind( this ),
            getValue: function(){
              this.getShelfValue( "Parameters" )
            }.bind( this )
          },
          {
            name: "Interface",
            click: function(){
              this.toggleShelf( "NodeInterface" )
            }.bind( this ),
            getValue: function(){
              this.getShelfValue( "NodeInterface" )
            }.bind( this )
          },
          {
            name: "Object",
            click: function(){
              this.toggleShelf( "Object" )
            }.bind( this ),
            getValue: function(){
              this.getShelfValue( "Object" )
            }.bind( this )
          }
        ]
      }
    ]

    return tabs.map(
      function( tab, index ){
        return(
          <ShelfTab tab = { tab } key = {`shelf-tab--${index}`}/>
        )
      }
    );
  }

  shelves(){
    return this.state.shelves.map(
      ( name, index ) => {
        console.log( name )
        return(
          <Shelf
            nodes = { this.state.nodes }
            type = { name }
            index = { index }
            selectedNetwork = { this.state.selectedNetwork }
            selected = { this.state.selected }
            length = {this.state.shelves.length}
            key = {`shelf__${index}`}
          />
        )
      }
    );
  }


  render(){
    return(
      <div className = "shelf" style = { this.getStyle() }>
        <div className = "shelf__head">
          {
            this.tabs()
          }
        </div>
        <div className = "shelf__body">
          {
            this.shelves()
          }
        </div>
      </div>
    )
  }
}

export default Shelves;
