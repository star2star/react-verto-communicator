# Component Name: vcstatus   #
# 1. Functional Description #

This component displays a status icon. The icon visually represents the status of the communicator,


# 2. Visual Design #  

![Component's output on the light theme when connecting](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/Status-Icon.png)


![Component's output on the default theme when connecting](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/vcstatus-conencting.png)

![Component's output on the default theme when disconnected](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/vcstatus-disconnected.png)

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##
| prop Name | sample | description |
| ------------ | ------------- | ------------ |
|status | "disconnected" | This prop is sent into the component as a string and is required. If this prop has a value of 'disconnected', 'connected', or 'connecting' the color of the status icon will change accordingly. If a a value other than those listed the component will use the color for disconnected. |
| compStyle |   compStyle = {} | This prop is an object and is not required. This object sets the height and width of the SVG status icon.|


## b. Component State ##

This is a 'pure' component.

## c. Context-Aware Specification ##

This component is a 'pure component'.

# 4. Reference Components #

* vertobase component
* svgicons component


# 5. Unit Testing Requirement #

 Tests can be found in src/tests.
