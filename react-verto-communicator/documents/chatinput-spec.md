# Component Name: chatinput  #

# 1. Functional Description #

This component is placed at the bottom of the chat area. This component gives each user in a call the ability to type out a message. When the enter button is pressed the message will be put into the chat.

# 2. Visual Design #  

![An exanple of a chat message, taken from the 'original' verto ](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/chatmessageitem-img.png)

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##


| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| sessionId | "007" | This prop is string and is not required. This string helps differentiate between different chat sessions. |
| compStyles | compStyle={} | This prop styles the chatinput component. |
| cbSubmitMessage | cbSubmitMessage={()=>{}}  | This prop is a function and is not required. This function is a callback to the submit message function.  |

## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c .Component Events ##

| Event | Action(s) |
| ------------ | ------------- |
| Enter/Return key pressed | 1 .Invoke the callback function cbSubmitMessage() with the current value of the input control as an argument. 2. Clear the input control so that placeholder text is displayed   3. Keep focus on input control |


## d. Context-Aware Specification ##

This component is NOT a context-aware component

# 5. Reference Components #

- vertobase

# 6. Unit Testing Requirement #

Tests can be found in src/tests.
