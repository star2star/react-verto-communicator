# Component Name:  AppBar   #
# 1. Functional Description #

  The appbar component is a composite component made up of several simpler components.  This is a 'smart' component (container) that will have access to a data store using action-creators and reducers (redux).  Content of the AppBar component are the App Title (default is 'Verto Communicator'), a network status indicator including a drop down with details, a status indicator that visually shows connection status (only visible after initial connection made), last number called, settings UI toggle (only visible when logged in), user menu with dropdown menu, chat/members toggle (only visible when connected), and an About/Help menu with drop

# 2. Visual Design #  

Sample:

![A breakdown of how this component looks](img/verto-appbar.png)

# 3. Component Type #

This is a 'context-aware' component and will maintain state in the store 'app'.

## a. Required Props ##

This component takes no props.

## b. Component State ##
The state is maintained in the store 'app' and is updated by dispatching action-creators and updating state via appropriate reducers.  The component is subscribe to the store and will re-render appropriately when relevant data in the store is updated.


## c .Component Events ##
This component does not have any events, however its imported components may and they are documented in their respective specifications.

# 5. Reference Components #
  * vcstatus
  * vertobasecomponent
  * nsIndicator
  * userMenu
  * tagMenu
  * menuItem
  * settings
  * app
  * about
  * contributors
