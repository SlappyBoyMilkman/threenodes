import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Entry from "./Index/index.js"
import "./App.css"

let location = window.location;

function doThing(){
  console.log("happening")
  return(
    <Entry/>
  )
}

export default doThing
