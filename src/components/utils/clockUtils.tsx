export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export function createClockInterval(
  setClockObject: React.Dispatch<
    React.SetStateAction<{
      time: number;
      breakTime: number;
      sessionTime: number;
      isRunning: boolean;
      status: string;
    }>
  >
): NodeJS.Timeout {
  return setInterval(() => {
    setClockObject((prevClockObject) => {
      document.title = `🍅${formatTime(prevClockObject.time - 1)} | Pomodoro`;
      if (prevClockObject.time === 0) {
        if (prevClockObject.status === "Session") {
          return {
            ...prevClockObject,
            time: prevClockObject.breakTime,
            status: "Break",
          };
        } else {
          return {
            ...prevClockObject,
            time: prevClockObject.sessionTime,
            status: "Session",
          };
        }
      }

      return {
        ...prevClockObject,
        time: prevClockObject.time - 1,
      };
    });
  }, 1000);
}
