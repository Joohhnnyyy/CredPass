import React from "react";
import { List, Calendar, MapPin, Activity, ShieldAlert, Eye } from "lucide-react";

export function SidebarFilters() {
  return (
    <div className="flex flex-col gap-8 mt-8">
      {/* Focus Section */}
      <div className="space-y-3">
        <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Focus</h4>
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2 bg-white/10 rounded-lg text-white text-sm font-medium border border-white/5 shadow-sm">
            <ShieldAlert size={14} className="text-gray-400" />
            Attack Stage
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
            <span className="w-3.5 h-3.5 border border-gray-600 rounded-sm" />
            Scan Source
          </button>
        </div>
      </div>

      {/* View Section */}
      <div className="space-y-3">
        <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">View</h4>
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2 bg-white/10 rounded-lg text-white text-sm font-medium border border-white/5 shadow-sm">
            <List size={14} className="text-gray-400" />
            Category
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
            <Calendar size={14} className="text-gray-400" />
            Timeline
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
            <MapPin size={14} className="text-gray-400" />
            Location
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="space-y-3">
        <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Filters</h4>
        <div className="flex flex-col gap-4 pl-1">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            Live Detections
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            Takedown in progress
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span className="w-2 h-2 rounded-full bg-green-800" />
            Monitor Takedown
          </div>
        </div>
      </div>
    </div>
  );
}
