import Library from "../library"
import Connection from "../Connection/connection"

class Input extends Connection{
  constructor( type, name, _default, parent ){
    super();
    this.type = type;
    this.name = name;
    this.parent = parent;
    this._default = _default;
    this.connectedOutput = undefined;
    this.getUniqueId();
  }

  connect( output ){
    this.connectedOutput = output;
    output.connectInput( this );
    this.parent.update()
  }

  disconnect(){
    let output = this.connectedOutput;
    this.connectedOutput = undefined
    if( output ){
      output.disconnectInput( this );
    }
    let listeners = this.listeners[ "disconnect" ];
    if( listeners ){
    }
    this.parent.update();
  }

  assignRef( ref ){
    this.ref = ref;
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

export default Input;
