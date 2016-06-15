# Component Name:  MemberItem  #
# 1. Functional Description #

This component creates the visual representation of a member item inside the communicator.

# 2. Visual Design #  

![A visual example of MemberList](img/memberItem-img.png)

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

- VertoBaseComponent
- AdminControls
- ControlItem
- SvgIcons

# 6. Unit Testing Requirement #

Tests can be found in src/tests.
