"use client";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    <div>
      <Nav />
      <div className="hero bg-base-200 py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="text-6xl font-semibold">
              Ne<span className="text-purple-500">x</span>um
            </div>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi.
            </p>
            <div className="flex gap-2 w-full">
              <input
                className="input border-primary w-full"
                placeholder="search for anything..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-primary" onClick={sendQuery}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center"></div>

      <main className="min-h-screen flex flex-col items-center max-w-3xl mx-auto border rounded shadow-md -my-10 p-10 bg-base-100">
        <div className="mb-10">
          {loading && <ArrowPathIcon className="h-10 w-10 animate-spin" />}
          {result ? (
            <div className="">
              <div className="">{result && <p>{result}</p>}</div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* consider removing this button from the UI once the embeddings are created ... */}
        <button className="btn btn-info" onClick={createIndexAndEmbeddings}>
          Create index and embeddings
        </button>
      </main>
      <Footer />
    </div>
  );
}
