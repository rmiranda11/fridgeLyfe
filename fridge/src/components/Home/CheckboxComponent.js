import React from "react"
import PropTypes from "prop-types"
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function Checkboxes (props){

    return(
        <input
            type="checkbox" 
            className={"check-boxes"} 
            // name={props.name} 
            // value={props.value} 
            checked={props.item.checked} 
            onChange={() => props.handleChange(props.item.key)} 
        />
  );
  

    }

Checkboxes.propTypes = {
    // type: PropTypes.string,
    // name: PropTypes.string.isRequired,
    // value:PropTypes.number.isRequired,
    checked: PropTypes.bool,
  }


export default Checkboxes