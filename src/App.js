import React, { Component } from 'react';
import './App.css';
import Axios from "axios";
import Search from './components/search/Search';

class App extends Component {
  constructor(props){
    super(props);
    console.log("app has started");
  }
  componentWillMount(){
    Axios.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000").then(data=>{
      console.log(data);
      this.setState({
        apiData: data.data
      });
    }).catch(err=>{
      console.log(err);
      alert("Api request failed");
    });
  }
  componentDidUpdate(){
    console.log(this.state);
  }
  render() {
    return (
      <div className="App container">
        <div className="header">
          <h1>Toronto Waste Lookup</h1>
        </div>
        <div className="Search-Area">
          <Search></Search>
        </div>
      </div>
    );
  }
}

export default App;
