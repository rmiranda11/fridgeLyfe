import React from "react"
import PropTypes from "prop-types"


function Checkboxes (props){

    return(
        <input
            type="checkbox" 
            className={"check-boxes"} 
            checked={props.item.checked} 
            onChange={() => props.handleChange(props.item.key)} 
        />
  );
  

    }

Checkboxes.propTypes = {
    checked: PropTypes.bool,
  }


export default Checkboxes