# Component Name:  Checkbox   #

# 1. Functional Description #

The Checkbox component displays either an empty box or a box with a checkmark.

# 3. Visual Design #  

Currently not available.

# 4. Component Type #

This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| compStyle | compStyle={} | compStyle is an optional prop that allows user to override default styles.  |
| defaultCheck | defaultCheck=false  | defaultCheck is an optional prop. If true, the component will render a checkbox with a check inside on load. If false, it will render an empty box. By default, it is set to false |

## b. Component State ##

This component will maintain it's own state for presentational purposes

## c .Component Events ##

Event | Action(s)
------------ | -------------
Enter/Return key pressed | 1 .Invoke the callback function cbSubmit() with the current value of the input control as an argument. <br> 2. Clear the input control so that placeholder text is displayed </br>  3. Keep focus on input control
Clicked | 1. Invoke a callback function.


## d. Context-Aware Specification ##

This component is NOT a context aware component.

# 5. Reference Components #

- React Motion
- svg
- VertoBaseComponent


# 6. Unit Testing Requirement #

- If not clicked width of blank div is 100%.
- If clicked it changes width of blank div to zero.
- If defaultChecked true blank div is 0%.
- If defaultChecked is true and is clicked width of blank div is 100%
- It fires a callback function.
