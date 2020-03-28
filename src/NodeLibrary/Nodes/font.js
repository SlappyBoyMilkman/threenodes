import Base from "./base"

class Font extends Base{
  constructor( settings ){
    super( settings )
    this.createInput( "file", "Text" )
    this.createOutput( "typeface", "Typeface" )
  }
}

export default Font
