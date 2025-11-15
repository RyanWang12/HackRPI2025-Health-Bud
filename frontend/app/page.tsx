"use client"
import { useState } from "react";
import StatsPanel from "@/components/StatsPanel";
export default function Home() {

  return (
    <div className="w-full min-h-screen font-[VT323] bg-black text-white">
      <main className="w-full">

        {/* Header */}
        <header className="w-full border-b-2 border-white py-3 px-6 text-3xl">
          <div className="w-full flex justify-start">
            Health Bud
          </div>
        </header>

        {/* Main Grid */}
        <div className="w-full max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Bud Panel */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src="stationary.png"
                alt="Bud Sprite"
                className="w-40 h-40 object-contain"
              />
            </div>
            <div className="text-2xl">
              BUD: "Scanning your vibes..."
            </div>
          </div>

          {/* Stats Panel */}
          
          <StatsPanel/>
          {/* Dialogue Box (spans both columns on md+) */}
          <div className="md:col-span-2 mt-4">
            <div className="w-full border-[4px] border-white bg-black p-4 text-2xl leading-relaxed">
              textbox
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
