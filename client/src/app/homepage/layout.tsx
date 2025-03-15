import { ReactNode } from "react";
import Header from "../Components/Header/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Top Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Filter Section */}
        <aside className="w-1/4 bg-white p-6 overflow-y-auto hidden md:block border-r border-slate-200">
          <h2 className="text-lg font-semibold mb-6 text-slate-800">Filters</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow transition-shadow duration-200">
              <span className="text-slate-700">Filter 1</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow transition-shadow duration-200">
              <span className="text-slate-700">Filter 2</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow transition-shadow duration-200">
              <span className="text-slate-700">Filter 3</span>
            </div>
            {/* Add more filters */}
          </div>
        </aside>
        
        {/* Right Cards Section */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-50 mt-13">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}