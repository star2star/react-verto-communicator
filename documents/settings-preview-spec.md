# Component Name: settingsPreview  #
# 1. Functional Description #

This component provides the user with a preview of what a user's video will look like during a call. The user can also change what microphone or camera they are using on the fly and will update in real time.

# 2. Visual Design #  

![An example of a preview](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/preview.png)


# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
|  cbClose | cbClose()=> | This prop is a function and is required.  |
| compStyle |  compStyle={} | compStyle is an object that defines styles for the component. |
| settingsData | settingData={} | This prop is an object and is required. This provides the component with the default settings the user has for their microphone and camera|



## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c .Component Events ##

| Event | Action(s) |
| ------------ | ------------- |
| refresh button is clicked | When the refresh button is clicked the callback function refresh() is called. |
| save button is clicked | When the save button is clicked the callback function saveSettings() is called. |


## d. Context-Aware Specification ##

This component is a pure component and it will maintain it’s own state for presentational purposes.

# 5. Reference Components #

- svgIcons<br>
- VertoBaseComponent<br>
- ReactIntl
- vMeter
- volumeMeter
- settingsMenuSelect

# 6. Unit Testing Requirement #

Tests for this component are located at:

        src/tests/nsindicator-test.js
