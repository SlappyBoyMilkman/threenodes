class Connection{
  constructor(){
    this.listeners = {}
  }

  addListener( type, callback ){
    if( !this.listeners[ type ] ){
      this.listeners[ type ] = []
    }
    this.listeners[ type ].push( callback )
  }

  removeListener(){
  }
}

export default Connection
