import Base from "./base"

class TextCanvas extends Base{
  constructor( settings ){
    super( settings );
    this.createInput( "string", "Text" )
    this.createInput( "typeface", "Typeface" )
    this.createInput( "integer", "Integer" )
    this.createOutput( "canvas", "Canvas" )
    this.setup();
  }

  __compile(){
    var thing = document.getElementById( this.id );
    if( thing ){
      thing.remove()
    }
    if(
      this.inputs[0].value && this.inputs[0].value.length && this.inputs[0].value.length > 0
      && this.inputs[1].value && this.inputs[1].value.length && this.inputs[1].value.length > 0
      && this.inputs[2].value
     ){
      let canvas = document.createElement( "canvas" );
      let ctx = canvas.getContext( "2d" );
      canvas.id = this.id;
      canvas.width = 1000;
      canvas.height = this.inputs[2].value;
      ctx.textBaseline = "top";
      ctx.font = `${ this.inputs[2].value }px ${ this.inputs[1].value }`
      ctx.fillText( this.inputs[0].value , 0, 0);
      this.value = canvas
    }else{
    }

  }
  __setup(){
  }

  __animate(){

  }
}

export default TextCanvas
