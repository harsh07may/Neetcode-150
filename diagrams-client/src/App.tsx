import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useState, useEffect } from "react";

function App() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiagram = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get URL parameter
        const params = new URLSearchParams(window.location.search);
        const diagramUrl = params.get("url");

        if (!diagramUrl) {
          throw new Error("No diagram URL provided. Use ?url=<github-raw-url>");
        }

        const response = await fetch(diagramUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch diagram: ${response.statusText}`);
        }

        const data = await response.json();
        setInitialData(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Error fetching diagram:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagram();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading diagram...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Error loading diagram
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
    );
  }

  return (
    <>
      <div className="w-full h-screen">
        {initialData && (
          <Excalidraw
            initialData={initialData}
            viewModeEnabled={true}
            zenModeEnabled={false}
          />
        )}
      </div>
    </>
  );
}

export default App;
