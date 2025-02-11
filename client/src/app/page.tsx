"use client";

import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  const [ll, setLL] = useState<LatLngTuple>([13.08268, 80.270721]);

  return (
    <main className="flex h-screen w-full">

      {/* ============== MAP SECTION =========== */}
      <section className="bg-red-200 h-full w-full">
        <DynamicMap latlng={[ll, setLL]} />
      </section>

      {/* ============== CHAT SECTION =========== */}
      <section className="bg-green-200 h-full w-full max-w-sm">
      </section>
    </main>
  );
}
