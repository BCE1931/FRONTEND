import React, { useEffect, useState } from "react";
import { MoreHorizontal, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SpinnerCustom } from "@/components/ui/spinner";

export function AppSidebar() {
  const [records, setRecords] = useState([]);
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "";
  const isLoggedIn = username && username.trim() !== "";

  // useEffect(() => {
  //   handleFetch();
  // }, [username, localStorage.getItem("updatedThing")]);

  const handleRecordClick = (record) =>
    navigate("/Selection", { state: record });
  const handleHomeClick = () => navigate("/Selection", { state: null });

  const handleAnalyze = (record) => {
    localStorage.setItem("analyzeData", JSON.stringify(record));
    navigate("/analyze", { state: record });
  };

  return (
    <Sidebar className="bg-[#0b0f1a]/90 backdrop-blur-xl border-r border-gray-800 shadow-[0_0_20px_rgba(99,102,241,0.15)] text-white">
      <SidebarContent>
        {/* 🔹 Topics Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-indigo-400 font-semibold">
            Topics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { name: "DSA", icon: "💻" },
                { name: "My DSA Work", icon: "📘" },
                { name: "OS", icon: "🖥️" },
                { name: "CN", icon: "🌐" },
                { name: "APPTITUDE", icon: "🧮" },
                { name: "Add Today’s Work", icon: "➕" },
                { name: "Extra Modules", icon: "🧩" },
                { name: "SQL", icon: "🗄️" },
                { name: "Cloud", icon: "☁️" },
                { name: "React", icon: "⚛️" },
              ].map((topic, ind) => (
                <SidebarMenuItem key={ind}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => {
                        if (ind === 0)
                          navigate("/questions", { state: { work: false } });
                        else if (ind === 1)
                          navigate("/questions", { state: { work: true } });
                        else if (ind === 5) navigate("/add1");
                        else
                          navigate("/otherdisp", {
                            state: { topic: topic.name },
                          });
                      }}
                      className="flex items-center space-x-2 w-full text-left text-gray-300 hover:text-indigo-400 hover:bg-[#1e1b4b]/40 rounded-md px-3 py-1.5 transition-all duration-200"
                    >
                      <span className="text-lg">{topic.icon}</span>
                      <span>{topic.name}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 🔹 Divider for Aesthetic */}
        <div className="border-t border-gray-800 my-2 opacity-70" />

        {/* 🔹 GitHub Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-indigo-400 font-semibold">
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="https://github.com/BCE1931/SUMMARY-LLM1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-indigo-400 transition-colors"
                  >
                    💻 <span>GitHub Code</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 🔹 Footer */}
      <SidebarFooter className="mt-auto border-t border-gray-800 bg-[#0a0a0a]/80 pt-3 pb-2 backdrop-blur-md">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full flex justify-between items-center text-gray-300 hover:text-indigo-400 transition-colors">
                  <span>{isLoggedIn ? username : "Guest"}</span>
                  <ChevronUp className="w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-64 bg-[#0f172a]/95 border border-gray-700 text-gray-200 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
              >
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem>
                      <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.removeItem("username");
                        localStorage.removeItem("typeData");
                        localStorage.removeItem("updatedThing");
                        navigate("/");
                      }}
                    >
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => navigate("/signin")}>
                    <span>Sign In</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
