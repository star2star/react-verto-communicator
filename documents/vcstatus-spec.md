# Component Name:  vcstatus  #
# 1. Functional Description #
# 2. Visual Design #
# 3. Component type #
#### This component will be a 'pure' component. It will accept props for style, and for userStatus. ####
## a. Required Props ##
Prop Name | Type | Required | Sample
------------ | -------------
status | string | no | "Offline", “Logged-On”, “In-Call”
styles | object  | yes |  { svgStyle: {width: "25px", height: "25px"} }

## c. Context-Aware Specification ##
#### This component displays an svg and will toggle between one of four colors based on        the user’s status, a property passed from the appbar container.  ####
# 4. Reference Components #
# 5. Unit Testing Requirements #
# 6. Deliverables #
# 7. Acceptance Criteria #
