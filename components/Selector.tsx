import React, { useState } from 'react'

type Props = {
  selectedValue: string;
  handleChange: (value: string) => void;
  options: string[];
  label: string;
  placeholder: string
}

const Selector = (props: Props) => {
  const [showOption, setShowOption] = useState(false);

  return (
    <div className="selector_container" >
      <label htmlFor="report-scammer-place">{props.label}</label>
      <input
        id="report-scammer-place"
        value={props.selectedValue}
        placeholder={props.placeholder}
        onFocus={() => setShowOption(true)}
        readOnly={true}
      />
      <div className="selector_option">
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