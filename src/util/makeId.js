module.exports = {
  library: {

  },
  generate: function (length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  generateHash: function(){
    let base = 16;
    let id = this.generate( base );
    while( this.library[id] ){
      base++
      id = this.generate( base )
    }
    this.library[id] = true;
    return id;
  },

  removeHash: function( id ){
    delete this.library[id];
  }
}
