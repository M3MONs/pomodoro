import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import ReactPlayer from "react-player";

const DEFAULT_URL = "https://www.youtube.com/watch?v=sF80I-TQiW0";

const YoutubePlayer = () => {
  const [videoUrl, setVideoUrl] = React.useState(DEFAULT_URL);
  const [videoUrlInput, setVideoUrlInput] = React.useState("");

  const handleVideoUrlChange = () => setVideoUrl(videoUrlInput);

  const handleVideoUrlInputChange = (url: string) => setVideoUrlInput(url);

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleVideoUrlChange();
  };

  return (
    <Card className="max-w-[450px] min-h-[320px] w-full">
      <CardContent>
        <div className="h-full mt-6">
          <ReactPlayer url={videoUrl} width={"100%"} height={"210px"} controls={true} />
        </div>
      </CardContent>
      <CardFooter>
        <Input
          onChange={(e) => handleVideoUrlInputChange(e.currentTarget.value)}
          onKeyDown={handleEnterPress}
        />
        <Button type="submit" onClick={handleVideoUrlChange}>
          Change
        </Button>
      </CardFooter>
    </Card>
  );
};

export default YoutubePlayer;
