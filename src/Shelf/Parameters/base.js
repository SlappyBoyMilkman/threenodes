import React from "react";

class InputBase extends React.Component{
  constructor( props ){
    super();
    this.state = {
      input: props.input,
      value: props.value
    }
  }

  componentWillReceiveProps( props ){
    this.removeListener()
    this.setState({
      input: props.input,
      value: props.value
    }, this.addListener)
  }

  removeListener(){
    if( this.state.input ){
      this.state.input.parent.removeListener( "update", this.listener )
    }
  }

  componentWillUnmount(){
    this.removeListener()
  }

  addListener(){
    if( this.state.input ){
      this.listener = this.state.input.parent.addListener( "update", this.__handleChange.bind( this ) )
    }
  }

  componentDidMount(){
    this.listener = this.state.input.parent.addListener( "update", this.__handleChange.bind( this ) )
  }

  componentWillUnmount(){
    this.state.input.parent.removeListener( "update", this.listener )
  }

  __handleChange(){
    this.setState({ value: this.state.input.value })
  }

  render(){
    return(
      <div>
        {
          this.props.children
        }
      </div>
    )
  }
}

export default InputBase
