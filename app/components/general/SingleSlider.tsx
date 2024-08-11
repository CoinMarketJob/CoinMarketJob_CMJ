"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import './SingleSlider.css';
import { useEffect } from 'react';

interface SingleSliderProps {
  min: number; 
  max: number; 
  step: number; 
  onValueChange: (value: number) => void; 
  sublabel?: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const SingleSlider: React.FC<SingleSliderProps> = ({ min, max, step, onValueChange, sublabel, value, setValue }) => {

  const handleChange = (event: Event, newValue: number | number[]) => {
    const newValueNum = newValue as number;
    setValue(newValueNum);
    onValueChange(newValueNum);
  };

  useEffect(() => {
    console.log(value);
  },[value])

  return (
    <div className="single-slider-container">
      
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={step}
        className="custom-single-slider"
      />
    </div>
  );
}

export default SingleSlider;
