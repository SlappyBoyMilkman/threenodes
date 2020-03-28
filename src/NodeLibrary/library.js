import Font from "./Nodes/font"
import TextCanvas from "./Nodes/textCanvas"

let Library = {
  Font: function( settings ){
    let font = new Font( settings );
    console.log( "new font" )
    return font
  },

  TextCanvas: function( settings ){
    let textCanvas = new TextCanvas( settings );
    console.log( "new Text Canvas" )
    return textCanvas
  },

  idList: {},

  nodeList: {},

  getOutput: function( id ){
    return this.idList[id];
  },

  getUniqueId: function( str ){
    var hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return hash;
  }

}


window.idList = Library.idList;
window.nodeList = Library.nodeList;

export default Library
