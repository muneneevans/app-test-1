import * as actionTypes from './actionTypes';
import * as sharedServices from 'store/Shared/services';
import { getAuth, getAuthToken } from './selectors';
import {
  getSelectedProfile,
  getCredentials,
  getBackgroundLoginProcess,
  getUserDetails,
  getStoreTypesResults,
} from './selectors';
import { objectToCamelCase } from 'src/lib/utils';
import * as processTypes from 'store/Shared/processTypes';
import is from 'is_js';

//#region  log in user

export const login = (credentials) => {
  return (dispatch, getState) => {
    //Signal the start of the process
    dispatch({
      type: actionTypes.LOG_IN_REQUESTED,
    });

    //function to fetch from the api

    let url = '';
    url = sharedServices.API_ENDPOINT.concat('/authentication/login/');

    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        phone_number: credentials.phoneNumber,
        password: credentials.password,
      }),
    };

    return fetch(url, request)
      .then((response) => {
        if (response.status === 200) {
          //update Todays list of orders

          response.json().then((responseData) => {
            dispatch({
              type: actionTypes.LOG_IN_SUCCEEDED,

              payload: {
                _loginProcess: { status: processTypes.SUCCESS },
                credentials,
                userDetails: objectToCamelCase(responseData),
                auth: {
                  isUserAuthenticated: true,
                  token: responseData.token.access,
                  refreshToken: responseData.token.refresh,
                },
              },
            });
          });
        }

        //If response is unauthorized, login and try again
        else if (response.status === 400) {
          response.json().then((data) => {
            if (data.non_field_errors) {
              dispatch({
                type: actionTypes.LOG_IN_FAILED,

                payload: { error: 'Unable to log in with provided credentials' },
              });
            } else {
              dispatch({
                type: actionTypes.LOG_IN_FAILED,

                payload: { error: 'Unable to log in with provided credentials' },
              });
            }
          });
        } else {
          dispatch({
            type: actionTypes.LOG_IN_FAILED,
            payload: {
              error: 'An error occurred while logging in. Please retry',
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.LOG_IN_FAILED,
          payload: {
            error: 'An error occurred while logging in. Please retry',
          },
        });
      });
  };
};

export const resetLogin = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOG_IN_RESET,
    });
  };
};

//#endregion

//#region  background log in user

export const backgroundLogin = () => {
  return (dispatch, getState) => {
    //Signal the start of the process

    dispatch({
      type: actionTypes.BACKGROUND_LOG_IN_REQUESTED,
    });

    //function to fetch from the api
    const url = sharedServices.API_ENDPOINT.concat('/authentication/login/');
    const credentials = getCredentials(getState());
    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        phone_number: credentials.phoneNumber,
        password: credentials.password,
      }),
    };

    return fetch(url, request)
      .then((response) => {
        if (response.status === 200) {
          //update Todays list of orders

          return response.json().then((responseData) => {
            return Promise.resolve(
              dispatch({
                type: actionTypes.BACKGROUND_LOG_IN_SUCCEEDED,
                payload: {
                  _backgroundLoginProcess: {
                    status: processTypes.SUCCESS,
                    attempts: 0,
                  },
                  userDetails: objectToCamelCase(responseData),
                  auth: {
                    isUserAuthenticated: true,
                    token: responseData.token.access,
                    refreshToken: responseData.token.refresh,
                  },
                },
              }),
            ).then(() => {
              return true;
            });
          });
        }

        //If response is unauthorized, login and try again
        else if (response.status === 400) {
          return response.json().then((data) => {
            if (data.non_field_errors) {
              if (
                data.non_field_errors.contains(
                  'Unable to log in with provided credentials.',
                )
              ) {
                dispatch({
                  type: actionTypes.BACKGROUND_LOG_IN_SIGNOUT,
                });
              } else {
                dispatch({
                  type: actionTypes.BACKGROUND_LOG_IN_FAILED,
                  payload: { error: data.non_field_errors[0] },
                });
              }
              return false;
            } else {
              dispatch({
                type: actionTypes.BACKGROUND_LOG_IN_FAILED,
                payload: {
                  error: 'An error occurred while logging in. Please retry',
                },
              });
            }
          });
        } else {
          dispatch({
            type: actionTypes.BACKGROUND_LOG_IN_FAILED,
            payload: {
              error: 'An error occurred while logging in. Please retry',
            },
          });
          return false;
        }
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.BACKGROUND_LOG_IN_FAILED,
          payload: {
            error: 'An error occurred while logging in. Please retry',
          },
        });
      });
  };
};

