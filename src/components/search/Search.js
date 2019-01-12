import React, {Component} from 'react';
//img
import searchIcon from "../../img/searchIcon.PNG";
//css
import "./search.css";

class Search extends Component {
  constructor(props){
    super(props);
    this.searchHandler = this.searchHandler.bind(this);
  }
  componentWillReceiveProps(){
    console.log("received");
    console.log(this.props)
  }
  searchHandler(evt){
    console.log("listening");
  }
  render(){
    return (
      <div className="Search">
          <div className="searchBar">
              <input type="text" onChange={this.searchHandler()} placeholder="search toronto waste..."></input>
              <img id="searchIcon" src={searchIcon} alt="green search icon"></img>
              <div className="clearfix"></div>
          </div>
          <div className="searchContent">

          </div>
          <div className="favorites">

          </div>
      </div>
    )
  }
}
export default Search;