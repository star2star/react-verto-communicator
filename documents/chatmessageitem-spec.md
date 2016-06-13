# Component Name:  chatmessageitem  #
# 1. Functional Description #

This component creates the visual representation of a chat message inside the communicator.

# 2. Visual Design #  

![An exanple of a chat input field , taken from the 'original' verto ](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/chatmessageitem-img.png)

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| message | message = {} | This prop is an object and is not required. This object contains the information necessary to print out the full chat message. |
| compStyle |  compStyle={} | This prop is an object and it styles the chat message item component.  |


## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c. Context-Aware Specification ##

his component is NOT a context-aware component

# 5. Reference Components #

- vertobase
- svgIcons

# 6. Unit Testing Requirement #

Tests can be found in src/tests.
