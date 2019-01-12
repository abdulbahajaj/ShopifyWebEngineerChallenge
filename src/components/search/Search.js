import React, {Component} from 'react';
//img
import searchIcon from "../../img/searchIcon.PNG";
//css
import "./search.css";
//utils
import uuid from "uuid";

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
        this.old = data;
        this.renderCard = [];
        this.renderFavorite = [];
    }
    //handles input for search bar
    searchHandler(evt) {
        console.log(this);
        if (evt.target.value === "") {
            this.renderCard = [];
            this.forceUpdate();
        } else {
            console.log("render")
            this.renderCard = this.filter(evt.target.value);
        }
    }
    filter(input) {
        var data = [];
        data = this
            .old
            .data
            .filter(e => {
                if (e.keywords.indexOf(input) !== -1) {
                    return e;
                } else {
                    return [];
                }
            });
        return data;
    }

    keyboardEnter(e) {
        if (e.keyCode === 13) {
            this.search();
        }
    }
    favorite(e) {
        if (this.renderCard[e].favorite) {
            this.renderCard[e].favorite = false;
            this
                .renderFavorite
                .pop();
        } else {
            this.renderCard[e].favorite = true;
            console.log(this.old)
            console.log(this.renderCard[e]);
            this
                .renderFavorite
                .push(this.renderCard[e]);
        }
        this.forceUpdate();
    }
    search() {
        console.log("searching")
        this.forceUpdate();
    }
    render() {
        console.log("%c Render card :", "color:green");
        console.log(this.renderCard.length)
        var cards = "";
        if (this.renderCard.length === 0) {
            cards = (
                <div></div>
            );
        } else {
            cards = this
                .renderCard
                .map((e, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="title">
                                        <span className="iconstar">
                                            <button onClick={d => this.favorite(index)}>favorite</button>
                                        </span>
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
                    return (
                        <div className="card" key={index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="title">
                                        <span className="iconstar">
                                            <button onClick={d => this.favorite(index)}>favorite</button>
                                        </span>
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
                        {favoriteCards}
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;