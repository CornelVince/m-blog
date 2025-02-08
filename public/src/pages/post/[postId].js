import { useRouter } from 'next/router';
import axios from 'axios';

export async function getStaticPaths() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = response.data;
    const paths = posts.map((post) => ({
        params: { postId: post.id.toString() },
    }));

    return {
        paths,
        fallback: false, // or true/false depending on your requirements
    };
}

export async function getStaticProps({ params }) {
    const { postId } = params;
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        return {
            props: {
                post: response.data,
            },
        };
    } catch (error) {
        console.error("Error fetching post:", error);
        return {
            props: {
                post: null,
            },
        };
    }
}

export default function PostDetail({ post }) {
    if (!post) {
        return <p>Post not found.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
            <p className="text-gray-700 mt-4">{post.body}</p>
            <div className="mt-6 text-gray-500">
                <p><strong>Post ID:</strong> {post.id}</p>
                {/* couldn't find name of author in jsonplaceholder api, so I removed it */}
            </div>
        </div>
    );
}
