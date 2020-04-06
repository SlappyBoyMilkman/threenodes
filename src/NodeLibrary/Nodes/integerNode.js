import Base from "./base";

class IntegerNode extends Base{
  constructor( settings ){
    super( settings );
    this.createInput( "integer", "Integer", 0, true )
    this.createOutput( "integer", "Integer" )
    this.setup();
  }

  __setup(){
    this.value = this.inputs[0].value;
  }

  __compile(){
    this.value = this.inputs[0].value;
  }

  __animate(){

  }
}

export default IntegerNode
