import React, { ReactNode, useState } from 'react'
import useOnclickOutside from "react-cool-onclickoutside";

type Props = {
  selectedValue: string;
  handleChange: (value: string) => void;
  options: string[];
  label: string;
  placeholder: ReactNode
}


const Selector = (props: Props) => {
  const [showOption, setShowOption] = useState(false);

  const ref = useOnclickOutside(() => {
    setShowOption(false)
  })

  return (
    <div className="selector_container">
      <label htmlFor="report-scammer-place">{props.label}</label>
      <div
        className="selector"
        onClick={() => setShowOption(!showOption)}
      >
        {
          props.selectedValue ? 
          <p>{ props.selectedValue }</p> : 
          <p className="placeholder">{ props.placeholder }</p> 
        }
      </div>
      <div className="selector_option" ref={ref}>
        {
          showOption && props.options.map((option, key) => (
            <div 
              key={key} 
              onClick={() =>  {
                props.handleChange(option)
                setShowOption(false)
              }}
            >
              {option}
            </div>
          ))
        }
      </div>
      {}
    </div>
  )
}

export default Selector