import React from 'react';
import PropTypes from "prop-types"

const Img = ({src, alt}) => {
    return ( <img src={src} alt={alt} /> );
}

Img.prototype = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}
 
export default Img;