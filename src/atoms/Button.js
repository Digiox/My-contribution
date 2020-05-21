import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, ...props }) => (
    <button { ...props }>{ children }</button>
)

Button.prototype = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default Button