"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import './SingleSlider.css';

interface SingleSliderProps {
  min: number; 
  max: number; 
  step: number; 
  onValueChange: (value: number) => void; 
  sublabel?: string;
}

const SingleSlider: React.FC<SingleSliderProps> = ({ min, max, step, onValueChange, sublabel }) => {
  const [value, setValue] = React.useState<number>(min);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const newValueNum = newValue as number;
    setValue(newValueNum);
    onValueChange(newValueNum);
  };

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
