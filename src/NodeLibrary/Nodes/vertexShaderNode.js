import Base from "./base"

class VertexShaderNode extends Base {
  constructor( settings ) {
    super( settings )
    this.createInput( "textarea", "TextArea" );
    this.createOutput( "vertexShader", "VertexShader" )
    this.setup();
  }

  __compile(){
    this.value = this.inputs[0].value
  }

  __setup(){
    this.value = this.inputs[0].value
  }

  __animate(){

  }
}

export default VertexShaderNode
