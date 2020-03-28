import Base from "./base"

class TextCanvas extends Base{
  constructor( settings ){
    super( settings );
    this.createInput( "string", "Text" )
    this.createInput( "typeface", "Typeface" )
    this.createOutput( "canvas", "Canvas" )
  }

  setup(){

  }

  change(){

  }

  animate(){

  }
}

export default TextCanvas
