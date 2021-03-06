import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {getSingleSpecies} from '../store/species'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  CardMedia,
  withStyles,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl
} from '@material-ui/core'
import PropTypes from 'prop-types'
import {default as AddToCart} from './AddToCart'

const styles = theme => ({
  card: {
    display: 'flex'
  },
  mainGrid: {
    paddingTop: theme.spacing.unit * 10
  },
  needPadding: {
    paddingLeft: theme.spacing.unit * 30,
    paddingRight: theme.spacing.unit * 30
  },
  text: {
    fontSize: 17
  },
  button: {
    margin: theme.spacing.unit
  },
  speciesText: {
    paddingBottom: theme.spacing.unit * 5,
    fontWeight: 'bold'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
})

class SingleSpecies extends Component {
  constructor() {
    super()
    this.state = {
      quantity: '',
      labelWidth: 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  componentDidMount() {
    // this.setState({
    //   labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    // })
    const speciesId = this.props.match.params.speciesName
    this.props.fetchSingleSpecies(speciesId)
  }

  render() {
    const indSpecies = this.props.singleSpecies[0]
    const {classes} = this.props
    return (
      <Grid container justify="center" className={classes.mainGrid}>
        <Grid item>
          <Typography
            variant="h4"
            color="inherit"
            className={classes.speciesText}
          >
            {indSpecies.name}
          </Typography>
        </Grid>
        <Grid item className={classes.needPadding}>
          <Card className={classes.card}>
            <img src={`/${indSpecies.ImageUrl}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {indSpecies.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
              >{`$${indSpecies.currentPrice / 100}`}</Typography>
              <Typography className={classes.text} component="p">
                {indSpecies.description}
              </Typography>
              <CardActions>
                <Grid container spacing={0} justify="space-between">
                  <Grid item>
                    <AddToCart animal={indSpecies} />
                  </Grid>
                </Grid>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

SingleSpecies.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => ({
  singleSpecies: state.species.singleSpecies
})

const mapDispatch = dispatch => ({
  fetchSingleSpecies: speciesId => dispatch(getSingleSpecies(speciesId))
})

const ConnectedSingleSpecies = withRouter(
  connect(mapState, mapDispatch)(SingleSpecies)
)

export default withStyles(styles)(ConnectedSingleSpecies)
