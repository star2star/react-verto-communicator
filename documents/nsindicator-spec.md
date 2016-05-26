# Component Name:  network-status-indicator
# 1. Functional Description #

The NetworkStatusIndicator component displays a network status icon. It can be clicked to render a dropdown menu that displays specific network information.

# 2. Visual Design #  

![network-status-indicator icon](img/nsi-icon.png)<br><br>
![network-status-indicator menu](img/nsi-menu.png)

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##


| Prop Name | Sample | Description |
|------------ | ------------- | ---------------|
|networkData | networkData={<br>upkpbs: {value},<br> downkpbs: {value},<br>videoResolution: {value}<br>} | Required. An object that contains properties necessary for calculating the correct icon to render and content to display.  |
|addMenuOption |  addMenuOption={}| An optional object that may contain a method to run onClick|
|compStyle | compStyle={} | An object that contains css styles.|
| allowDisplayDetails | allowDisplayDetails={true} | A boolean. If true, it will render the caret icon and a dropdown menu. If false, it will simply render the network-status icon|

## b. Component State ##

This component will maintain it's own state for dropdownDisplayed.

## c. Component Events ##

|Event | Action(s)|
|------------ | -------------|
|network-status-indicator icon clicked | 1 . dropdownDisplayed state is toggled.|
|menu item clicked | 1. cbAddMenuOption is invoked. |
|NetworkStatusIndicator.toggleDisplay() called | 1. dropdownDisplayed state is toggled |



## d. Context-Aware Specification ##

This component is a pure component and it will maintain it’s own state for presentational purposes.

# 5. Reference Components #

The component to be developed requires the following components:

- svgIcons<br>
- vertobase<br>
- ReactIntl<br>


# 6. Unit Testing Requirement #

Tests for this component are located at:

        src/tests/nsindicator-test.js

Refer to the following links:
* Jest: https://facebook.github.io/jest/docs/tutorial.html#content
* Jasmine 2.0: http://jasmine.github.io/2.0/introduction.html
* Enzyme: https://github.com/airbnb/enzyme
* Sinon: http://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/?utm_source=javascriptweekly&utm_medium=email
* http://sinonjs.org/docs/
