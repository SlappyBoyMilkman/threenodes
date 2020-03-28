import React from "react";
import Shelf from "../Shelf/shelf"
import Library from "../NodeLibrary/library.js"
import Scene from "../NodeLibrary/scene.js";

class Index extends React.Component{
  constructor(){
    super();
    let scene = new Scene();
    let font  = Library.Font({
      x: 30,
      y: 50,
      inputs: [1,2,2],
      outputs: [1,2]
    })

    let font2  = Library.TextCanvas({
      x: 30,
      y: 120,
      inputs: [1,2],
      outputs: [1,2]
    })

    let nodes = [
      font,
      font2
    ]

    this.state = {
      nodes: nodes,
      scene: scene
    }
  }

  componentWillUnmount(){

  }

  render(){
    console.log("happening index")
    return(
      <div className = "index">
        <Shelf nodes = { this.state.nodes }/>
      </div>
    )
  }
}

export default Index;