export const resetBackgroundLogin = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.BACKGROUND_LOG_IN_RESET,
    });
  };
};

//#endregion

//#region log out
export const logout = () => {
  return (dispatch, getState) => {
    //Signal the start of the process
    dispatch({
      type: actionTypes.LOG_OUT_REQUESTED,
    });
    dispatch({
      type: actionTypes.LOG_OUT_SUCCEEDED,
    });
  };
};

export const resetLogout = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOG_OUT_RESET,
    });
  };
};
//#endregion

export const fetchStoreTypes = (page = 1) => {
  return (dispatch, getState) => {
    //Signal the start of the process

    if (page === 1) {
      dispatch({
        type: actionTypes.FETCH_STORE_TYPES_RESET_DATA,
        payload: {
          storeTypesResults: {
            currentPage: 0,
            completed: false,
            storeTypes: [],
          },
        },
      });
    }
    dispatch({
      type: actionTypes.FETCH_STORE_TYPES_REQUESTED,
      payload: {
        _fetchStoreTypesProcess: { status: processTypes.PROCESSING },
      },
    });

    //function to fetch from the api

    // TODO: update the endpoint
    const url = sharedServices.API_ENDPOINT.concat(
      `/catalog/shop-category/?page=${page}`,
    );

    let request = {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, request)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((responseData) => {
            dispatch({
              type: actionTypes.FETCH_STORE_TYPES_SUCCEEDED,

              payload: {
                _fetchStoreTypesProcess: { status: processTypes.SUCCESS },

                storeTypesResults: {
                  completed: is.null(responseData.next),
                  currentPage: page,
                  storeTypes: [
                    ...getStoreTypesResults(getState()).storeTypes,
                    ...objectToCamelCase(responseData.results),
                  ],
                },
              },
            });

            if (is.not.null(responseData.next)) {
              fetchStoreTypes(page + 1);
            }
          });
        }

        //If response is unauthorized, login and try again
        else if (response.status === 401) {
          Promise.resolve(dispatch(backgroundLogin())).then((response) => {
            response
              ? dispatch(fetchStoreTypes(page))
              : dispatch({
                type: actionTypes.FETCH_STORE_TYPES_FAILED,

                payload: {
                  _fetchStoreTypesProcess: {
                    status: processTypes.ERROR,
                    error: 'Unable to authenticate. Please log in',
                  },
                },
              });
          });
        } else {
          dispatch({
            type: actionTypes.FETCH_STORE_TYPES_FAILED,

            payload: {
              _fetchStoreTypesProcess: {
                status: processTypes.ERROR,
                error: 'An error occurred. Please retry',
              },
            },
          });
        }
      })

      .catch((error) => {
        dispatch({
          type: actionTypes.FETCH_STORE_TYPES_FAILED,
          payload: {
            _fetchStoreTypesProcess: {
              status: processTypes.ERROR,
              error: error.message,
            },
          },
        });
      });
  };
};

export const resetFetchStoreTypes = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_STORE_TYPES_RESET,
      payload: {
        _fetchStoreTypesProcess: { status: processTypes.IDLE },
      },
    });
  };
};

