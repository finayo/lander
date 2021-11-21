import React from "react"
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import options from "./data"

const MultiSelectAll = ({sendDataToParent}) => {
  function onChange(value, event) {
    sendDataToParent(value);
    console.info(value);
  }
  return (<ReactMultiSelectCheckboxes options={options} onChange={onChange}/>)
}

export default MultiSelectAll;