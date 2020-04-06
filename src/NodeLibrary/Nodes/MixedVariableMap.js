import Base from "./base"

class MixedVariableMap extends Base {
  constructor( settings ) {
    super( settings )
    this.createInput( "mixed", "Mixed" )
    this.createOutput( "variableMap", "Variable Map" );
    this.setup();
  }

  __compile(){
    this.value = this.inputs[0].mixedConnections
  }

  __setup(){
    this.value = this.inputs[0].mixedConnections
  }

  __animate(){

  }
}

export default MixedVariableMap
