import React from "react";

class ShelfTab extends React.Component{

  constructor( props ){
    super();
    this.state = {
      tab: props.tab,
      clicked: false
    }
  }

  componentDidMount(){
    window.registerUnclick( this.unClick.bind( this ) )
  }

  unClick(){
    this.setState({ clicked: false })
  }

  items(){
    return this.state.tab.items.map(
      ( item, index ) => {
        return(
          <li key = {`tab__item__${index}`} onClick = { item.click }>
            {
              item.name
            }
          </li>
        )
      }
    );
  }

  toggleVisible(){
    window.unClick();
    this.setState({ clicked: !this.state.clicked })
  }

  getClassName(){
    if( this.state.clicked ){
      return(
        "shelf__tab shelf__tab--clicked"
      )
    }else{
      return(
        "shelf__tab"
      )
    }
  }

  render(){
    return(
      <div className = { this.getClassName() } onClick = { this.toggleVisible.bind( this ) }>
        <div className = "shelf__tab__value"> { this.state.tab.name } </div>
          <ul className = "shelf__tab__dropdown">
            {
              this.items()
            }
          </ul>
      </div>
    )
  }
}

export default ShelfTab
