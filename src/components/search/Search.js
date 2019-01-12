import React, {Component} from 'react';
//img
import searchIcon from "../../img/searchIcon.PNG";
//css
import "./search.css";

class Search extends Component {
    constructor(props) {
        super(props);
        this.searchHandler = this
            .searchHandler
            .bind(this);
        this.filter = this
            .filter
            .bind(this);
        this.search = this.search.bind(this);
        this.keyboardEnter = this.keyboardEnter.bind(this);
        this.favorite = this.favorite.bind(this);
        this.renderCard = [];
    }
    //handles input for search bar
    searchHandler(evt) {
      console.log(this);
      if (evt.target.value == ""){
        this.renderCard = [];
        this.forceUpdate();
      }else{
        console.log("render")
        this.renderCard = this.filter(evt.target.value);
      }
    }
    filter(input) {
      var data = [];
      data = this.props.data.filter(e=>{
        if (e.keywords.indexOf(input) !== -1){
          return e;
        }
      });
      return data;
    }

    keyboardEnter(e){
      if(e.keyCode == 13){
        this.search();
      }
    }
    favorite(e){
      console.log(e);
    }
    search(){
      console.log("searching")
      this.forceUpdate();
    }
    render() {
      console.log("%c Render card :","color:green");
      console.log(this.renderCard.length)
      if (this.renderCard.length == 0){
        var cards = (<div></div>);
      }else{
        var cards = this.renderCard.map(e => {
                return (<div className="card" key={e.id}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="title">
                                    <span className="iconstar"><button onClick={data=>this.favorite(e.id)}>favorite</button></span>
                                    <h2>{e.title}</h2>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-6">
                                <div className="description">
                                    {e.body}
                                </div>
                            </div>
                        </div>
                    </div>);
        });
      }
      // Favorites
        return (
            <div className="Search container-fluid">
                <div className="searchBar">
                    <input
                        type="text"
                        onChange={this.searchHandler}
                        onKeyDown={e=>(this.keyboardEnter(e))}
                        name="searchInput"
                        placeholder="search toronto waste..."></input>
                    <img id="searchIcon" src={searchIcon}  onClick={this.search} alt="green search icon"></img>
                    <div className="clearfix"></div>
                </div>
                <div className="searchContent">
                  {/* Cards */}
                  {cards}
                </div>
                <div
                    className="favorites"
                    style={{
                    background: "rgb(247,254,250)"
                }}>
                    <div className="row">
                        <div className="title col-md-12">
                            <h1
                                style={{
                                marginLeft: "29px",
                                color: "rgb(35,153,92)"
                            }}>Favorites</h1>
                        </div>
                    </div>
                    <div className="favoriteContent">
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;