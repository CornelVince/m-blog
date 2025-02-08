import axios from "axios";
import Link from "next/link";
import { useState } from "react";

// Mock hashtags for simulation (Can be replaced with real data)
const mockHashtags = ["#AI", "#ML", "#marine", "#science", "#innovation", "#tech"];

export async function getStaticProps() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const postsWithHashtags = response.data.map((post) => ({
      ...post,
      hashtags: [
        mockHashtags[Math.floor(Math.random() * mockHashtags.length)],
        mockHashtags[Math.floor(Math.random() * mockHashtags.length)],
      ], // Assign two random hashtags per post
    }));
    return {
      props: {
        posts: postsWithHashtags,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default function Home({ posts }) {
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  // Toggle hashtags in filter
  const handleHashtagClick = (hashtag) => {
    setSelectedHashtags((prevSelected) =>
      prevSelected.includes(hashtag)
        ? prevSelected.filter((tag) => tag !== hashtag) // Remove hashtag if already selected
        : [...prevSelected, hashtag] // Add hashtag if not selected
    );
  };

  // Filter posts based on selected hashtags
  const filteredPosts =
    selectedHashtags.length > 0
      ? posts.filter((post) =>
        post.hashtags.some((tag) => selectedHashtags.includes(tag))
      )
      : posts;

  return (
    <div className="p-4">
      {/* Hashtag Filter Section */}
      <div className="flex flex-wrap gap-2 mb-4">
        {mockHashtags.map((hashtag, index) => (
          <button
            key={index}
            onClick={() => handleHashtagClick(hashtag)}
            className={`px-3 py-1 text-sm rounded-full border ${selectedHashtags.includes(hashtag) ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {hashtag}
          </button>
        ))}
      </div>

      {/* Display Filtered Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 overflow-hidden flex flex-col"
            >
              <Link href={`/post/${post.id}`}>
                <h2 className="text-lg font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-700 mt-2">{post.body.substring(0, 100)}...</p>
              <Link href={`/post/${post.id}`} className="text-blue-500 mt-4 inline-block">
                Read More
              </Link>
              <div className="mt-2 text-sm text-gray-500">
                {post.hashtags.map((hashtag, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleHashtagClick(hashtag)}
                    className="text-blue-400 cursor-pointer hover:underline mr-2"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No posts match the selected hashtags.</p>
        )}
      </div>
    </div>
  );
}
