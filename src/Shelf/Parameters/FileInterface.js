import React from "react";
import InputBase from "./base"



class FileInterface extends InputBase{
  constructor( props ){
    super( props );
    this.state = {
      input: props.input,
      value: props.input.value
    }
  }

  handleChange(e){
    let files = e.target.files;
    let old = document.getElementById( this.state.input.parent.name )
    if( old ){
      old.remove()
    }
    for( var i = 0; i < files.length; i++ ){
      let file = files[i];
      let reader = new FileReader()
      reader.onload = function( e ){
        let value = `
          @font-face{
            font-family: "${ this.state.input.parent.name }";
            font-style: normal;
            src: url( "${e.srcElement.result}" );
          }
        `
        this.state.input.handleChange( value )
      }.bind( this )
      reader.readAsDataURL( file )
    }

  }

  render(){
    return(
      <InputBase
        input = { this.state.input }
        value = { this.state.value }
      >
          <label>Font File</label>
          <input type="file" id="myfile" name="myfile" onChange = { this.handleChange.bind( this ) }/>
      </InputBase>
    )
  }
}

export default FileInterface;
