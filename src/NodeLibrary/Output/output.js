import Connection from "../Connection/connection"
import Library from "../library"

class Output extends Connection{
  constructor( type, name, _default, parent ){
    super();
    this.type = type;
    this.name = name;
    this.parent = parent;
    this._default = _default;
    this.connections = [];
    this.getUniqueId();
  }

  assignRef( ref ){
    this.ref = ref;
  }

  connectInput( input ){
    this.connections.push( input );
  }

  disconnectInput( output ){
    let outputIndex;
    this.connections.forEach(
      function( _output, index ){
        if( _output === output ){
          this.connections[ index ] = undefined
        }
      }.bind( this )
    );
    let connections = this.connections.filter( ( value ) => {
      return value !== undefined
    })

    this.connections = connections
    this.parent.update();
  }

  getConnectedNodes( list ){
    this.connections.forEach(
      ( connection ) => {
        let node = connection.parent;
        list.push( node )
      }
    );
  }

  getUniqueId(){
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
}

export default Output;
