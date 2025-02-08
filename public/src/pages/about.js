import Head from "next/head";
import Link from "next/link";

export default function About() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Head>
                <title>About</title>
            </Head>
            <h1 className="text-2xl font-bold mb-4">About Page</h1>
            <p className="text-gray-700 mb-4">
                This is the About page. More content coming soon!
            </p>
            <Link href="/" className="text-blue-500 hover:underline">
                ← Back to Home
            </Link>
        </div>
    );
}
