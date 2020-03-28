import Library from "../library"
import Input from "../Input/input.js"
import Output from "../Output/output.js"

class NodeBase{
  constructor( settings ){
    this.getParameters( settings )
    this.addToNodeList()
    this.inputs = [];
    this.outputs = [];
    this.listeners = {}
  }

  addListener( name, callback ){
    this.listeners[name] === undefined ? this.listeners[name] = [ callback ]: this.listeners[name].push( callback );
  }

  bindComponent( component ){
    this.component = component;
  }

  update(){
    if( this.listeners["update"] ){
      this.listeners["update"].forEach(
        ( callback ) => {
          callback();
        }
      );
    }

    this.component.setState({ node: this })
  }

  updateCoords(){
    if( this.listeners["updateCoords"] ){
      this.listeners["updateCoords"].forEach(
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
    entries.forEach(
      ( entry, index ) => {
        this[ entry[0] ] = entry[1]
      }
    );
  }

  createInput( type, name, _default ){
    let input = new Input( type, name, _default, this );
    this.inputs.push( input )
  }

  createOutput( type, name, _default ){
    let output = new Output( type, name, _default, this );
    this.outputs.push( output )
  }
}
export default NodeBase
