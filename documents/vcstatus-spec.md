# Component Name:  < component name \>   #
# 1. Functional Description #
(REMOVE WHEN DONE)

 Write a brief description of what this component will do, how it is intended to be used, etc.  This description should give the reader a high level idea of what the component development requirements are.

 Sample:
*This component will be a text input control that will invoke a callback function when the enter/return key is pressed by the user.  When the enter key is pressed, the input field will be cleared and will retain focus.  The input must be contained in div that has rounded corners at the bottom and square corners at the top so it can be aligned with another component.  Default styling should include font-size, line-height, color, border-radius, margin and padding for the input, and for the container, background-color, border, and border-radius.  The default styles should be overridable via props in part or in their entirety.  Placeholder text value is passed in using props.*

  (REMOVE)

# 2. Visual Design #  

(REMOVE WHEN DONE)

Images with callouts for size, colors, etc. and/or reference to a document containing the visual design specification for the component.  Extract from design documentation and paste here.

Sample:

![A breakdown of how this component looks](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/Template-Image.png)

(REMOVE)

# 3. Component Type #

This component will be a 'pure' component.  It will accept props for styling and the status of the communicator.




## a. Required Props ##
rop Name | Sample | description
------------ | -------------
status | "Offline", “Logged-On”, “In-Call” | This prop is sent into the component as a string and is required. The component receives this prop from the appbar. This prop is used to determine what color to fill the vcstatus svg.
styles |  { svgStyle: {width: "25px", height: "25px"} } | This prop is an object and is not required. This object sets the height and width of the SVG status icon.


## b. Component State ##

This component will not maintain its own state.  It will change as new prop values are passed into it from its parent.

# 4. Reference Components #

* This component requires the vertobase component.


# 5. Unit Testing Requirement #

(REMOVE WHEN DONE)

If the software engineer want to require specific unit tests be conducted on the component, they should be listed here.  Otherwise the component developer is free to develop the unit test suite on his own.

(REMOVE)

A unit test suite must be developed as part of the component development process.  Unit tests must be provided to Star2Star and be runnable using 'npm test'.  Refer to the Star2Star Unit Testing standards document.  Test framework must use Jest/Jasmine, Enzyme and Sinon.

Refer to the following links:
* Jest: https://facebook.github.io/jest/docs/tutorial.html#content
* Jasmine 2.0: http://jasmine.github.io/2.0/introduction.html
* Enzyme: https://github.com/airbnb/enzyme
* Sinon: http://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/?utm_source=javascriptweekly&utm_medium=email
* http://sinonjs.org/docs/

# 6. Deliverables #

The following items must be delivered to Star2Star at the completion of the component development; full implementation of component meeting the requirements of this specification

  a. Complete and accurate README.md

  b. Unit tests must cover at least 80% branch coverage.  We require using Jest for unit testing with the __--verbose__ and __--coverage__ options set.

  c. Component must render correctly in demo.

  d. Must comply to Star2Star Component Specification Standards; which includes theming, accessibility, white labeling and internationalization

  e. All documented functional requirements must be met.
