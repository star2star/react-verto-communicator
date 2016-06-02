# Component Name:  Contributors   #
# 1. Functional Description #

The Contributors component is a modal that displays a user avatar, name, and email.

# 3. Visual Design #  

![A breakdown of how this component looks](./img/contributors.png)

# 4. Component Type #

_This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| compStyle |  _NOTE styles are in JSX, not CSX_ { inputWrapStyle: {backgroundColor: '#ddd'} inputStyle {fontSize: '1rem'} }m | Sample: |

## b. Component State ##

This component will not maintain its own state.  It will change as new prop values are passed into it from its parent.

## c. Component Events ##

Event | Action(s)
------------ | -------------
"" | ""

## d. Context-Aware Specification ##

This component is NOT a context-aware component.

# 5. Reference Components #

- react-intl
- Modal
- App

# 6. Unit Testing Requirement #

- This component does accept styles as a prop.
