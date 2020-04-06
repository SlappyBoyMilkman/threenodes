import Base from "../Nodes/base";

class NetworkBase extends Base{
  constructor( settings ){
    super( settings );
    this.nodes = [];
    this.setup();
  }


}

export default NetworkBase;
