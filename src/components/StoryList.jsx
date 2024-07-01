import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StoryCard from "./StoryCard";
import SearchBox from "./SearchBox";
import SkeletonLoader from "./SkeletonLoader";

const fetchTopStories = async () => {
  const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const storyIds = await res.json();
  const stories = await Promise.all(
    storyIds.slice(0, 100).map(async (id) => {
      const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      return storyRes.json();
    })
  );
  return stories;
};

const StoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: stories, error, isLoading } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
  });

  const filteredStories = stories?.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error loading stories</div>;
  }

  return (
    <div>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredStories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
};

export default StoryList;