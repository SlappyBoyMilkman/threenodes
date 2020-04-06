import Base from "./base"

class Font extends Base{
  constructor( settings ){
    super( settings )
    this.createInput( "file", "Text" )
    this.createOutput( "typeface", "Typeface" )
    this.setup();
  }

  __compile(){
    let id = this.name;
    let style = document.getElementById( id )
    if( !style ){
      style = document.createElement("style");
      document.head.appendChild( style )
      style.type = "text/css";
      style.innerText = this.inputs[0].value
    }
    this.value = this.name;
  }

  __setup(){

  }

  __animate(){

  }
}

export default Font
