import React, { Fragment } from 'react'
const Switcher = (props) => {
  return <Fragment>{props[props.value]}</Fragment>
}

export default Switcher
