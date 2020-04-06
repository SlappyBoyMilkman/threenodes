import Base from "./base"

class StringNode extends Base{
  constructor( settings ){
    super( settings );
    this.createInput( "string", "String", "Thing", true )
    this.createOutput( "string", "String" )
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

export default StringNode
