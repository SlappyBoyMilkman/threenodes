import React from "react";
import Shelves from "../Shelf/shelves"
import Library from "../NodeLibrary/library.js"
import Scene from "../NodeLibrary/scene.js";

class Index extends React.Component{
  constructor(){
    super();
    let scene = new Scene();
    let font  = Library.Font({
      x: 140,
      y: 50,
      inputs: [1,2,2],
      outputs: [1,2]
    })

    let str = Library.String({
      x: 30,
      y: 50
    })

    let inty = Library.Integer({
      x: 250,
      y: 50
    })

    let font2  = Library.TextCanvas({
      x: 30,
      y: 120,
      inputs: [1,2],
      outputs: [1,2]
    })

    let mixed  = Library.mapMixedVariables({
      x: 30,
      y: 190,
      inputs: [1,2],
      outputs: [1,2]
    })

    let vert = Library.VertexShader({
      x: 140,
      y: 190,
      inputs: [1,2],
      outputs: [1,2]
    })

    let frag = Library.FragmentShader({
      x: 250,
      y: 190,
      inputs: [1,2],
      outputs: [1,2]
    })

    let material = Library.ShaderMaterial({
      x: 30,
      y: 260,
      inputs: [1,2],
      outputs: [1,2]
    })

    let geo = Library.Sphere({
      x: 140,
      y: 260,
      inputs: [1,2],
      outputs: [1,2]
    })

    let mesh = Library.Mesh({
      x: 30,
      y: 330,
      inputs: [1,2],
      outputs: [1,2]
    })

    inty.inputs[0].updateValue( 300 )

    font2.inputs[1].connect( font.outputs[0] )
    font2.inputs[0].connect( str.outputs[0] )
    font2.inputs[2].connect( inty.outputs[0] )
    mixed.inputs[0].connectMixed( font2.outputs[0] )
    material.inputs[0].connect( mixed.outputs[0] );
    material.inputs[1].connect( vert.outputs[0] );
    material.inputs[2].connect( frag.outputs[0] );
    mesh.inputs[0].connect( material.outputs[0] )
    mesh.inputs[1].connect( geo.outputs[0] )

    let nodes = [
      font,
      font2,
      str,
      inty,
      mixed,
      material,
      vert,
      frag,
      geo,
      mesh
    ]

    this.state = {
      nodes: nodes,
      scene: scene
    }

    this.__onUnclick = [];
    window.registerUnclick = this.registerUnclick.bind( this )
    window.clickNode = this.__clickNode.bind( this );
  }


  componentDidMount(){
    window.unClick = () => {
      this.__onUnclick.forEach(
        ( func ) => { func() }
      );
    }
  }

  registerUnclick( func ){
    this.__onUnclick.push( func )
  }

  __clickNode( node ){
    this.setState({ selected: node })
  }

  componentWillUnmount(){

  }

  render(){
    console.log("happening index")
    return(
      <div className = "index">
        <Shelves
          nodes = { this.state.nodes }
          selected = { this.state.selected }
          />
      </div>
    )
  }
}

export default Index;
