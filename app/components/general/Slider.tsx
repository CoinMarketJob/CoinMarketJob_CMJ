"use client"
import * as React from 'react';
import Slider from '@mui/material/Slider';
import './Slider.css';

interface RangeSliderProps {
  min: number; 
  max: number; 
  step: number; 
  onRangeChange: (minValue: number, maxValue: number) => void; 
}

function valuetext(value: number) {
  return `${value}$`;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, onRangeChange }) => {
  const [value, setValue] = React.useState<number[]>([min, max]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const [newMin, newMax] = newValue as number[];
    setValue([newMin, newMax]);
    onRangeChange(newMin, newMax);
  };

  return (
    <div className="range-slider-container">
      <div className="value-labels">
        <span className="value-label1">${value[0]}</span>
        <span className="value-label2">${value[1]}</span>
      </div>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        step={step}
        className="custom-slider"
      />
    </div>
  );
}

export default RangeSlider;