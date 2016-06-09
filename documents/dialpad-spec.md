# Component Name:  Dialpad   #
# 1. Functional Description #

The Dialpad is an area that displays the specific information and tools necessary for placing a ca

# 3. Visual Design #  

![Dialpad](./img/dialpad.png)

# 4. Component Type #

This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| nbrToDial | nbrToDial="8"| nbrToDial is an optional that takes a string. |
| compStyle |  compStyle={} | compStyle is an object that defines styles for the dialpad component. |
| cbCall | cbCall={()=>{}} |  cbCall is a required callback function. |
| lastCall | lastCall="8"| lastCall is an optional prop that displays the last call dialed. |


## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c. Component Events ##

Event | Action(s)
------------ | -------------
Enter/Return key pressed | 1 .Invoke the callback function cbSubmit() with the current value of the input control as an argument. <br> 2. Clear the input control so that placeholder text is displayed </br>  3. Keep focus on input control


## d. Context-Aware Specification ##

This component is NOT a context-aware component

# 5. Reference Components #

- Radium
- VertoBaseComponent
- ReactIntl
- SvgIcons


# 6. Unit Testing Requirement #
- If Numberpad area is active then SVGS render.
- If Numberpad area is inactive then SVGS don't render.
- If input area is active then animation renders.
- If input area is inactive then animation does NOT render.
- If Call History SVG is clicked then Call History is opened.
- If Back SVG is clicked then the last value in the input area is erased.
- (Call History) If extension number is clicked then it dials extension number.
- If arrow SVG is clicked then it adds extension number to input area.
- If Hamburger Menu SVG is clicked then it displays call history for that number.
- If back arrow SVG is clicked then it displays main call history page.
- If '...' SVG is clicked then it renders a dropdown.
- If 'Clear History' is clicked then it clears history.
- If there are no calls then it renders 'No history calls'
