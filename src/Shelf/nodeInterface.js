import React from "react";
import Node from "../Node/node.js"

class NodeInterface extends React.Component{
  constructor( props ){
    super();
    this.state = {
      nodes: props.nodes,
      selected: props.selected
    }
  }

  componentWillReceiveProps( props ){
    this.setState({ nodes: props.nodes, selected: props.selected })
  }

  mapNodes(){
    let nodes = this.state.nodes
    return nodes.map(
      function( node, index ){
        return(
          <Node
            node = {node}
            key = {`node--${index}`}
            selected = { this.state.selected }
          />
        )
      }.bind( this )
    );
  }

  render(){
    return(
      <div className = "position-full node-interface">
        {
          this.mapNodes()
        }
      </div>
    )
  }
}

export default NodeInterface
