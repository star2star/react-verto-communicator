# Component Name:  MemberList   #
# 1. Functional Description #

This component creates the list of member items.

# 2. Visual Design #  

![A visual example of MemberList](img/memberList-img.png)


# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##


| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| |  = {} | This prop is an object and is not required. This prop contains the information for each message in the chat. |
| compStyle | compStyle = {} | This prop provides style for the the chat list. |
|  |   = {} | This prop is an object and is not required. This object contains the names of all the users who are currently in a particular chat session |


## b. Component State ##

  This component will maintain it's own state for presentational purposes.

## c. Context-Aware Specification ##

  his component is NOT a context-aware component

# 4. Reference Components #

- VertoBaseComponent
- MemberIte

# 6. Unit Testing Requirement #

tests can be found in src/tests
