import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Menu } from "lucide-react"; // Import Menu Icon
import Sidebar from "./Sidebar";
import QuickModules from "./QuickModules";
import ActivitySection from "./ActivitySection";
import ImportantTopics from "./ImportantTopics";
import StatsSection from "./StatsSection";
import Examinations from "./Examinations";

const BASE_URL = "http://localhost:8080";

const Profile = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("modules");

  // State for Mobile Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/v1/getAll`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHeroData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0f1117] text-white flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "modules":
        return <QuickModules />;
      case "activity":
        return <ActivitySection heroData={heroData} />;
      case "exams":
        return <Examinations heroData={heroData} />;
      case "important":
        return <ImportantTopics heroData={heroData} />;
      case "stats":
        return <StatsSection heroData={heroData} />;
      default:
        return <QuickModules />;
    }
  };

  return (
    <div className="h-screen w-full bg-[#0f1117] text-slate-200 flex overflow-hidden font-sans selection:bg-blue-500/30">
      {/* --- MOBILE SIDEBAR OVERLAY (Backdrop) --- */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* --- SIDEBAR COMPONENT --- */}
      {/* We pass isOpen and onClose to handle the mobile sliding animation inside Sidebar.js */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false); // Close sidebar on mobile when item clicked
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 h-full overflow-hidden flex flex-col relative w-full">
        <header className="p-6 pb-2 shrink-0 flex justify-between items-center border-b border-white/5 bg-[#0f1117]/95 backdrop-blur z-30">
          <div className="flex items-center gap-4">
            {/* HAMBURGER BUTTON (Mobile Only) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-400 hover:bg-white/10 md:hidden"
            >
              <Menu size={24} />
            </button>

            <div>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                Dashboard
              </h2>
              <h1 className="text-2xl md:text-3xl font-bold text-white capitalize tracking-tight">
                {activeTab === "stats"
                  ? "Analytics"
                  : activeTab.replace("-", " ")}
              </h1>
            </div>
          </div>

          {/* Badge */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <span className="text-xs font-semibold text-slate-300">
              {heroData?.daily_work?.length || 0} Sessions
            </span>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6 pt-4">
          {renderContent()}
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2d3748; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4a5568; }
      `,
        }}
      />
    </div>
  );
};

export default Profile;
