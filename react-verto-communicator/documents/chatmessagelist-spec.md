# Component Name:  ChatMessageList   #
# 1. Functional Description #

This component creates the list list of all the chat messages. It also provides a user's messages with their chosen avatar image.

# 2. Visual Design #  

![A sample of a chat session](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/chatmessagelist-img.png)


# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##


| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| chatItems| chatItems = {} | This prop is an object and is not required. This prop contains the information for each message in the chat. |
| compStyle | compStyle = {} | This prop provides style for the the chat list. |
| chatUsers |  chatUsers = {} | This prop is an object and is not required. This object contains the names of all the users who are currently in a particular chat session |


## b. Component State ##

  This component will maintain it's own state for presentational purposes.

## c. Context-Aware Specification ##

  his component is NOT a context-aware component

# 4. Reference Components #

- vertobase
- chatmessageitem

# 6. Unit Testing Requirement #

tests can be found in src/tests
