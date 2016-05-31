# Component Name:  Settings   #
# 1. Functional Description #

The Settings Menu is a large dropdown menu that drops down under the **App Bar** when the **settings icon** in clicked.  The settings menu will stretch to full length of the App Bar (which is also the full width of the window). The Settings menu will be horizontal three column layout until the window width is resized to 991px or smaller. At this point, the columns will stack vertically.
The entire menu consists of five areas in a three column format: media, General Settings, Language, Audio Settings, and Video Settings.<br>
The first column contains a media area. It has headings with select menu's for **Camera:**, **Share Device**, **Microphone:**, **Speaker:**, and **Best Frame Rate:**. At the bottom of this column are two buttons positioned one above the other. The top button is labelled **Preview Settings**. The bottom button is labelled **Refresh Device List**.<br>
The second column consists of General Settings, Language, and Audio Settings areas. Under the **General Settings:** header is a list of five checkboxes (see image for details) **Language:** has a select menu to choose your language. **Audio Settings** is a list of three  checkboxes (see image for details).<br>
The third column consists of the Video Settings with two checkboxes under the **Video Settings:** header (see image for details). Below that is a button labelled **Check Network Settings**.<br>
The default settings data will be passed in as a prop: **data**.<br>
All text will be passed in as Formatted Messages with an id describing the text and a default message the text as a string.

# 2. Visual Design #  

Images with callouts for size, colors, etc. and/or reference to a document containing the visual design specification for the component.  Extract from design documentation and paste here.

![A breakdown of how this component looks](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/Settings-image-full.png)

# 3. Component Type #

This is a ‘pure' component.

## a. Required Props ##

If the prop is an object, a sample of the object structure needs to be provided.
If the prop is a callback function, then a sample of the function call including input arguments and their data types must be provided.  If an argument is an object, then a sample of its structure must be provided.

Sample:

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| placeHolder | "..." | _Include a brief description of what the prop does as well as whether it is required or not and its' type_ |
| styles |  _NOTE styles are in JSX, not CSX_ { inputWrapStyle: {backgroundColor: '#ddd'} inputStyle {fontSize: '1rem'} }m | Sample: |
| cbClick |  _Function implemented and bound to a higher-order parent container of this component_ | This prop is a string and is required. This prop is passed into this component from the session component and controls what message we display to the user. |

## b. Component State ##

This component will maintain it's own state for dropdownDisplayed.

This component is a drop down menu and will toggle between up and down based on click of a button(SettingsIconSVG).
Initial state:
State = {menuDown: false}  // menu is initially 'up'
onClick of button
	// set menuDown to the inverse of its current value
this.setState({...this.state, menuDown: !this.state.menuDown});

## c .Component Events ##

If the component needs to react to events (clicks, key presses, etc.) then those events should be listed here along with the action that should be taken:

Sample:

Event | Action(s)
------------ | -------------
Settings icon clicked | Invoke the callback function cbClick(), dropdownDisplayed state is toggled.

## d. Context-Aware Specification ##

If the component is a context-aware component, then this section must define the structure of the store, the dispatch functions, action creators, reducers, middleware, and subscriptions that need to be implemented.

# 4. Reference Components #

The component to be developed requires the following components:

- VertoBaseComponent
- svgIcons
- react-intl


# 5. Unit Testing Requirement #
Tests for this component are located at:

        src/tests/settings-test.js
