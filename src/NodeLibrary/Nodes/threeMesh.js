import Base from "./base";
const THREE = require("three")

class ThreeMesh extends Base{
  constructor( settings ){
    super( settings );
    this.createInput( "threeShaderMaterial", "Material", 40 )
    this.createInput( "threeGeometry", "Geometry" )
    this.createInput( "vec3", "Position", [ 1, 2, 3 ] )
    this.createInput( "vec3", "Radius", [ 1, 2, 3 ] )
    this.createInput( "vec3", "Scale", [ 1, 2, 3 ] )
    this.createOutput( "threemesh", "Mesh" );
    this.setup();
  }

  __compile(){
    if( this.hasValues() ){
      let material = this.inputs[0].value;
      let geo = this.inputs[1].value;
      let mesh = new THREE.Mesh( geo, material );
      this.mesh = mesh;
      this.value = this.mesh;
    }
  }

  __setup(){

  }

  __animate(){

  }
}

export default ThreeMesh
