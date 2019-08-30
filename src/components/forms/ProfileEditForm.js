import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Input from '../common/Input';
import checkValidity from '../../utils/checkValidity';
import updateObject from '../../utils/updateObject';
import {
  initProfile,
  updateProfile,
  setUpdatable,
} from '../../redux/actions/profile.actions';

export class ProfileEditForm extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      profileUpdateForm: {
        firstName: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Bruce',
          },
          value: user.firstName,
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
          value: user.lastName,
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
          value: user.username,
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
          value: user.bio,
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
          value: moment(user.dateOfBirth).format('YYYY-MM-DD'),
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
          value: user.gender,
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
    this.dismissModal = React.createRef();
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

  updateHandler = async (e) => {
    e.preventDefault();
    const { profileUpdateForm } = this.state;
    const { user, onUpdateProfile } = this.props;
    const formData = new FormData();
    Object.keys(profileUpdateForm).forEach((formElementId) => {
      switch (formElementId) {
        case 'avatar':
        case 'cover':
          if (profileUpdateForm[formElementId].file) {
            formData.append(
              formElementId,
              profileUpdateForm[formElementId].file,
            );
          }
          break;
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
    onUpdateProfile(user.id, formData);
  };

  updateProfilePath = () => {
    const { history, profile, onInitProfile } = this.props;
    history.replace(`/profile/${profile.user.username}`);
    onInitProfile(profile.user.username);
  };

  render() {
    const { profileUpdateForm, formIsValid } = this.state;
    const { profile, onSetUpdatable } = this.props;
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

    if (profile.isDoneUpdating) {
      this.updateProfilePath();
      if (this.dismissModal.current) {
        this.dismissModal.current.click();
      }
      toast('Profile successfully updated!', { type: toast.TYPE.SUCCESS });
      onSetUpdatable();
    }

    return (
      <div className="edit-profile--container">
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
                      {profile.updating ? <i className="fas fa-spinner fa-2x fa-spin" /> : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={this.dismissModal}
                  id="submitProfile"
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
      </div>
    );
  }
}

export const mapStateToProps = ({ profile }) => ({ profile });

export const mapDispatchToProps = dispatch => ({
  onUpdateProfile: (userId, data) => dispatch(updateProfile(userId, data)),
  onSetUpdatable: () => dispatch(setUpdatable()),
  onInitProfile: username => dispatch(initProfile(username)),
});

ProfileEditForm.defaultProps = {
  user: {},
};

ProfileEditForm.propTypes = {
  profile: PropTypes.instanceOf(Object).isRequired,
  onInitProfile: PropTypes.instanceOf(Object).isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
  onSetUpdatable: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEditForm));
