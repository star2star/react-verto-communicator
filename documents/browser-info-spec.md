# Component Name: BrowserInfo #

# 1. Functional Description #

The BrowserInfo component renders a browserData object which displays a browser Icon, browser Link, browser Name, & browser Version. The component styles can be adjusted through the ** Style ** prop. The component will render all elements in a flex column.

# 2. Visual Design #  

  Images: TBA

# 3. Component Type #

  This component will be a 'pure' component.

## a. Required Props ##

|Prop Name | Sample | Description|
|------------ | ------------ | ------------|
|browserIcon | svgIcon | Browser icon|
|browserLink | "http://..." | String. Required|
|browserName | {"id" : "bns.name", "defaultMessage" : "BrowserName"}, | An object. Required|
|browserVersion | {"id" : "bns.browserVersions","defaultMessage" : "Versions"}, | An object Required|
|Style | style={} | An object|

## b. Component State ##

This component will not maintain its own state. It will change as new prop values are passed into it from its parent.

## c. Component Events ##

None.

## d. Context-Aware Specification ##

This component is a pure component and it will not maintain it’s own state.

# 4. Reference Components #

The Browser component imports:

- VertoBaseComponent
- React intl
