# Component Name: BrowserInfo #

# 1. Functional Description #

The BrowserInfo component is a basic component with accessibility features. The component renders a **browserData** object which contains the browser Icon, Name of the browser, Link to download said browser in a new window, & the compatible Versions accepted. The component styles can be adjusted through the **compStyle** prop.

# 2. Visual Design #  

  Images: TBA

# 3. Component Type #

  This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
|------------ | -------------- | ------------|
|browserData | browserData={<br>icon: ChromeBrowserIconSVG,<br> link:"https://www.google.com/chrome/browser/desktop/",<br> name: "Chrome",<br> versions: "All"<br>} |An object. Required. Contains browser info |
|compStyle | compStyle={} | An object|

## b. Component State ##

  This component is a pure component and it will not maintain it’s own state.

## c. Component Events ##

  None.

## d. Context-Aware Specification ##

This component is a pure component and it will not maintain it’s own state.

# 4. Reference Components #

  - VertoBaseComponent

# 5. Unit Testing #

 src/tests/browserInfo-test.js
