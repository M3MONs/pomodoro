import Background from "@/components/atoms/Background/Background";
import PomodoroTimer from "@/components/molecules/PomodoroTimer/PomodoroTimer";
import YoutubePlayer from "../molecules/YoutubePlayer/YoutubePlayer";
import ToDoList from "../organisms/ToDoList/ToDoList";

const MainPage = () => {
  return (
    <>
      <Background />
      <div className="container mx-auto flex min-h-screen max-h-screen lg:justify-between items-center flex-wrap max-w-[1200px] justify-around gap-5 lg:gap-0">
        <PomodoroTimer />
        <YoutubePlayer />
        <div className="flex mx-3 justify-center min-h-[500px] w-full lg:mx-auto">
          <ToDoList />
        </div>
      </div>
    </>
  );
};

export default MainPage;
