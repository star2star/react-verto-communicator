# Component Name: lastCall  #
# 1. Functional Description #

This component will display, in the appbar, what the last call made was. Display the text 'last call', 'in call', or 'no call' (depending on state) with the called phone number.

# 2. Visual Design #  

![An example of this component](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/lastcall-example.png)


# 4. Component Type #

This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| lastNumber | "567-242-4774" | This prop is passed into the component. This prop is the last phone number or extension called using the communicator. |
| compStyle | compStyle={}| compStyle is an object that defines styles for the compStyle component. |
| labelText | "No Call" | This prop is passed into the component. This prop provides the text that is place before the lastNumber. |
| cbClick |  cbClick={()=>{}} | This prop is a callback function. |


## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c .Component Events ##

Event | Action(s)
------------ | -------------
The last call container is clicked. | This button invokes the callback function lastNumber prop in the component.

## d. Context-Aware Specification ##

This component is NOT a context-aware component

# 5. Reference Components #

- VertoBaseComponent

# 6. Unit Testing Requirement #

Tests can be found in src/tests
