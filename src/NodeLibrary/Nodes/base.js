import Library from "../library"
import Input from "../Input/input.js"
import Output from "../Output/output.js"

const MakeId = require( "../../util/makeId" );

class NodeBase{
  constructor( settings ){
    this.getParameters( settings )
    this.addToNodeList()
    this.inputs = [];
    this.outputs = [];
    this.listeners = {}
  }

  addListener( name, callback ){
    let id = MakeId.generateHash();
    if( !this.listeners[name] ){
      this.listeners[name] = {};
    }
    this.listeners[name][id] = callback;
    return id;
  }

  hasValues(  ){
    let hasValues = true
    for( var i = 0; i < this.inputs.length; i++ ){
      let input = this.inputs[i];
      if( input.value === undefined ){
        hasValues = false;
      }
    }
    return hasValues
  }

  bindComponent( component ){
    this.component = component;
  }

  removeListener( name, id ){
    if( this.listeners[name] && this.listeners[name][id] ){
      delete this.listeners[name][id]
    }
  }

  setup(){
    if( this.__setup ){
      this.addListener( "setup", this.__setup.bind( this ) )
    }

    if( this.__animate ){
      this.addListener( "animate", this.__animate.bind( this ) )
    }

    if( this.__compile ){
      this.addListener( "compile", this.__compile.bind( this ) )
    }

    Object.values(this.listeners["setup"]).forEach(
      ( callback ) => {
        callback();
      }
    );
  }

  update(){
    Object.values(this.listeners["compile"]).forEach(
      ( callback ) => {
        callback();
      }
    );
    if( this.listeners["update"] ){
      Object.values(this.listeners["update"]).forEach(
        ( callback ) => {
          callback();
        }
      );
    }
    if( this.component && !this.component.node ){
      this.component.setState({ node: this })
    }
    let nodes = this.updateConnectedNodes();
  }

  getConnectedNodes(){
    let list = [];
    this.outputs.forEach(
      ( output ) => {
        output.getConnectedNodes( list )
      }
    );

    return list;
  }

  updateConnectedNodes(){
    let list = this.getConnectedNodes();
    list.forEach(
      ( node ) => {
        node.update();
      }
    )
  }

  updateCoords(){
    if( this.listeners["updateCoords"] ){
      Object.values(this.listeners["updateCoords"]).forEach(
        ( callback ) => {
          callback();
        }
      );
    }
  }

  addToNodeList(){
    let nodeList = Library.nodeList;
    let className = this.constructor.name;
    if( !nodeList[className] ){
      nodeList[className] = {}
    }
    let name = `${className}${Object.keys(nodeList[className]).length}`
    let id = Library.getUniqueId( name );
    nodeList[className][id] = id
    if( Library.idList[id] ){
    }else{
      this.id = id;
      this.name = name
      Library.idList[id] = this
    }
  }

  getParameters( settings ){
    let entries = Object.entries( settings )
    this.type = this.constructor.name;
    entries.forEach(
      ( entry, index ) => {
        this[ entry[0] ] = entry[1]
      }
    );
  }

  createInput( type, name, _default, hidden ){
    let input = new Input( type, name, _default, this, hidden );
    this.inputs.push( input )
  }

  createOutput( type, name, _default ){
    let output = new Output( type, name, _default, this );
    this.outputs.push( output )
  }
}
export default NodeBase
