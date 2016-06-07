# Component Name: about #
# 1. Functional Description #

This component displays creates a single list item each time it is called. Each item represents one contributor to a given project. The information on the list items is: the person's name, their name, and their picture.

# 2. Visual Design #

![An example of several contributor list items ](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/contributors-img.png)

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##

| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| name | "Matt"| This prop is a string and is required. This string is a given contributor's name. |
| email | "mynameis@matt.com" | This prop is a string and is required. This string is a given contributor's email.  |
| avatar | "../../img/avatar/johnIcon.png" | This prop is a string and is required. This string the location of a contributor's avatar. |
| compStyle | compStyle = {} | This prop is an object and is not required. This object sets the style for this component |

## b. Component State ##

This is a 'pure' component.

## c. Context-Aware Specification ##

This component is a 'pure' component.

# 4. Reference Components #

* vertobase component

# 5. Unit Testing Requirement #

 Tests can be found in src/tests
