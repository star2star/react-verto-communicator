# Component Name:  vidControlsUser   #
# 1. Functional Description #

This component displays 5 controls to modify either a user's video or audio. These controls will always show for the user. When a control is hovered over a tooltip will show.

# 2. Visual Design #  

We are changing the style from the original verto. Will ad an image when the styles are done.

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| cbMicMute | function cbMicMute = {...} | This prop is a function and is required. This function gets called when the mic or video status icon is clicked. |
| compStyle|  compStyle = {} | This prop styles the user controls. |
| cbScreenShare| function cbScreenShare = {...} | This prop is a function and is required. This function gets called when the screen share icon is clicked |
| cbToggleChat |  function cbToggleChat = {...} | This prop is a function and is required. This function gets called when the chat icon is clicked. If chat is open the function will cause the the chat the close when clicked. |
| userConfStatus |  userConfStatus = {} | This prop is an object and is not required. This prop is used in checking if a user's video or audio is muted. |
| newMsgCount |  newMsgCount = 88 | This prop is used in printing out the badge for the chat icon. This prop is a representation how many new messages have been added to the chat since the chat was hidden. |

## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c .Component Events ##

| Event | Action(s) |
| ------------ | ------------- |
| Mic/Video status icon clicked | 1 .Invoke the callback function cbMicMute() 2. Changes the SVG to properly denote the change that was made. |
| screenshare icon clicked | 1 .Invoke the callback function cbScreenShare. |
| chat icon clicked | 1 .Invoke the callback function cbScreenShare. 2. Toggles the chat to either display or not to display based on the previous status of the chat menu. |

## d. Context-Aware Specification ##

This component is NOT a context-aware component

# 4. Reference Components #

- vertobase
- controlItem
- tooltip

# 6. Unit Testing Requirement #

Tests can be found in src/tests
