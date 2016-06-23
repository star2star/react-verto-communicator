# Component Name:  AlertLog   #
# 1. Functional Description #

The AlertLog component is a modal displaying AlertLogItem components. The alerts can be cleared from the log by clicking on the **Clear Alerts** button.

# 2. Visual Design #

 - Alert Log with Alerts:
![Alert Log Showing Alerts](img/alertLog-full.png)

- Alert Log with No Alerts:
![Alert Log Showing No Alerts](img/alertLog-noData.png)

# 3. Component Type #

This is a ‘pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
|compStyle |  _NOTE styles are in JSX, not CSS_ { alertItemStyles : {display: 'flex',border: '1px solid #d1d1d1', backgroundColor: '#FFF'} } | Optional prop. If value is provided, then it will render new styles, if not it will render default styling. |

## b. Component State ##

## c .Component Events ##

| Event | Action(s) |
| ------------ | ------------- |
| 'Clear Alerts' button clicked | 1. Callback function invoked.<br>2. State Change.<br>3. All alerts are cleared from log. 'No Log Data' modal rendered. |
| 'RemoveIconSVG' clicked | 1. Callback function invoked.<br>2. State Change.<br>3. Specific alert is removed from alertArray. |

## d. Context-Aware Specification ##

This component is a pure component and it will maintain it’s own state.

# 4. Reference Components #

The component to be developed requires the following components:

- VertoBaseComponent
- ReactIntl
- AlertService
- AlertLogItem
- Modal

# 5. Unit Testing Requirement #
Tests for this component are located at:

        src/tests/alertLog-test.js
