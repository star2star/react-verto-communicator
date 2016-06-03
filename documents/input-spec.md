# Component Name:  Input   #
# 1. Functional Description #

The Input component is an area that displays a label and an input area.

# 2. Visual Design #  

![Input Component](./img/input.png)


# 3. Component Type #

This component will be a pure component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| placeHolderTxt | "Send a message..." | _Include a brief description of what the prop does as well as whether it is required or not and its' type_ |
| styles |  _NOTE styles are in JSX, not CSX_ { inputWrapStyle: {backgroundColor: '#ddd'} inputStyle {fontSize: '1rem'} }m | Sample: |
| cbSubmit |  _Function implemented and bound to a higher-order parent container of this component_ | This prop is a string and is required. This prop is passed into this component from the session component and controls what message we display to the user. |

## b. Component State ##

This component will maintain its own state for presentational purposes.

Initial state:
this.state = {'onFocus' : false}  // menu is initially 'up'

## c .Component Events ##

|Event | Action(s)|
|------------ | -------------|
|Input onFocus | 1 . callback function invoked<br>2. change state of onFocus to true|
|Input onBlur | 1. callback function invoked<br>2. change state of onFocus to false|


## d. Context-Aware Specification ##

This component is NOT a context-aware component.

# 4. Reference Components #

- VertoBaseComponent
- react-intl

# 5. Unit Testing Requirement #

- It displays a label
- It displays an input field.
