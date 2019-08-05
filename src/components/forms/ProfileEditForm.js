/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../common/Input';
import checkValidity from '../../utils/checkValidity';
import updateObject from '../../utils/updateObject';
import {
  updateProfile,
  setUpdatable,
} from '../../redux/actions/profile.actions';

import '../../assets/scss/components/ProfileEditForm.scss';

export class ProfileEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUpdateForm: {
        firstName: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Bruce',
          },
          value: '',
          validation: {
            required: false,
            minLength: 3,
          },
          valid: true,
          errorMessage: '',
          touched: false,
        },
        lastName: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Wayne',
          },
          value: '',
          validation: {
            required: false,
            minLength: 3,
          },
          valid: true,
          errorMessage: '',
          touched: false,
        },
        username: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Batman',
          },
          value: '',
          validation: {
            required: false,
            minLength: 3,
          },
          valid: true,
          errorMessage: '',
          touched: false,
        },
        bio: {
          elementType: 'textarea',
          elementConfig: {
            placeholder: 'Billionaire by day, Human bat by night',
          },
          value: '',
          validation: {
            required: false,
          },
          valid: true,
          errorMessage: '',
          touched: false,
        },
        dateOfBirth: {
          elementType: 'input',
          elementConfig: {
            type: 'date',
          },
          value: '',
          validation: {
            required: false,
          },
          valid: true,
          errorMessage: '',
          touched: false,
        },
        gender: {
          elementType: 'select',
          elementConfig: {
            options: [
              { value: '', displayValue: 'Pick a gender' },
              { value: 'M', displayValue: 'Male' },
              { value: 'F', displayValue: 'Female' },
            ],
          },
          value: '',
          errorMessage: '',
          validation: {},
          valid: true,
        },
        avatar: {
          elementType: 'input',
          elementConfig: {
            type: 'file',
          },
          value: '',
          file: null,
          validation: {
            required: false,
          },
          valid: true,
          errorMessage: '',
          touched: false,
        },
        cover: {
          elementType: 'input',
          elementConfig: {
            type: 'file',
          },
          value: '',
          file: null,
          validation: {
            required: false,
          },
          valid: true,
          errorMessage: '',
          touched: false,
        },
      },
      formIsValid: false,
    };
  }

  handleInputChange = (e, inputId) => {
    const { profileUpdateForm } = this.state;
    const { isValid, errorMessage } = checkValidity(
      e.target.value,
      profileUpdateForm[inputId].validation,
    );
    let updatedFormElement;
    if (e.target.files) {
      updatedFormElement = updateObject(profileUpdateForm[inputId], {
        value: e.target.value,
        file: e.target.files[0],
        valid: isValid,
        errorMessage,
        touched: true,
      });
    } else {
      updatedFormElement = updateObject(profileUpdateForm[inputId], {
        value: e.target.value,
        valid: isValid,
        errorMessage,
        touched: true,
      });
    }
    const updatedOrderForm = updateObject(profileUpdateForm, {
      [inputId]: updatedFormElement,
    });

    let formIsValid = true;
    Object.keys(updatedOrderForm).forEach((inputIdt) => {
      formIsValid = updatedOrderForm[inputIdt].valid && formIsValid;
    });
    this.setState({ profileUpdateForm: updatedOrderForm, formIsValid });
  };

  updateHandler = async e => {
    e.preventDefault();
    const { profileUpdateForm } = this.state;
    const { userId, onUpdateProfile } = this.props;
    const formData = new FormData();
    Object.keys(profileUpdateForm).forEach((formElementId) => {
      switch (formElementId) {
        case 'avatar':
        case 'cover':
          if (profileUpdateForm[formElementId].value.length <= 0) {
            break;
          } else {
            formData.append(
              formElementId,
              profileUpdateForm[formElementId].file,
            );
            break;
          }
        default:
          if (profileUpdateForm[formElementId].value.length <= 0) {
            break;
          } else {
            formData.append(
              formElementId,
              profileUpdateForm[formElementId].value,
            );
          }
      }
    });
    onUpdateProfile(userId, formData);
  };

  updateProfilePath = () => {
    const { history, profile, onSetUpdatable } = this.props;
    history.replace(`/profile/${profile.user.username}`);
    onSetUpdatable();
  };

  render() {
    const { profileUpdateForm, formIsValid } = this.state;
    const { profile, match } = this.props;
    const formElements = [];
    Object.keys(profileUpdateForm).map((key) => {
      formElements.push({
        id: key,
        config: profileUpdateForm[key],
      });
      return formElements;
    });

    const form = formElements.map((formElement) => {
      const { config } = formElement;
      return (
        <Input
          key={formElement.id}
          formLabel={formElement.id}
          inputtype={config.elementType}
          elementConfig={config.elementConfig}
          value={config.value}
          file={config.file}
          invalid={!config.valid}
          errorMessage={config.errorMessage}
          touched={config.touched}
          shouldValidate={config.validation}
          changed={e => this.handleInputChange(e, formElement.id)}
        />
      );
    });

    if (
      profile.isDoneUpdating
      && match.params.username !== profile.user.username
    ) {
      this.updateProfilePath();
    }

    return (
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Edit your profile
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.updateHandler}>
                <div className="d-flex flex-column">
                  {form}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!formIsValid}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ profile }) => ({ profile });

export const mapDispatchToProps = dispatch => ({
  onUpdateProfile: (userId, data) => dispatch(updateProfile(userId, data)),
  onSetUpdatable: () => dispatch(setUpdatable()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileEditForm),
);
