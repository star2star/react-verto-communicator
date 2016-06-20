# Component Name: messageAdminControls  #
# 1. Functional Description #

This component provides the admin(s) of a given call with a set of options. These options can vary based off of the value of some of the props passed into the component.

# 2. Visual Design #  

![An example of the admin controls](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/messageAdminControl-img.png)

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| multCanvas | multCanvas = false | This prop is a boolean and is not required. This prop tells the admin controls component wether or not not there are multiple active canvases. The value of this prop will change what controls get displayed. |
| compStyle |  compStyle={} | This prop is an object and is not required, This prop styles the admin controls component. |  
| member | member = {} | This prop is an object and is required. This prop provides information on an individual member of the call.  |

## b. Component State ##

  This component will maintain it's own state for presentational purposes.

## c. Context-Aware Specification ##

  This component is NOT a context-aware component

# 5. Reference Components #

- vertobase
- svgIcons

# 6. Unit Testing Requirement #

Tests can be found in src/tests.
