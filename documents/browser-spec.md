# Component Name:  < Browser\>   #

# 1. Functional Description #

This component will appear under the App Bar when/if the user's browser is not compatible with
the Verto Communicator. It uses the BrowserInfo and (possibly a version of the BrowserVideoHeader). It uses four instances of the BrowserInfo component to display vertically the browser Icon, browser Link, browser Name, & browser Version - (WhiteLabel?).
All displayed text uses the FormattedMessage convention for react-itnl. The messages are in the browser.json file located in the 'messages' folder. This component will utilize the established theming convention for this project (light, dark, & default) as needed. Styles can be overridden through the style prop.

# 2. Star2Star Spore Component Project - SCP #

 N/A

# 3. Visual Design #  

Images: TBA

# 4. Component Type #

This component will be a 'pure' component.  It will accept props for styling and the of the communicator.

## a. Required Props ##

The Browser component does not have any required props.

## b. Component State ##
The Browser component does not maintain its own state.

## c .Component Events ##
(REMOVE WHEN DONE)

If the component needs to react to events (clicks, key presses, etc.) then those events should be listed here along with the action that should be taken:

Sample:

Event | Action(s)
------------ | -------------
Enter/Return key pressed | 1 .Invoke the callback function cbSubmit() with the current value of the input control as an argument. <br> 2. Clear the input control so that placeholder text is displayed </br>  3. Keep focus on input control

(REMOVE)

## d. Context-Aware Specification ##

Not Context-Aware.

# 5. Reference Components #

The Browser component imports:
- svgIcons from svgIcons.js<br>
- VertoBaseComponent from vertobase.js<br>
- FormattedMessage from ReactIntl<br>
- BrowserInfo from browserInfo.js<br>

# 6. Unit Testing Requirement #

(REMOVE WHEN DONE)

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
