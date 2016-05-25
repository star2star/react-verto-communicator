# Component Name:  < network-status-indicator \>   #
# 1. Functional Description #

The NetworkStatusIndicator component takes the required prop **conn**. The component takes evaluates the values of certain properties to determine which SVG and color to render for the Status icon. When the component is clicked the cbOpen function is invoked and toggles the **menuDisplayed** prop. The **cbMenuClick** is an optional function that is invoked on a menu item. The component uses the **locale** prop to determine the user's locale and handle content and styles accordingly. The component also utilizes multiple accessibility props such as **label**, **ariaRole**, **ariaLabel**, and **tabIndex**. The component styles can be adjusted through the **style** prop.


# 2. Star2Star Spore Component Project - SCP #

Star2Star will provide a spore (aka skeletal or seed) component project that can be used as a starting point for new component development.  To get started execute to below command in your new project area.

** curl -G https://npm-registry.star2star.com/star2star-spore-component-project
/-/star2star-spore-component-project-1.0.6.tgz -s -o s2s-spore.tgz **

Templates will consist of an archive (.zip) file with files needed to begin component development such as:
* package.json file - contains metadata about the component being developed, including a list of dependencies to install from npm when running npm install, as well as scripts for build and test, and configuration definitions.
* README.md file - contains documentation for the component being developed.  Refer to the Star2Star Programming Standards document.  
* tests folder - will contain unit test code once written.
* assets folder - will contain images and other materials needed for the component.
* src folder - contains the JavaScript and JSX implementing the component.  
* src/index.jsx - contains initial file definition for component.
* lib folder - contains the output from building the component as defined in the package.json file.

# 3. Visual Design #  

![notification-status-indicator icon](img/nsi-icon.png)<br><br>
![notification-status-indicator menu](img/nsi-menu.png)

# 4. Component Type #

This component will be a 'pure' component.  It will accept props for conn, cbOpen, cbMenuClick, style, menuDisplayed, locale,
label, ariaRole, ariaLabel, and tabIndex.

## a. Required Props ##


Prop Name | Sample | Description
------------ | -------------
conn | conn={} | Required. An object.
cbOpen | cbOben={()=>{}} | Required. A function.
cbMenuClick |   cbMenuClick={()=>{}}| A function.
style | style={} | An object.
menuDisplayed | menuDisplayed={true} | A boolean.
locale | locale="en-us" | A string.
label | label="open dropdown menu" | A string.
ariaRole | ariaRole="menuitem" | A string.
ariaLabel | ariaLabel="menu item" | A string.
tabIndex | tabIndex={0} | A number.

## b. Component State ##

This component will not maintain its own state.  It will change as new prop values are passed into it from its parent.

## c .Component Events ##

Event | Action(s)
------------ | -------------
network-status-indicator icon clicked | 1 . cbOpen is invoked.
menu item clicked | 1. cbMenuClick is invoked.


## d. Context-Aware Specification ##

This component is a pure component and it will not maintain it’s own state.

# 5. Reference Components #

The component to be developed requires the following components:

- svgIcons<br>
- baseComponent<br>
- ReactIntl<br>


# 6. Unit Testing Requirement #

- conn prop is provided.<br>
- Upon invocation, a callback function is fired.<br>
- If style is provided it is rendered.<br>
- If style is NOT provided it is NOT rendered.<br>
- If altText is provided it is rendered.<br>
- If altText is NOT provided it is NOT rendered.<br>
- If tabIndex is provided it is rendered.<br>
- If tabIndex is NOT provided it is NOT rendered.<br>
- If ariaRole is provided, it is rendered.<br>
- If ariaRole is NOT provided, it is NOT rendered.<br>
- If label is provided, it is rendered.<br>
- If label is NOT provided, it is NOT rendered.<br>
- If ariaLabel is provided, it is rendered.<br>
- If ariaLabel is NOT provided, it is NOT rendered.<br>
- If locale is provided, it is rendered.<br>
- If locale is NOT provided, it is NOT rendered.<br>
- If menuDisplayed is false, it is false.<br>
- If menuDisplayed is true, it is true.<br>
- If menuDisplayed is not provided, it is false.<br>
- Menu displays conn.upkpbs<br>
- Menu displays conn.downkpbs<br>
- Menu displays conn.videoResolution<br>
- Menu displays other properties of the conn object if specified.<br>


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
