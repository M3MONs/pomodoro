import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

interface TimerRadioGroupProps {
  shortBreakTime: number;
  longBreakTime: number;
  handleValueChange: (value: string) => void;
}

const TimerRadioGroup: React.FC<TimerRadioGroupProps> = ({
  shortBreakTime,
  longBreakTime,
  handleValueChange
}) => {
  return (
    <RadioGroup defaultValue={shortBreakTime.toString()} onValueChange={handleValueChange}>
      <div className="flex justify-evenly mt-3">
        <div className="flex justify-center items-center gap-2">
          <RadioGroupItem
            value={shortBreakTime.toString()}
            id="short-break"
          ></RadioGroupItem>
          <Label htmlFor="short-break">Short Break</Label>
        </div>
        <div className="flex justify-center items-center gap-2">
          <RadioGroupItem
            value={longBreakTime.toString()}
            id="long-break"
          ></RadioGroupItem>
          <Label htmlFor="long-break">Long Break</Label>
        </div>
      </div>
    </RadioGroup>
  );
};

export default TimerRadioGroup;
