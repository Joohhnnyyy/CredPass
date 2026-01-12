import React from "react";
import { Progress } from "@/components/ui/progress";

const threats = [
  { name: "Oath Holdings Inc", total: 11276, takenDown: 11076, active: 200, color: "bg-green-500" },
  { name: "Akamai International", total: 4530, takenDown: 3500, active: 1030, color: "bg-green-500" },
  { name: "Amazon.com", total: 2998, takenDown: 2000, active: 998, color: "bg-green-500" },
  { name: "SendGrid Inc.", total: 1508, takenDown: 1500, active: 8, color: "bg-green-500" },
  { name: "Digital Ocean LLC.", total: 1498, takenDown: 1200, active: 298, color: "bg-green-500" },
  { name: "GoDaddy.com", total: 509, takenDown: 400, active: 109, color: "bg-green-500" },
];

export function ThreatTable() {
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-gray-500 mb-2 uppercase tracking-wider font-semibold">
        <span>Entity Name</span>
        <div className="flex gap-4">
          <span>Total</span>
          <span className="w-24 text-right">Takedown Tracker</span>
        </div>
      </div>
      <div className="space-y-3">
        {threats.map((item, idx) => (
          <div key={idx} className="group relative">
            <div className="flex justify-between items-center text-xs text-gray-300 mb-1">
              <span className="truncate max-w-[120px]">{item.name}</span>
              <div className="flex gap-6 items-center">
                <span className="w-8 text-right font-mono">{item.total.toLocaleString()}</span>
                <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color}`} 
                    style={{ width: `${(item.takenDown / item.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            {/* Tooltip style hover effect could go here */}
          </div>
        ))}
      </div>
    </div>
  );
}
