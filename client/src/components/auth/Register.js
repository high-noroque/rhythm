import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from "../../actions/auth";
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <Fragment>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">
                  Sign Up
                </h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Name"
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    name="name"
                  />
                  <TextFieldGroup
                    placeholder="Email Address"
                    type="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    name="email"
                    info="I'm desperately trying to develop a way for you to upload a photo"
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    name="password"
                  />
                  <TextFieldGroup
                    placeholder="Confirm Password"
                    type="password2"
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    name="password2"
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = {
  registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))