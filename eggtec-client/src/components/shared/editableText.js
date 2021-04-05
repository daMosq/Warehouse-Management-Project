import React, { useState, useEffect } from 'react';

const EditableText = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const onDoubleClick = () => {
    setIsEditing(true)
    console.log('Edit')
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false)
      //alert('Enter')
      
      props.onInputChange(event)
    }
  }
  const [value, setValue] = useState(props.children)
  
  useEffect(() => {
    setValue(props.children)
    
  }, [props.children])
  const onChange = (event) => {
    setValue(event.target.value)

  }

  return (
    <td>
      {!isEditing ? (
        <p
          onDoubleClick={onDoubleClick}
        >{value}</p>
      ) : (
        <input
          type='text'
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
      )
      }
    </td>
  )

}

export default EditableText;