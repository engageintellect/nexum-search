"use client";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch("/api/setup", {
        method: "POST",
      });
      const json = await result.json();
      console.log("result: ", json);
    } catch (err) {
      console.log("err:", err);
    }
  }
  async function sendQuery() {
    if (!query) return;
    setResult("");
    setLoading(true);
    try {
      const result = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(query),
      });
      const json = await result.json();
      setResult(json.data);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  }
  return (
    <main className="flex flex-col items-center justify-between p-24 max-w-5xl mx-auto">
      <div className="flex gap-2">
        <input
          className="input border-primary w-full"
          placeholder="search for anything..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={sendQuery}>
          Submit
        </button>
      </div>

      <div className="my-10">
        {loading && <ArrowPathIcon className="h-10 w-10 animate-spin" />}
        {result && <p>{result}</p>}
      </div>

      {/* consider removing this button from the UI once the embeddings are created ... */}
      <button className="btn btn-outline" onClick={createIndexAndEmbeddings}>
        Create index and embeddings
      </button>
    </main>
  );
}
