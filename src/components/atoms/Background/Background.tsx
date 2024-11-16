import background from "@/assets/background.jpg";

const Background = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen blur-sm bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }} />
  );
};

export default Background;
