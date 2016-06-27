# Component Name:  vidcontrolsadmin  #

# 1. Functional Description #

This component displays a set of controls to the moderator of a call. These controls get displayed underneath the video.

# 2. Visual Design #  

![A sample set of admin controls](https://raw.githubusercontent.com/star2star/react-verto-communicator/master/documents/img/admin-img%202.png)

# 3. Component Type #

This component will be a 'pure' component.

## a. Required Props ##


| Prop Name | Sample | Description |
| ------------ | ------------- | ------------- |
| currLayout | currLayout = [] | This prop is an array and is not required. This prop provides the communicator with information on how to position the different video windows. |
| layouts | layouts=[] | This prop is an array and is not required. This prop provides a list of all the possible video layouts. |
| cbPlay | function cbPlay = {...} | This prop is a callback function and is required. |
| cbStop |  function cbStop = {...} | This prop is a callback function and is required. |
| cbRecord | function cbRecord = {...} | This prop is a callback function and is required. |
| cbStopRecord | function cbStopRecord = {...} | This prop is a callback function and is required. |
| cbSnapshot | function cbSnapshot = {...} | This prop is a callback function and is required. |
| cbSetVideoMode | function cbSetVideoMode = {...} | This prop is a callback function and is required. |




## b. Component State ##

This component will maintain it's own state for presentational purposes.

## c .Component Events ##

| Event | Action(s) |
| ------------ | ------------- |
| video mode icon clicked | 1 .Invoke the callback function cbSetVideoMode() 2. Creates a menu where the admin can select what video layout to use for this call. |

## d. Context-Aware Specification ##

This component is NOT a context-aware component

# 5. Reference Components #

- vertobase
- controlItem
- tooltip
- ListSelect
- inputModal

# 6. Unit Testing Requirement #

Unit tests can be found in src/tests.
