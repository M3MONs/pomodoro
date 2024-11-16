import Background from "@/components/atoms/Background/Background";
import PomodoroTimer from "@/components/molecules/PomodoroTimer/PomodoroTimer";

const MainPage = () => {
  return (
    <>
      <Background />
      <div className="container mx-auto flex min-h-screen justify-center items-center">
        <PomodoroTimer />
      </div>
    </>
  );
};

export default MainPage;
