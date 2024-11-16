import TimerRadioGroup from "@/components/atoms/TimerRadioGroup/TimerRadioGroup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { createClockInterval, formatTime } from "@/components/utils/clockUtils";
import { useEffect, useState } from "react";

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const PomodoroTimer = () => {
  const [clockObject, setClockObject] = useState({
    time: FOCUS_TIME,
    isRunning: false,
    sessionTime: FOCUS_TIME,
    breakTime: SHORT_BREAK_TIME,
    status: "Session",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (clockObject.isRunning) interval = createClockInterval(setClockObject);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [clockObject.isRunning]);

  const handleBreakTimeChange = (value: string) => {
    setClockObject({
      ...clockObject,
      breakTime: parseInt(value),
    });
  };

  const toggleClock = () => {
    setClockObject((prevClockObject) => ({
      ...prevClockObject,
      isRunning: !prevClockObject.isRunning,
    }));
  };

  const handleReset = () => {
    setClockObject({
      ...clockObject,
      time: FOCUS_TIME,
      isRunning: false,
      status: "Session",
    });
  };

  return (
    <Card
      className="max-w-[450px] md:min-h-[320px] w-full py-5"
      style={{ backgroundColor: "hsl(240deg 10% 3.9% / 70%)" }}
    >
      <CardContent>
        <h2 className="text-center text-3xl">{clockObject.status}</h2>
        <h1 className="text-center md:text-9xl text-7xl font-bold">
          {formatTime(clockObject.time)}
        </h1>
        <TimerRadioGroup
          shortBreakTime={SHORT_BREAK_TIME}
          longBreakTime={LONG_BREAK_TIME}
          handleValueChange={handleBreakTimeChange}
        />
      </CardContent>

      <CardFooter className="flex justify-evenly">
        <Button onClick={toggleClock}>
          {clockObject.isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </CardFooter>
    </Card>
  );
};

export default PomodoroTimer;
