# Component Name:  Settings   #
# 1. Functional Description #


*This component will be a text input control that will invoke a callback function when the enter/return key is pressed by the user.  When the enter key is pressed, the input field will be cleared and will retain focus.  The input must be contained in div that has rounded corners at the bottom and square corners at the top so it can be aligned with another component.  Default styling should include font-size, line-height, color, border-radius, margin and padding for the input, and for the container, background-color, border, and border-radius.  The default styles should be overridable via props in part or in their entirety.  Placeholder text value is passed in using props.*

# 2. Visual Design #  

(REMOVE WHEN DONE)

Images with callouts for size, colors, etc. and/or reference to a document containing the visual design specification for the component.  Extract from design documentation and paste here.

Sample:

![A breakdown of how this component looks](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/Template-Image.png)

(REMOVE)

# 3. Component Type #

(REMOVE WHEN DONE)

Indicate whether this is to be a ‘pure’ component or ‘context-aware’ component.  Context-aware components will access the 'store' and contribute to maintaining application state and are sometimes referred to as container components.  ‘Pure’ components receive data through props from parent nodes, may or may not maintain their own state,  and are sometimes called presentational components.

Sample:

_This component will be a 'pure' component.  It will accept props for styling, placeholder text, and callback function when enter is pressed. Or for a ChatContainer component
This component will be a 'context-aware' component.  It will maintain a 'store' object that will maintain all data required to run multiple chat sessions and maintain the integrity of the visual components that it references._

(REMOVE)

## a. Required Props ##

(REMOVE WHEN DONE)

List the props that will be input to this component, as well as their data type and a brief description of their intended usage.  

If the prop is an object, a sample of the object structure needs to be provided.
If the prop is a callback function, then a sample of the function call including input arguments and their data types must be provided.  If an argument is an object, then a sample of its structure must be provided.

Sample:

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| placeHolderTxt | "Send a message..." | _Include a brief description of what the prop does as well as whether it is required or not and its' type_ |
| styles |  _NOTE styles are in JSX, not CSX_ { inputWrapStyle: {backgroundColor: '#ddd'} inputStyle {fontSize: '1rem'} }m | Sample: |
| cbSubmit |  _Function implemented and bound to a higher-order parent container of this component_ | This prop is a string and is required. This prop is passed into this component from the session component and controls what message we display to the user. |

(REMOVE)

## b. Component State ##

(REMOVE WHEN DONE)

If the component needs to maintain state, then the state structure must be defined here.   Definition must include the key that make up the state object, their data type, their initial value, and a description of how they are used (i.e. when they get updated, what happens when a state change occurs, etc.)

If the component will not maintain state, then it should be noted here explicitly.

Sample:

This component will not maintain its own state.  It will change as new prop values are passed into it from its parent.

Or

This component is a drop down menu and will toggle between up and down based on click of a button.
Initial state:
State = {menuDown: false}  // menu is initially 'up'
onClick of button
	// set menuDown to the inverse of its current value
this.setState({...this.state, menuDown: !this.state.menuDown});

(REMOVE)

## c .Component Events ##
(REMOVE WHEN DONE)

If the component needs to react to events (clicks, key presses, etc.) then those events should be listed here along with the action that should be taken:

Sample:

Event | Action(s)
------------ | -------------
Enter/Return key pressed | 1 .Invoke the callback function cbSubmit() with the current value of the input control as an argument. <br> 2. Clear the input control so that placeholder text is displayed </br>  3. Keep focus on input control

(REMOVE)

## d. Context-Aware Specification ##

(REMOVE WHEN DONE)

If the component is a context-aware component, then this section must define the structure of the store, the dispatch functions, action creators, reducers, middleware, and subscriptions that need to be implemented.

Sample:

TODO - Finish adding example of documenting a context aware component

(REMOVE)

# 4. Reference Components #

(REMOVE WHEN DONE)

Identify all components that this component will reference.  Should include the install procedure (i.e.  npm install theComponent --save(-dev) ) as well as link to the repository that the component is stored.  This will make it easier for the developer to find the README.md appropriate for that component.

If no additional components are required, state it here explicitly.

Sample:

_The component to be developed requires the s2s-button component. Type
	npm install s2s-button --save to add it to the package.json file._

(REMOVE)

# 5. Unit Testing Requirement #

(REMOVE WHEN DONE)

If the software engineer want to require specific unit tests be conducted on the component, they should be listed here.  Otherwise the component developer is free to develop the unit test suite on his own.

(REMOVE)

A unit test suite must be developed as part of the component development process.  Unit tests must be provided to Star2Star and be runnable using 'npm test'.  Refer to the Star2Star Unit Testing standards document.  Test framework must use Jest/Jasmine, Enzyme and Sinon.

Refer to the following links:
* Jest: https://facebook.github.io/jest/docs/tutorial.html#content
* Jasmine 2.0: http://jasmine.github.io/2.0/introduction.html
* Enzyme: https://github.com/airbnb/enzyme
* Sinon: http://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/?utm_source=javascriptweekly&utm_medium=email
* http://sinonjs.org/docs/
