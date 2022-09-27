import is from 'is_js';

//#region login
export const getLoginProcess = ({authentication}) =>
  authentication._loginProcess;
export const getAuth = ({authentication}) => authentication.auth;
export const getIsUserAuthenticated = ({authentication}) =>
  authentication.auth.isUserAuthenticated;
export const getAuthToken = ({authentication}) =>
  authentication.userDetails.token.access;

export const getHasShop = ({authentication}) =>
  is.existy(authentication.userDetails?.shop);

export const getShopDetails = ({authentication}) =>
  authentication.userDetails?.shop;

//#endregion

//#region background login
export const getBackgroundLoginProcess = ({authentication}) =>
  authentication._backgroundLoginProcess;
export const getCredentials = ({authentication}) => authentication.credentials;
//#endregion

//#region user details
export const getUserDetails = ({authentication}) => authentication.userDetails;
//#endregion

export const getFetchStoreTypesProcess = ({authentication}) =>
  authentication._fetchStoreTypesProcess;
export const getStoreTypesResults = ({authentication}) =>
  authentication.storeTypesResults;
export const getStoreTypesOptions = ({authentication}) => [
  {key: 'Pick an option', value: ''},
  ...authentication.storeTypesResults.storeTypes.map((item, index) => {
    return {
      key: item.name,
      value: String(item.id),
    };
  }),
];

export const getSignUpUserProcess = ({authentication}) =>
  authentication._signUpUserProcess;

export const getSignUpShopProcess = ({authentication}) =>
  authentication._signUpShopProcess;
