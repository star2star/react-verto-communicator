# Component Name:  AlertLog   #
# 1. Functional Description #

AlertLog is a simple list component displaying AlertLogItem components.

# 2. Visual Design #

 - Alert Log with Alerts:
![Alert Log](img/alertLog-full.png)

- Alert Log with No Alerts:
![Alert Log](img/alertLog-noData.png)

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
| onClick | call cbRemoveAlert() |

## d. Context-Aware Specification ##

This component is a pure component and it will maintain it’s own state.

# 4. Reference Components #

The component to be developed requires the following components:

- VertoBaseComponent
- AlertService
- AlertLogItem
- Modal

# 5. Unit Testing Requirement #
Tests for this component are located at:

        src/tests/alertLog-test.js
