# Component Name:  < vcstatus \>   #
# 1. Functional Description #

This component displays a status icon. The icon visually represents the status if the communicator,


# 2. Visual Design #  

![Component's output on the light theme when connecting](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/Status-Icon.png)


![Component's output on the default theme when connecting](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/vcstatus-conencting.png)

![Component's output on the default theme when disconnected](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/vcstatus-disconnected.png)

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##
| prop Name | sample | description |
------------ | -------------
|status | "disconnected" | This prop is sent into the component as a string and is required. The component receives this prop from the appbar. If this prop has a value of 'disconnected', 'connected', or 'connecting' the color of the status icon will change accordingly.|
| Style |   Style = {} | This prop is an object and is not required. This object sets the height and width of the SVG status icon.|


## b. Component State ##

This is a 'pure' component.

## c. Context-Aware Specification ##

This component is a 'pure component' and will maintain its' own state.

# 4. Reference Components #

* vertobase component
* svgicons component


# 5. Unit Testing Requirement #

(ALL THIS WILL CHANGE)

* The status prop gets passed to the component. <br>
* If style is provided the SVG renders.<br>
* If style is NOT provided the SVG does not render.<br>
* The status prop is passed into the statement. <br>
* If the status is set to either 'connected', 'disconnected', or 'connecting' the fill color will be set appropriately. <br>
* If the status is none of those values it will default to the fill color for 'disconnected'.
* The SVG with the appropriate fill color will be displayed.


A unit test suite must be developed as part of the component development process.  Unit tests must be provided and be runnable using 'npm test'.  Test framework must use Jest/Jasmine, Enzyme and Sinon.

Refer to the following links:
* Jest: https://facebook.github.io/jest/docs/tutorial.html#content
* Jasmine 2.0: http://jasmine.github.io/2.0/introduction.html
* Enzyme: https://github.com/airbnb/enzyme
* Sinon: http://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/?utm_source=javascriptweekly&utm_medium=email
* http://sinonjs.org/docs/
