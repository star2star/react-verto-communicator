# Component Name:  CallHistoryItem   #
# 1. Functional Description #

The CallHistoryItem component displays specific information about previously made calls.

# 2. Visual Design #  

![CallHistoryItem Component](./img/chi.png)

# 4. Component Type #

The CallHistoryItem component will be a pure component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| data | data={} | A required object necessary for displaying call information. |
| compStyle |  _NOTE styles are in JSX, not CSS { inputWrapStyle: {backgroundColor: '#ddd'} inputStyle {fontSize: '1rem'} }m | An optional object that customizes style. |


## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c .Component Events ##

Event | Action(s)
------------ | -------------
CallHistoryItem Clicked | 1 .Invoke the callback function with the current key of the component as an argument. <br>
Hamburger Menu Icon Clicked | 1 .Invoke the callback function with the current key of the component as an argument. <br>

## d. Context-Aware Specification ##

This component is NOT a context-aware component.

# 5. Reference Components #

- VertoBaseComponent
- Radium
- InjectIntl
- svgIcons

# 6. Unit Testing Requirement #

- renders a list of of data objects
- renders a callerId in a span
- renders a lastTimestamp in a span
- renders nbrCalls in a span
- renders lastDirection in a span
- dials phone number if component is clicked.
- renders a list of timestamps if hamburger icon is clicked.
