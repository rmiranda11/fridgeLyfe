import React from "react"
import PropTypes from "prop-types"

function Checkbox (props){

    return(
        <input 
            type="checkbox" 
            // className={props.className} 
            // name={props.name} 
            // value={props.value} 
            checked={props.item.checked} 
            onChange={() => props.handleChange(props.item.key)} 
        />
  );
  

    }

Checkbox.propTypes = {
    // type: PropTypes.string,
    // name: PropTypes.string.isRequired,
    // value:PropTypes.number.isRequired,
    checked: PropTypes.bool,
  }


export default Checkbox