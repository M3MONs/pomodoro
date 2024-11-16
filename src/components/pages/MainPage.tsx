import Background from "@/components/atoms/Background/Background";
import PomodoroTimer from "@/components/molecules/PomodoroTimer/PomodoroTimer";
import YoutubePlayer from "../molecules/YoutubePlayer/YoutubePlayer";

const MainPage = () => {
  return (
    <>
      <Background />
      <div className="container mx-auto flex min-h-screen justify-evenly items-center flex-wrap">
        <PomodoroTimer />
        <YoutubePlayer />
      </div>
    </>
  );
};

export default MainPage;
