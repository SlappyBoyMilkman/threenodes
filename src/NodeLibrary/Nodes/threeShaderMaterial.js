import Base from "./base";
const THREE = require("three")

class ThreeShaderMaterial extends Base{
  constructor( settings ){
    super( settings );
    this.createInput( "variableMap", "Variable Map" );
    this.createInput( "vertexShader", "Vertex Shader" );
    this.createInput( "fragmentShader", "Fragment Shader" );
    this.createOutput( "threeShaderMaterial", "ThreeShaderMaterial" );
    this.setup()
  }

  __compile(){
    if( this.material ){
      this.material.dispose();
    }
    if( this.hasValues() ){
      let vert = this.inputs[1].value;
      let frag = this.inputs[2].value;
      let uniforms = this.inputs[0].value;
      this.material = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: uniforms
      })
      this.value = this.material
    }
  }


  __setup(){

  }

  __animate(){

  }
}

export default ThreeShaderMaterial
