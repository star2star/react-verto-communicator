# Component Name:  CallHistory  #
# 1. Functional Description #

CallHistory renders a list containing information about previously made calls.

# 2. Visual Design #  

![CallHistory(Left), Dialpad(Right)](./img/callhistory.png)
![CallHistory(alt state)](./img/chaltstate.png)


# 3. Component Type #

This component will be a 'pure' component.


## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| history | history=[]  | A required prop that is an array. |
| compStyle |  NOTE styles are in JSX, not CSS <BR>{ inputWrapStyle: {backgroundColor: '#ddd'} inputStyle {fontSize: '1rem'} } | An optional property that customizes component style. |
| cbBack | cbBack={()=>{}}  | A required function. |
| cbShowCalls | cbShowCalls={()=>{}} | A required function. |
| cbClearHistory | cbClearHistory={()=>{}} | A required function.|
| cbClick | cbClick={()=>{}} | A required function. |
| cbCall | cbCall={()=>{}} | A required function. |
| allowToolTip | allowToolTip=false | A boolean that toggles the appearance of tooltip. By default it is false.|
| callerId | callerId="3500" | A string that represents an extension number.



## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c .Component Events ##

Event | Action(s)
------------ | -------------
'Clear History' Clicked | 1. callback function invoked. <br> 2. Event Dispatched<br>3. Component renders blank list.
'Back' clicked | callback function invoked. <br> 2. State is changed<br>3. New Screen Rendered
'Hamburger' Menu Clicked | 1. Callback function invoked <br> 2. State Change<br> 3. New Screen rendered
'ChatHistoryItem' clicked | 1. callback function invoked. <br>2. Event Dispatched. <br>

## d. Context-Aware Specification ##

The CallHistory component is NOT context-aware.

# 4. Reference Components #

- ReactIntl
- VertoBaseComponent
- CallHistoryItem
- moment.js
- react-motion
- svgIcons
- CallHistoryService

# 5. Unit Testing Requirement #

- displays a list of objects containing call history info.
- displays a list of timestamps when state is changed.
- displays an empty list when cbClearHistory is clicked.
- displays callerId in the header when state is changed.
- displays Call History in the header when state is normal.
- displays an arrow svg when state is changed.
- displays an x svg when state is default.
- displays a 'clear history' link when state is default.
- does not display a 'clear history' link when state is changed.
- cbBack is invoked when x svg is clicked.
- cbClearHistory is invoked when 'clear history' link is clicked.
- cbBack is invoked when arrow svg is clicked.
