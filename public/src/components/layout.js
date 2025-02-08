import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
    const router = useRouter();
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-700 mb-8 py-4 text-white">
                <nav className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8">
                    <div>
                        My Blog
                    </div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className={`text-lg font-bold ${router.pathname === "/" ? "text-blue-400" : "text-white"}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`text-lg font-bold ${router.pathname === "/about" ? "text-blue-400" : "text-white"}`}>
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="container mx-auto flex-1 px-4 md:px-6 lg:px-8">{children}</main>
            <footer className="bg-gray-800 py-4 text-white text-center">
                <div className="container mx-auto">
                    &copy; {currentYear} Cornelius - All Rights Reserved
                </div>
            </footer>
        </div>
    );
}