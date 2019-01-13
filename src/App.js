import React, { Component } from 'react';
import './App.css';
import Axios from "axios";
import Search from './components/search/Search';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
    console.log("app has started");
  }

  // fetchs api
  componentDidMount(){
    Axios.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000").then(data=>{      
      this.setState({
        data: data.data,isLoading: false
      });
    }).catch(err=>{
      this.setState({error: err,isLoading: false});
      alert("Api request failed");
    });
  }

  render() {
   const { isLoading } = this.state;
   //render loading screen if api has not been fetched yet
   if (isLoading) {
     return (<div className="loading"></div>)
   }

    return (
      <div className="App container-default">
        <div className="header">
          <h1>Toronto Waste Lookup</h1>
        </div>
        <div className="Search-Area">
          <Search {...this.state}></Search>
        </div>
      </div>
    );
  }
}

export default App;
