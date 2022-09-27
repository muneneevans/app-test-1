import {base, colorOptions, darkTheme, lightTheme} from './theme';
export const getTheme = (state) => state.configuration.theme;

export const getIsDarkTheme = ({configuration}) =>
  configuration.theme.PRIMARY_BACKGROUND_COLOR ===
  darkTheme.PRIMARY_BACKGROUND_COLOR;
