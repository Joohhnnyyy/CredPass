"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "JAN", blue: 40000, white: 24000, green: 1000 },
  { name: "FEB", blue: 30000, white: 40000, green: 2000 },
  { name: "MAR", blue: 20000, white: 25000, green: 500 },
  { name: "APR", blue: 40000, white: 10000, green: 400 },
  { name: "MAY", blue: 18000, white: 2000, green: 800 },
  { name: "JUN", blue: 2390, white: 500, green: 6000 },
  { name: "JUL", blue: 12000, white: 8000, green: 3000 },
  { name: "AUG", blue: 11000, white: 15000, green: 3500 },
  { name: "SEP", blue: 50000, white: 80000, green: 5000 },
  { name: "OCT", blue: 48000, white: 70000, green: 4000 },
  { name: "NOV", blue: 48000, white: 25000, green: 3000 },
  { name: "DEC", blue: 60000, white: 35000, green: 4000 },
];

export function OverviewChart() {
  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={true} horizontal={false} />
          <XAxis 
            dataKey="name" 
            stroke="#666" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#666" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          <Line type="linear" dataKey="blue" stroke="#3b82f6" strokeWidth={2} dot={true} activeDot={{ r: 4 }} />
          <Line type="linear" dataKey="white" stroke="#e5e7eb" strokeWidth={2} strokeDasharray="5 5" dot={true} />
          <Line type="linear" dataKey="green" stroke="#22c55e" strokeWidth={2} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
