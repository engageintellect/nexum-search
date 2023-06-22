"use client";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PocketBase from "pocketbase";
import Image from "next/image";
import path from "path";

// const searchHistory: string[] = [];

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({ text: "", link: "", source: "" });
  const [loading, setLoading] = useState(false);

  async function getPages() {
    try {
      const testing = await fetch("/api/getPages", {
        method: "GET",
      });

      const json = await testing.json();
      console.log("result: ", json);
    } catch (err) {
      console.log("err:", err);
    }
  }

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
    setResult({ text: "", link: "", source: "" });
    setLoading(true);

    try {
      const response = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(query),
      });

      const json = await response.json();
      setResult(json.data);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }

    // try {
    //   const pb = new PocketBase("https://45.56.88.245");
    //   const data = {
    //     query: query,
    //     result: result, // This line may need modification
    //   };

    //   const record = await pb.collection("searches").create(data);
    //   console.log("search records added to pocketbase...");
    // } catch (err) {
    //   console.log("err:", err);
    //   setLoading(false);
    // }
  }

  return (
    <div>
      <Nav />
      <div className="hero bg-gradient-to-b from-purple-900 to-slate-800 py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="text-6xl font-semibold text-white">
              Ne<span className="text-purple-500">x</span>um
            </div>
            <p className="py-6 text-white">
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

      <main className="min-h-screen flex flex-col items-center max-w-3xl mx-auto border border-primary rounded shadow-lg -my-10 p-2 sm:p-10 bg-base-100">
        <div className="mb-10">
          {loading && <ArrowPathIcon className="h-20 w-20 animate-spin" />}
          {result.text ? (
            <div>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full shadow-md">
                    <Image
                      src="https://github.com/engageintellect.png"
                      width={200}
                      height={200}
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Robot
                  {/* <time className="text-xs opacity-50">{new Date}</time> */}
                </div>
                <div className="chat-bubble p-4">
                  {result.text && <div>{result.text}</div>}
                </div>
                <div className="chat-footer opacity-50">
                  {result.link && (
                    <div>
                      <a
                        href={`http://localhost:5173/prjects/${path.basename(
                          result.link
                        )}`}
                        target="_blank"
                        className="text-primary"
                      >
                        {path.basename(result.link)}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-2 sm:p-10 text-sm">
                {result.source && (
                  <div className="border-primary p-4">
                    <span className="font-bold">Source:</span>
                    <div dangerouslySetInnerHTML={{ __html: result.source }} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* {searchHistory.length > 0 ? (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold">Search History</h2>
            <div className="flex flex-col gap-2">{JSON.stringify(result)}</div>
          </div>
        ) : (
          ""
        )} */}

        {/* consider removing this button from the UI once the embeddings are created ... */}

        <div className="flex gap-2">
          <button className="btn " onClick={createIndexAndEmbeddings}>
            Index Docs
          </button>

          <button className="btn " onClick={getPages}>
            Get Pages
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
