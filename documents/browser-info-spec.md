# Component Name: BrowserInfo   #

# 1. Functional Description #

The BrowserInfo component renders a browser Icon, browser Link, browser Name, & browser Version.
The component also utilizes  accessibility props such as label,  and tabIndex. The component styles can be adjusted through the style prop. The component will render all elements in a flex column.

# 2. Star2Star Spore Component Project - SCP #

N/A for this project.

# 3. Visual Design #  

Images: TBA

# 4. Component Type #

This component will be a 'pure' component.  It will accept props for styling, the browser Icon, browser Link, browser Name, & browser Version. It also accepts accessibility props for label & tab index.

## a. Required Props ##

Prop Name | Sample | Description
------------ | -------------
browserIcon | svgIcon | Browser icon.<br>
browserLink | "http://..." | String. Required.<br>
browserName | {"id" : "bns.name", "defaultMessage" : "BrowserName"}, | An object. Required.<br>
browserVersion | {"id" : "bns.browserVersions","defaultMessage" : "Versions"}, | An object. Required.<br>
style | style={} | An object.<br>
ariaLabel | label="browser name" | A string.<br>
role | role="browser link" | A string.<br>
tabIndex | tabIndex={0} | A number.<br>

## b. Component State ##

This component will not maintain its own state. It will change as new prop values are passed into it from its parent.

## c .Component Events ##

None.

## d. Context-Aware Specification ##

This component is a pure component and it will not maintain it’s own state.

# 5. Reference Components #

The Browser component imports:

- VertoBaseComponent from vertobase.js<br>


# 6. Unit Testing Requirement #
- If browserIcon is provided it is rendered.<br>
- If browserIcon is NOT provided it is NOT rendered.<br>
- If browserLink is provided it is rendered.<br>
- If browserLink is NOT provided it is NOT rendered.<br>
- If browserName is provided it is rendered.<br>
- If browserName is NOT provided it is NOT rendered.<br>
- If browserVersion is provided it is rendered.<br>
- If browserVersion is NOT provided it is NOT rendered.<br>
- If style is provided it is rendered.<br>
- If tabIndex is provided it is rendered.<br>
- If tabIndex is NOT provided it is NOT rendered.<br>
- If ariaRole is provided, it is rendered.<br>
- If ariaRole is NOT provided, it is NOT rendered.<br>
- If label is provided, it is rendered.<br>
- If label is NOT provided, it is NOT rendered.<br>

A unit test suite must be developed as part of the component development process.  Unit tests must be provided to Star2Star and be runnable using 'npm test'.  Refer to the Star2Star Unit Testing standards document.  Test framework must use Jest/Jasmine, Enzyme and Sinon.

Refer to the following links:
* Jest: https://facebook.github.io/jest/docs/tutorial.html#content
* Jasmine 2.0: http://jasmine.github.io/2.0/introduction.html
* Enzyme: https://github.com/airbnb/enzyme
* Sinon: http://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/?utm_source=javascriptweekly&utm_medium=email
* http://sinonjs.org/docs/

# 7. Deliverables #

The following items must be delivered to Star2Star at the completion of the component development; full implementation of component meeting the requirements of this specification

  a. Complete and accurate README.md

  b. Unit tests must cover at least 80% branch coverage.  We require using Jest for unit testing with the __--verbose__ and __--coverage__ options set.

  c. Component must render correctly in demo.

  d. Must comply to Star2Star Component Specification Standards; which includes theming, accessibility, white labeling and internationalization

  e. All documented functional requirements must be met.
