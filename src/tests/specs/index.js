import React from "react";
// Step 1 -  Import your component here...
import VCStatus from "../../components/vcstatus.js";
import BNS from "../../components/browser.js"


// Step 2 - Add a describe block for your component and define the appropriate tests

describe("VCStatus", function() {

  before(() => {
    //type now accepts SVG name as value
    this.component(
      <VCStatus
          status='disconnected'

      /> );
  });
  section('default', ()=>{
    it("Reset", () => {
      this.component(
        <VCStatus
            status='disconnected'
            svgStyle={{svgStyle:{width: '100px', height: '100px'}}}
        /> );
    });
  });

  section('UI', ()=>{
    it("add styles", () => {
      this.component(
        <VCStatus
            status='disconnected'
            Style= {{ svgStyle:{paddingRight:'20px', height: '24px', width: '24px' }}}
        /> );
    });
  });


});

///////////////////////////////////////////////////////////////////////////////

describe("BroweserNotSupported", function() {

  before(() => {
    //type now accepts SVG name as value
    this.component(
      <BNS

      /> );
  });
  section('default', ()=>{
    it("Reset", () => {
      this.component(
        <BNS
        /> );
    });
  });

  section('More Stuff', ()=>{
    it("does stuff", () => {
      this.component(
        <BNS
        /> );
    });
  });
});

/*
// more sample code here
//import MyComponent from "../MyComponent.jsx";
const LOREM = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


describe("MyComponent", function() {
  let count = 0;
  this.header(`## A Simple Component`); // Markdown.

  before(() => {
    // Runs when the Suite loads.
    // Use this to load your component-under-test.
    this.component( <MyComponent /> );
  });

  it("reload", () => {
    count += 1;
    this.component( <MyComponent
                color="red"
                text={`My Component ${ count }`} /> );
  });

  section("text", () => {
    it("increment", () => {
      count += 1;
      this.props({ text: `My Component ${ count }` });
    });
    it("long", () => { this.props({ text: LOREM }) });
  });

  section("color", () => {
    it("red", () => this.props({ color: "red" }));
    it("green", () => this.props({ color: "green" }));
    it("blue", () => this.props({ color: "blue" }));
    it("orange (error)", () => this.props({ color: "orange" }));
  });
});
*/
