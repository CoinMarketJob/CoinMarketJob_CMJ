import React from 'react'
import styles from './EditProfileInput.module.css'

interface Props {
    label: string
    placeholder: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const EditProfileInput:React.FC<Props> = ({label, placeholder, value, setValue}) => {
  return (
    <div className={styles.InputGroup}>
      <div className={styles.InputLabel}>{label}</div>
      <input 
        className={styles.Input} 
        type="text" 
        placeholder={placeholder} 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
    </div>
  )
}

export default EditProfileInput
