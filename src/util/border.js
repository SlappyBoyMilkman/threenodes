module.exports = {
  dragStart: function( e ){
    this.setState({
      dragStart: {
        x: e.clientX,
        y: e.clientY
      }
    })
  },

  drag: function( e, callback ){
    if( e.clientX && e.clientX !== 0 && e.clientY && e.clientY !== 0 ){
      if( callback ){
        this.setState({
          drag: {
            x: e.clientX,
            y: e.clientY,
          }
        }, callback )
      }

    }
  }
}
