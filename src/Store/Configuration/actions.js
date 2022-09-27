// TODO: uncomment if new file
import * as actionTypes from './actionTypes';
import is from 'is_js';
import {getTheme} from './selectors';
import {base, colorOptions, darkTheme, lightTheme} from './theme';

export const enableDarkTheme = () => {
  return (dispatch, getState) => {
    //Signal the start of the process

    console.log('switch to dark');
    dispatch({
      type: actionTypes.CHANGE_THEME_REQUESTED,
      payload: {
        theme: {
          ...getTheme(getState()),
          ...darkTheme,
        },
      },
    });
  };
};

export const disableDarkTheme = () => {
  return (dispatch, getState) => {
    //Signal the start of the process

    console.log('switch to dark');
    dispatch({
      type: actionTypes.CHANGE_THEME_REQUESTED,
      payload: {
        theme: {
          ...getTheme(getState()),
          ...lightTheme,
        },
      },
    });
  };
};
