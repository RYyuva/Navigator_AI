"use client";

import { API_URL } from "@/utils/config";
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

interface TMeta {
  title: string;
  description: string;
}

export default function Home() {
  const [ll, setLL] = useState<LatLngTuple>([13.08268, 80.270721]);
  const [formText, setFormText] = useState<string>("");
  const [meta, setMeta] = useState<TMeta>({ title: "", description: "" });

  return (
    <main className="flex h-screen w-full">
      {/* ============== MAP SECTION =========== */}
      <section className="bg-red-200 h-full w-full">
        <DynamicMap latlng={[ll, setLL]} />
      </section>

      {/* ============== CHAT SECTION =========== */}
      <section className="bg-green-200 h-full w-full max-w-sm flex flex-col p-3 py-10">
        <section className="h-0 flex-grow">
          <h1 className="text-5xl font-mono">
            {meta.title ? meta.title : "ASK QUESTION"}
          </h1>
          <h1 className="text-xl font-mono text-gray-500 pt-5">
            {meta.description && ""}
          </h1>
          <p className="text-md font-mono pt-3 ">
            {meta.description ? meta.description : ""}
          </p>
        </section>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const fetch_data = async () => {
              const response = await fetch(`${API_URL}/api/v1/get-location`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: formText }),
              });
              const data = await response.json();

              console.log(data);

              setLL(data.data.coordinate);
              setMeta({
                title: data.data.title,
                description: data.data.description,
              });
            };
            try {
              fetch_data();
            } catch (e) {}
          }}
          className=" flex w-full space-x-3"
        >
          <input
            onChange={(e) => setFormText(e.target.value)}
            className="h-10 w-0 flex-grow rounded-md p-2 font-mono border"
            value={formText}
            placeholder="How May I Help You? "
            type="text"
          />
          <button className="px-5 bg-green-600 text-white font-mono font-bold rounded-md hover:bg-green-500 hover:text-gray-100">
            ASK
          </button>
        </form>
      </section>
    </main>
  );
}