//#region sign up user
export const signUpUser = (userDetails) => {
  return (dispatch, getState) => {
    //Signal the start of the process

    dispatch({
      type: actionTypes.SIGN_UP_USER_REQUESTED,
      payload: {
        _signUpUserProcess: { status: processTypes.PROCESSING },
      },
    });

    //function to fetch from the api

    const url = sharedServices.API_ENDPOINT.concat(`/authentication/register/`);

    let request = {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        phone_number: `${userDetails.countryCode}${userDetails.phoneNumber}`,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        id_number: userDetails.IdNumber,
        password: userDetails.password,
      }),
    };

    fetch(url, request)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((responseData) => {

            dispatch({
              type: actionTypes.SIGN_UP_USER_SUCCEEDED,

              payload: {
                _signUpUserProcess: { status: processTypes.SUCCESS },
                userDetails: objectToCamelCase(responseData),
                credentials: {
                  phoneNumber: `${userDetails.countryCode}${userDetails.phoneNumber}`,
                  password: userDetails.password,
                },
                auth: {
                  isUserAuthenticated: true,
                  token: responseData.token.access,
                  refreshToken: responseData.token.refresh,
                },
              },
            });
          });
        }

        //If response is unauthorized, login and try again
        else if (response.status === 401) {
          Promise.resolve(dispatch(backgroundLogin())).then((response) => {
            response
              ? dispatch(signUpUser(userDetails))
              : dispatch({
                type: actionTypes.SIGN_UP_USER_FAILED,

                payload: {
                  _signUpUserProcess: {
                    status: processTypes.ERROR,
                    error: 'Unable to authenticate. Please log in',
                  },
                },
              });
          });
        } else {
          dispatch({
            type: actionTypes.SIGN_UP_USER_FAILED,

            payload: {
              _signUpUserProcess: {
                status: processTypes.ERROR,
                error: 'An error occurred. Please retry',
              },
            },
          });
        }
      })

      .catch((error) => {
        dispatch({
          type: actionTypes.SIGN_UP_USER_FAILED,

          payload: {
            _signUpUserProcess: {
              status: processTypes.ERROR,
              error: error.message,
            },
          },
        });
      });
  };
};

export const resetSignUpUser = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGN_UP_USER_RESET,
      payload: {
        _signUpUserProcess: { status: processTypes.IDLE },
      },
    });
  };
};
//#endregion

//#region sign up shop

export const signUpShop = (shopDetails) => {
  return (dispatch, getState) => {
    //Signal the start of the process

    dispatch({
      type: actionTypes.SIGN_UP_SHOP_REQUESTED,
      payload: {
        _signUpShopProcess: { status: processTypes.PROCESSING },
      },
    });

    //function to fetch from the api

    // TODO: update the endpoint
    const url = sharedServices.API_ENDPOINT.concat(`/catalog/shop/`);

    let form = new FormData();
    form.append('name', shopDetails.name);
    form.append('description', shopDetails.description);
    form.append('domain', shopDetails.domain);
    form.append('type', shopDetails.storeType);
    form.append('name', shopDetails.name);
    form.append('paybill_account_number', shopDetails.safaricom_shortcode)
    form.append('banner', {
      name: shopDetails.storeImage.name,
      type: shopDetails.storeImage.type,
      path: shopDetails.storeImage.path,
      uri: shopDetails.storeImage.uri,
    });
    form.append('logo', {
      name: shopDetails.logoImage.name,
      type: shopDetails.logoImage.type,
      path: shopDetails.logoImage.path,
      uri: shopDetails.logoImage.uri,
    });
    form.append('owner', getUserDetails(getState()).id);

    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${getAuthToken(getState())}`);

    let request = {
      method: 'POST',
      headers: myHeaders,
      body: form,
      redirect: 'follow',
    };

    fetch(url, request)
      .then((response) => {
        if (response.status === 201) {
          response.json().then((responseData) => {
            dispatch({
              type: actionTypes.SIGN_UP_SHOP_SUCCEEDED,

              payload: {
                _signUpShopProcess: { status: processTypes.SUCCESS },

                userDetails: {
                  ...getUserDetails(getState()),
                  shop: { ...objectToCamelCase(responseData) },
                },
              },
            });
          });
        }

        //If response is unauthorized, login and try again
        else if (response.status === 401) {
          Promise.resolve(dispatch(backgroundLogin())).then((response) => {
            response
              ? dispatch(signUpShop(shopDetails))
              : dispatch({
                type: actionTypes.SIGN_UP_SHOP_FAILED,

                payload: {
                  _signUpShopProcess: {
                    status: processTypes.ERROR,
                    error: 'Unable to authenticate. Please log in',
                  },
                },
              });
          });
        } else {
          dispatch({
            type: actionTypes.SIGN_UP_SHOP_FAILED,

            payload: {
              _signUpShopProcess: {
                status: processTypes.ERROR,
                error: 'An error occurred. Please retry',
              },
            },
          });
        }
      })

      .catch((error) => {
        dispatch({
          type: actionTypes.SIGN_UP_SHOP_FAILED,

          payload: {
            _signUpShopProcess: {
              status: processTypes.ERROR,
              error: error.message,
            },
          },
        });
      });
  };
};

export const resetSignUpShop = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGN_UP_SHOP_RESET,
      payload: {
        _signUpShopProcess: { status: processTypes.IDLE },
      },
    });
  };
};
//#endregion
