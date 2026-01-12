"use client";

import React from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { ThreatTable } from "@/components/dashboard/ThreatTable";
import { BubbleVis } from "@/components/dashboard/BubbleVis";
import { SidebarFilters } from "@/components/dashboard/SidebarFilters";
import DashboardMap from "@/components/dashboard/DashboardMap";
import { Download, Calendar, ChevronDown } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 font-sans">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl font-bold tracking-tight">DASHBOARD</h1>
            <div className="flex gap-6 text-sm font-medium text-gray-400">
              <button className="text-white border-b-2 border-white pb-6 -mb-6">Scans</button>
              <button className="hover:text-white transition-colors pb-6 -mb-6">Actions</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1e] rounded-lg text-sm text-gray-300 hover:text-white transition-colors border border-white/5">
              <Calendar size={16} />
              <span>Oct 25 - Oct 31</span>
              <ChevronDown size={14} className="ml-2 opacity-50" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </header>

        <div className="flex gap-8">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <SidebarFilters />
          </aside>

          {/* Main Grid */}
          <main className="flex-1 grid grid-cols-12 gap-6">
            
            {/* Row 1: Overview Chart (8 cols) + Bubble Vis (4 cols) */}
            <div className="col-span-12 lg:col-span-8 h-[400px]">
              <DashboardCard 
                title="Overview" 
                className="h-full"
                action={
                  <div className="flex gap-2 text-[10px] font-mono">
                    <span className="text-blue-400">● 2023</span>
                    <span className="text-gray-500">● 2022</span>
                  </div>
                }
              >
                <OverviewChart />
              </DashboardCard>
            </div>

            <div className="col-span-12 lg:col-span-4 h-[400px]">
              <DashboardCard className="h-full bg-gradient-to-b from-[#121214] to-[#0c0c0e] overflow-hidden">
                 <BubbleVis />
              </DashboardCard>
            </div>

            {/* Row 2: Total Takedowns (3 cols) + Map (5 cols) + Threat Table (4 cols) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 h-[300px]">
              <DashboardCard title="Total Takedowns" className="h-full relative overflow-hidden">
                <div className="flex flex-col h-full justify-between py-2">
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">342</div>
                    <div className="text-sm text-green-400 flex items-center gap-1">
                      +12% <span className="text-gray-500">vs last week</span>
                    </div>
                  </div>
                  
                  {/* Mini bar chart visual */}
                  <div className="flex items-end gap-1 h-24 opacity-50">
                    {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-5 h-[300px]">
              <DashboardCard title="Urls by Region" className="h-full overflow-hidden">
                <DashboardMap />
              </DashboardCard>
            </div>

            <div className="col-span-12 lg:col-span-4 h-[300px]">
              <DashboardCard title="Top 5 Threats" className="h-full overflow-y-auto custom-scrollbar">
                <ThreatTable />
              </DashboardCard>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
