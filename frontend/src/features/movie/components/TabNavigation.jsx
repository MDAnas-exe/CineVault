import {
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { useState } from "react";
import Overview from "./Overview";
export default function TabNavigation() {
  const tabs = [
    { key: "overview", label: "Overview", icon: HiOutlineDocumentText },
    { key: "cast", label: "Cast", icon: HiOutlineUsers },
    { key: "crew", label: "Crew", icon: HiOutlineBriefcase },
    { key: "reviews", label: "Reviews", icon: HiOutlineChatBubbleLeftRight },
    { key: "releaseinfo", label: "Release Info", icon: HiOutlineCalendarDays },
  ];
  const [active, setActive] = useState({
    overview: true,
    cast: false,
    crew: false,
    reviews: false,
    releaseinfo: false,
  });
  const setActiveTab = (key) => {
    if (active[key] === true) return;

    setActive((prev) => ({
      overview: false,
      cast: false,
      crew: false,
      reviews: false,
      releaseinfo: false,

      [key]: true,
    }));
  };

  return (
    <div>
      <nav className="flex rounded-xl bg-white shadow-md px-2">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              setActiveTab(key);
            }}
            className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium transition-colors cursor-pointer duration-300 hover:text-accent border-b-2  ${
              active[key]
                ? " border-accent text-accent"
                : "text-gray-700 border-white"
            }`}
          >
            <Icon className="text-lg" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      {active.overview && <Overview />}
      {active.cast && <div>cast</div>}
      {active.crew && <div>crew</div>}
      {active.reviews && <div>reviews</div>}
      {active.releaseinfo && <div>releaseinfo</div>}
    </div>
  );
}
