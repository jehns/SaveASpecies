import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AllSpecies,
  SingleSpecies,
  SingleCategory,
  Login,
  SignUp,
  Checkout,
  UserHome,
  HomePage
} from './components'
import {me} from './store'
import {format} from 'url'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {isLoggedIn && (
          <Switch>
            <Route exact path="/user" component={UserHome} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/species" component={AllSpecies} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/:animalGroup" component={SingleCategory} />
            <Route
              exact
              path="/:animalGroup/:speciesName"
              component={SingleSpecies}
            />
          </Switch>
        )}
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/species" component={AllSpecies} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/:animalGroup" component={SingleCategory} />
        <Route
          exact
          path="/:animalGroup/:speciesName"
          component={SingleSpecies}
        />
        {/* Displays our Login component as a fallback */}
        {/* <Route component={AuthForm} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
