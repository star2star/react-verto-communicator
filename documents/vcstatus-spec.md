# Component Name:  < vcstatus \>   #
# 1. Functional Description #

 When the component is rendered the __status__ prop is passed to it as a string; that string goes through a switch statement to determine what color to use for status icon. An example of this being the icon filling in green when a user is in a call; assuming that they are on the default theme. If the status can not be found the color defaults to fill color for disconnected. This component is styled through the __Style__ prop.   


# 2. Visual Design #  

![Component's output on the light theme when connecting](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/Status-Icon.png)


![Component's output on the default theme when connecting](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/vcstatus-conencting.png)

![Component's output on the default theme when disconnected](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/vcstatus-disconnected.png)

# 3. Component Type #

This component will be a 'pure' component.



## a. Required Props ##
prop Name | sample | description
------------ | -------------
status | "Offline", “Logged-On”, “In-Call” | This prop is sent into the component as a string and is required. The component receives this prop from the appbar. This prop is used to determine what color to fill the vcstatus svg.
styles |   Style = {} | This prop is an object and is not required. This object sets the height and width of the SVG status icon.


## b. Component State ##

This component will maintain its own state.  It will change as new prop values are passed into it from its parent.

## c. Context-Aware Specification ##

This component is a 'pure component' and will maintain its' own state.

# 4. Reference Components #

* This component requires the vertobase component.
* This component requires the svgicons component.


# 5. Unit Testing Requirement #

* The status prop gets passed to the component. <br>
* If style is provided the SVG renders.<br>
* If style is NOT provided the SVG does not render.<br>
* The status prop is passed into the statement. <br>
* If the status is set to either 'connected', 'disconnected', or 'connecting' the fill color will be set appropriately. <br>
* If the status is none of those values it will default to the fill color for 'disconnected'.
* The SVG with the appropriate fill color will be displayed.


A unit test suite must be developed as part of the component development process.  Unit tests must be provided to Star2Star and be runnable using 'npm test'.  Refer to the Star2Star Unit Testing standards document.  Test framework must use Jest/Jasmine, Enzyme and Sinon.

Refer to the following links:
* Jest: https://facebook.github.io/jest/docs/tutorial.html#content
* Jasmine 2.0: http://jasmine.github.io/2.0/introduction.html
* Enzyme: https://github.com/airbnb/enzyme
* Sinon: http://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/?utm_source=javascriptweekly&utm_medium=email
* http://sinonjs.org/docs/


# 6. Acceptance Criteria #

a. All unit tests must pass.

b. Unit tests must cover at least 80% branch coverage.  We require using Jest for unit testing with the __--verbose__ and __--coverage__ options set.

c. Component must render correctly in demo.

d. Must comply to Star2Star Component Specification Standards; which includes theming, accessibility, white labeling and internationalization

e. All documented functional requirements must be met.
