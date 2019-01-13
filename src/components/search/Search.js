import React, {Component} from 'react';
//img
import greyStar from "../../img/greyStar.PNG";
import greenStar from "../../img/greenStar.PNG";
import searchIcon from "../../img/searchIcon.PNG";
//css
import "./search.css";
//utils
import uuid from "uuid";
import ReactParser from "react-html-parser";

class Search extends Component {
    constructor(props) {
        super(props);
        this.searchHandler = this
            .searchHandler
            .bind(this);
        this.filter = this
            .filter
            .bind(this);
        this.search = this
            .search
            .bind(this);
        this.keyboardEnter = this
            .keyboardEnter
            .bind(this);
        this.favorite = this
            .favorite
            .bind(this);
        var data = this.props;
        for (var i = 0; i < data.data.length; i++){
            data.data[i]["uuid"] = uuid.v4();
            data.data[i]["favorite"] = false;
        }
        this.old = data;
        this.renderCard = [];
        this.renderFavorite = [];
    }
    //handles input for search bar
    searchHandler(evt) {
        if (evt.target.value === "") {
            this.renderCard = [];
            this.forceUpdate();
        } else {
            this.renderCard = this.filter(evt.target.value);
        }
    }
    //filters array of data based on input
    filter(input) {
        var data = [];
        data = this
            .old
            .data
            .filter(e => {
                if (e.keywords.indexOf(input) !== -1) {
                    return e;
                } else {
                    
                }
            });
        return data;
    }
    //allows search with enter key
    keyboardEnter(e) {
        if (e.keyCode === 13) {
            this.search();
        }
    }
    //adds cards to favorite section or removes it
    favorite(e) {
        var indexObj = this.old.data.findIndex(item=> item.uuid === e);
        if (this.old.data[indexObj].favorite){
            this.old.data[indexObj].favorite = false;
            // remove from view
            let indexOfFavorite = this.renderFavorite.findIndex(elm=> elm.uuid === e);
            this.renderFavorite.splice(indexOfFavorite,1);
        }else{
            //add to rendered favourite cards
            this.old.data[indexObj].favorite = true;
            this.renderFavorite.push(this.old.data[indexObj]);
        }
        this.forceUpdate();
    }
    //rerenders components
    search() {
        console.log("searching")
        this.forceUpdate();
    }
    render() {
        var cards = "";
        if (this.renderCard.length === 0) {
            cards = (
                <div></div>
            );
        } else {
            cards = this
                .renderCard
                .map((e, index) => {          
                     var text = ReactParser(e.body);
                     var elm = <div dangerouslySetInnerHTML={{__html:text.toString()}}></div>
                    return (
                        <div className="card" key={index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="title">
                                        <span className="iconstar">
                                            {e.favorite ? <img src={greenStar} alt="greenstar" onClick={d => this.favorite(e.uuid)}></img> : <img src={greyStar} alt="greystar" onClick={d => this.favorite(e.uuid)}></img> }                                           
                                        </span>
                                        <h2>{e.title}</h2>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-md-6">
                                    <div className="description" id="renderHTML">                         
                                        {elm}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
        }
        // Favorites
        var favoriteCards = "";
        if (this.renderFavorite.length === 0) {
            favoriteCards = <div></div>
        } else {
            favoriteCards = this
                .renderFavorite
                .map((e, index) => {
                    var text = ReactParser(e.body);
                     var elm = <div dangerouslySetInnerHTML={{__html:text.toString()}}></div>
                    return (
                        <div className="card" key={index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="title">
                                        <span className="iconstar">
                                        {e.favorite ? <img src={greenStar} alt="greenstar" onClick={d => this.favorite(e.uuid)}></img> : <img src={greyStar} alt="greystar" onClick={d => this.favorite(e.uuid)}></img> }                                           
                                        </span>
                                        <h2>{e.title}</h2>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-md-6">
                                    <div className="description">
                                        {elm}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                });
        }
        return (
            <div className="Search container-fluid">
                <div className="searchBar">
                    <input
                        type="text"
                        onChange={this.searchHandler}
                        onKeyDown={e => (this.keyboardEnter(e))}
                        name="searchInput"
                        placeholder="search toronto waste..."></input>
                    <img
                        id="searchIcon"
                        src={searchIcon}
                        onClick={this.search}
                        alt="green search icon"></img>
                    <div className="clearfix"></div>
                </div>
                {/* SEARCH CONTENT AREA */}
                <div className="searchContent" style={{paddingBottom:"20px"}}>
                <div className="row">
                    {/* Cards */}
                    <div className="col-md-12">
                        {cards}
                    </div>                    
                </div>                  
                </div>
                {/* FAVOURITE CARDS AREA */}
                <div
                    className="favorites"
                    style={{
                    background: "rgb(247,254,250)",
                    paddingBottom:"20px"
                }}>
                    <div className="row">
                        <div className="title col-md-12">
                            <h1
                                style={{
                                marginLeft: "29px",
                                paddingTop:"20px",
                                color: "rgb(35,153,92)"
                            }}>Favourites</h1>
                        </div>
                    </div>
                    <div className="favoriteContent">
                    {/* Favorite Cards */}
                        {favoriteCards}
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;