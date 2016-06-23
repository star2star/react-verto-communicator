# Component Name: splashmessage #
# 1. Functional Description #
This component displays the the loading message as well as the progress bar. This component will take in the splashmessage component in order to display what stage of loading the communicator is in. The splashmessage component will also alert the user if there is an error.

# 2. Visual Design #

![An example of what this component will output when it hits an error](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/splash-screenshot.png)  

# 3. Component Type #

This is a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| Step | { number: 1, current: 2, title: "Checking media permissions" } | This prop is an object with a particular shape and is required . This object must have the number, current, and title properties. This object contains information about each step the communicator takes when it loads. |
| compStyle | compStyle = {} | This prop is an object and is not required. This object sets the style for this component |

## b. Component State ##

This is a 'pure' component.

# c. Context-Aware Specification ##

This component is a 'pure component'.

# 4. Reference Components #

* vertobase component
* splashmessage component
* ReactIntl

# 5. Unit Testing Requirement #

Tests can be found in src/tests
