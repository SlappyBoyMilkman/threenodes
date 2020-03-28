
module.exports = {
  dragStart: function( e, callback ){
    e.stopPropagation();
    var crt = document.createElement("div");
    crt.style.backgroundColor = "red";
    crt.style.transform = "translate( 0, 1000000000 )";
    crt.style.display = "none";
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
    if( callback ){
      this.setState({
        dragStart: {
          x: e.clientX,
          y: e.clientY,
          target: e.target
        }
      }, () => {
        callback( e )
      })

    }else{
      this.setState({
        dragStart: {
          x: e.clientX,
          y: e.clientY,
          target: e.target
        }
      })
    }
  },

  drag: function( e, callback ){
    e.stopPropagation();
    if( e.clientX && e.clientX !== 0 && e.clientY && e.clientY !== 0 ){
      if( callback ){
        this.setState({
          drag: {
            x: e.clientX,
            y: e.clientY,
            target: e.target
          },
          diff: {
            x: e.clientX - this.state.dragStart.x,
            y: e.clientY - this.state.dragStart.y
          }
        }, callback)
      }else{
        this.setState({
          drag: {
            x: e.clientX,
            y: e.clientY,
            target: e.target
          }
        })
      }
    }
  },

  dragEnd: function( callback ){

    callback();
  }
}
