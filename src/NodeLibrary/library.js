import Font from "./Nodes/font"
import TextCanvas from "./Nodes/textCanvas"
import StringNode from "./Nodes/stringNode"
import IntegerNode from "./Nodes/integerNode"
import MixedVariableMap from "./Nodes/MixedVariableMap"
import VertexShaderNode from "./Nodes/vertexShaderNode"
import FragmentShaderNode from "./Nodes/fragmentShaderNode"
import ThreeShaderMaterial from "./Nodes/threeShaderMaterial";
import ThreeSphere from "./Nodes/threeSphere"
import ThreeMesh from "./Nodes/threeMesh"
import TextSpheres from "./Network/TextSpheres"

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

  String: function( settings ){
    let string = new StringNode( settings );
    return string
  },

  Integer: function( settings ){
    let inty = new IntegerNode( settings );
    return inty
  },

  mapMixedVariables: function( settings ){
    let mixed = new MixedVariableMap( settings );
    return mixed
  },

  VertexShader: function( settings ){
    let vert = new VertexShaderNode( settings )
    return vert
  },

  FragmentShader: function( settings ){
    let vert = new FragmentShaderNode( settings )
    return vert
  },

  ShaderMaterial: function( settings ){
    let material = new ThreeShaderMaterial( settings );
    return material;
  },

  Sphere: function( settings ){
    let geo = new ThreeSphere( settings );
    return geo;
  },

  Mesh: function( settings ){
    let mesh = new ThreeMesh( settings );
    return mesh
  },

  idList: {},

  nodeList: {},

  getOutput: function( id ){
    return this.idList[id];
  },

  Network: {
    Spheres: function( settings ){
      let spheres = new TextSpheres( settings );
      return spheres;
    }
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
