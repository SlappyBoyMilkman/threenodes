import Library from "../library"
import Connection from "../Connection/connection"

class Input extends Connection{
  constructor( type, name, _default, parent, hidden ){
    super();
    this.type = type;
    this.label = name;
    this.name = name;
    this.parent = parent;
    this._default = _default;
    this.hidden = hidden ? hidden : false;
    this.connectedOutput = undefined;
    this.mixedConnections = {};
    this.getUniqueId();
    this.getValue()
  }

  getValue(){
    switch( this.type ){
      case "typeface":
      this.value = undefined;
      break;

      case "string":
      this.value = this._default !== undefined ? this._default : "";
      break;

      case "integer":
      this.value = this._default !== undefined ? this._default : 1;
      break;

      case "textarea":
      if( this.parent.type === "VertexShaderNode" ){
        this.value = `
        void main()
        {
          gl_Position = gl_ProjectionMatrix * gl_ModelViewMatrix * gl_Vertex;
        }
        `
      }else if( this.parent.type === "FragmentShaderNode" ){
        this.value = `
        void main()
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
        `
      }
      break

      case "vec3":
      this.value = this._default !== undefined ? this._default : [0,0,0];
    }
  }

  updateValue( value ){
    this.value = value;
    this.parent.update();
  }

  connect( output ){
    this.connectedOutput = output;
    output.connectInput( this );
    this.parent.update()
    this.connected = true;
    this.connectListener = this.connectedOutput.parent.addListener( "update", this.__updateValue.bind( this ) )
  }

  connectMixed( output ){
    if( !this.mixedConnections[output.parent.name] ){
      this.mixedConnections[output.parent.name] = { output: output, remap: output.parent.name };
    }else{
      this.mixedConnections[output.parent.name].output = output
    }
    output.connectInput( this );
    this.parent.update()
    this.connected = true;
    output.parent.addListener( "update", this.__updateValueMixed.bind( this ) )
  }

  __updateMixedRemap( key, e, update ){
    this.mixedConnections[key].remap = e.target.value
    update( this )
  }

  __updateValueMixed(){
    this.parent.update();
  }

  __updateValue(){
    this.value = this.connectedOutput.parent.value;
    this.parent.update();
  }

  disconnect(){
    this.connectedOutput.parent.removeListener( "update", this.connectListener )
    let output = this.connectedOutput;
    this.connectedOutput = undefined
    if( output ){
      output.disconnectInput( this );
    }
    let listeners = this.listeners[ "disconnect" ];
    if( listeners ){
    }
    this.connected = false;
    this.parent.update();
  }

  assignRef( ref ){
    this.ref = ref;
  }

  handleChange( value ){
    if( !this.connected ){
      this.value = value;
      this.parent.update();
    }
  }

  getUniqueId(){
    let nodeList = Library.nodeList;
    let className = this.name;
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
