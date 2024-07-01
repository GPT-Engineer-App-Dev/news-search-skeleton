import StoryList from "../components/StoryList";

function Index() {
  return (
    <div>
      <h1 className="text-3xl text-center mb-4">Hacker News Top 100 Stories</h1>
      <StoryList />
    </div>
  );
}

export default Index;