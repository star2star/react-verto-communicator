# Component Name: CallProgress   #
# 1. Functional Description #

This component displays a set of relevant information and controls to a user when they are in a call. This information includes what extension they are currently dialed into and how long the call has been going on for.

# 2. Visual Design #  

![an example of a call progress bar when logged in as an admin](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/progress-img.png)


# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| callData | callData = {} | This prop is an object and is required. This prop provides information on the current call. |
| cbDTMF | function cbDTMF = {...} | This prop is a callback function and is required. |
| cbHangup | function cbHangup = {...} | This prop is a callback function and is required. |
| cbHold | function cbHold = {...} | This prop is a callback function and is required. |
| cbMute | function cbMute = {...} | This prop is a callback function and is required. |
| cbSetVideoMode | function cbSetVideoMode = {...} | This prop is a callback function and is required. |
| cbShare | function cbShare = {...} | This prop is a callback function and is required. |
| cbToggleChat | function cbToggleChat = {...} | This prop is a callback function and is required. |
| currLayout | currLayout = [] | This prop is an array and is not required. This prop provides the component with information on the current layout of the video. |
| layouts | layouts=[] | This prop is an array and is not required. This prop provides a list of all the possible video layouts. |
| newMsgCount | newMsgCount = 3 | This prop is a number and is not required. This prop tells the badge above the chat icon exactly what number to print. |
| userConfStatus | userConfStatus = {} | This prop is an object and is not required. This prop tells the component if a user is in a call or not. |

## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c. Context-Aware Specification ##

This component is NOT a context-aware component

# 5. Reference Components #

- vertobase
- UserVideoControls
- AdminVideoControls
- svgIcons

# 6. Unit Testing Requirement #

Unit tests can be found in src/tests.
