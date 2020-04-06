import Base from "./base";
const THREE = require("three")

class ThreeSphere extends Base{
  constructor( settings ){
    super( settings );
    this.createInput( "integer", "Radius", 40 )
    this.createInput( "integer", "WidthSegments", 40 )
    this.createInput( "integer", "HeightSegments", 40 )
    this.createOutput( "threeGeometry", "Sphere" );
    this.setup();
  }

  __compile(){
    let radius = this.inputs[0].value
    let widthSegments = this.inputs[1].value
    let heightSegments = this.inputs[2].value
    if( this.sphere ){
      debugger
    }
    if( this.hasValues() ){
      this.sphere = new THREE.Sphere( radius, widthSegments, heightSegments );
      this.value = this.sphere;
    }
  }

  __setup(){
  }

  __animate(){

  }
}

export default ThreeSphere
