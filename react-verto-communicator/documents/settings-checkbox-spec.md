e# Component Name:  SettingsCheckbox   #
# 1. Functional Description #

SettingsCheckbox is a simple checkbox component used in the Settings component.

# 2. Visual Design #

 - Settings Checkbox (checked):
![Settings Checkbox(checked)](img/settings-cbox-checked.png)

- Settings Checkbox (unchecked):
![Settings Checkbox(unchecked)](img/settings-cbox-unchecked.png)

# 3. Component Type #

This is a ‘pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| checkedOption: <br> name: React.PropTypes.string, value: React.PropTypes.bool |checkedOption={name:"useVideo", value:this.props.settings.useVideo} | An object. Required. Contains the data for a setting checkbox field.
| compStyle |  _NOTE styles are in JSX, not CSX_ { container: {display: 'flex', position: 'relative'},  inputStyle {fontSize: '1rem'} } | Optional prop. If value is provided, then it will render new styles, if not it will render default styling. |
| cbSubmitSetting | Function implemented and bound to a higher-order parent container of this component | Function. Required. This prop is invoked when a setting is changed by either selecting a menu item or checking a box. |


## b. Component State ##
This component will maintain it's own state for checkStatus.

## c .Component Events ##

| Event | Action(s) |
| ------------ | ------------- |
| onChange | call cbSubmitSetting() |

## d. Context-Aware Specification ##

This component is a pure component and it will maintain it’s own state.

# 4. Reference Components #

The component to be developed requires the following components:

- VertoBaseComponent
- svgIcons

# 5. Unit Testing Requirement #
Tests for this component are located at:

        src/tests/settingsMenuCheckbox-test.js
