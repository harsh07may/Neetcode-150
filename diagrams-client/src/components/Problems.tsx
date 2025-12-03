import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import { useState, useEffect } from "react";

const GITHUB_API_BASE =
  "https://api.github.com/repos/harsh07may/Neetcode-150/contents";
const IGNORE_DIRECTORIES = ["diagrams-client", ".github", ".git", ".vscode"];

interface Problem {
  id: number;
  title: string;
  solutionUrl?: string;
  diagramUrl?: string;
}

interface GitHubContent {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
}

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function Problems() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the root directory to get all problem folders
        const response = await fetch(GITHUB_API_BASE);

        if (!response.ok) {
          throw new Error(`Failed to fetch problems: ${response.statusText}`);
        }

        const contents = await response.json();

        // Filter only directories and exclude common non-problem folders
        const problemDirs: GitHubContent[] = contents.filter(
          (item: GitHubContent) =>
            item.type === "dir" && !IGNORE_DIRECTORIES.includes(item.name)
        );

        // Create problem objects from directories
        const fetchedProblems: Problem[] = problemDirs.map(
          (dir, index: number) => ({
            id: index + 1,
            title: toTitleCase(dir.name),
            solutionUrl: `https://raw.githubusercontent.com/harsh07may/Neetcode-150/main/${dir.name}/main.cpp`,
            diagramUrl: `https://raw.githubusercontent.com/harsh07may/Neetcode-150/main/${dir.name}/diagram.excalidraw`,
          })
        );

        setProblems(fetchedProblems);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Error fetching problems:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading problems...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-white">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center max-w-md">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Error loading problems
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Neetcode 150
          </h1>
          <div className="mt-4 flex gap-6 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">
                {problems.length}
              </span>
              <span> Problems Solved</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">
                {Math.round((problems.length / 150) * 100)}%
              </span>
              <span> Complete</span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <Table className="border-0">
            <TableHeader className="bg-gray-50 border-b border-gray-200">
              <TableRow className="hover:bg-gray-50">
                <TableHead className="w-[60px] px-4 py-3 text-gray-700 font-semibold text-xs uppercase tracking-wide">
                  #
                </TableHead>
                <TableHead className="flex-1 px-4 py-3 text-gray-700 font-semibold text-xs uppercase tracking-wide">
                  Problem
                </TableHead>
                <TableHead className="w-[200px] px-4 py-3 text-gray-700 font-semibold text-xs uppercase tracking-wide text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((problem, index) => (
                <TableRow
                  key={problem.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <TableCell className="px-4 py-3 text-gray-500 font-medium text-sm">
                    {problem.id}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="text-gray-900 font-medium text-sm hover:text-blue-600">
                      {problem.title}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right space-x-2 flex justify-end gap-2">
                    {problem.solutionUrl && (
                      <Link
                        target="_blank"
                        to={problem.solutionUrl}
                        className="inline-block px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded border border-blue-200 transition-colors"
                      >
                        Code
                      </Link>
                    )}
                    {problem.diagramUrl && (
                      <Link
                        to={`/view?url=${encodeURIComponent(
                          problem.diagramUrl
                        )}`}
                        className="inline-block px-3 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-50 rounded border border-purple-200 transition-colors"
                      >
                        Diagram
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Problems;
