# Component Name:  vidcontrolsadmin  #

# 1. Functional Description #

This component displays a set of controls to the moderator of a call. These controls get displayed underneath the video.

# 2. Visual Design #  

![A sample set of admin controls](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/admin-img%202.png)

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##


| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| currLayout | currLayout = [] | This prop is an array and is not required. This prop provides the communicator with information on how to position the different video windows. |
| layouts | layouts=[] | This prop is an array and is not required. This prop provides a list of all the possible video layouts. |
| cbSubmit |  _Function iponent_ | This prop is a string and sage we display to the user. |
| cbSubmit |  _Function iponent_ | This prop is a string and sage we display to the user. |
| cbSubmit |  _Function iponent_ | This prop is a string and sage we display to the user. |
| cbSubmit |  _Function iponent_ | This prop is a string and sage we display to the user. |
| cbSubmit |  _Function iponent_ | This prop is a string and sage we display to the user. |
| cbSubmit |  _Function iponent_ | This prop is a string and sage we display to the user. |




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

# 5. Reference Components #

(REMOVE WHEN DONE)

Identify all components that this component will reference.  Should include the install procedure (i.e.  npm install theComponent --save(-dev) ) as well as link to the repository that the component is stored.  This will make it easier for the developer to find the README.md appropriate for that component.

If no additional components are required, state it here explicitly.

Sample:

_The component to be developed requires the s2s-button component. Type
	npm install s2s-button --save to add it to the package.json file._

(REMOVE)

# 6. Unit Testing Requirement #

unit tests can be found in src/tests.
