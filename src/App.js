import React, { Component } from 'react';
import './App.css';
import Axios from "axios";

class App extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    Axios.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000").then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    });
  }
  componentDidMount(){
    console.log(this.state);
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Toronto Waste Lookup</h1>
        </div>
        <div className="Search-Area">
          <input type="text" placeholder="Enter here"></input> <img alt="search"></img>
        </div>
      </div>
    );
  }
}

export default App;
