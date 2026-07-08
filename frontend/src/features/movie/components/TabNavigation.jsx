import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

import Overview from "./Overview";
import Cast from "./Cast";
import Crew from "./Crew";
import Reviews from "./Reviews";
import ReleaseInfo from "./ReleaseInfo";

const MovieTabs = () => {
  const { id } = useParams();

  const tabs = [
    { key: "overview", label: "Overview", icon: HiOutlineDocumentText },
    { key: "cast", label: "Cast", icon: HiOutlineUsers },
    { key: "crew", label: "Crew", icon: HiOutlineBriefcase },
    {
      key: "reviews",
      label: "Reviews",
      icon: HiOutlineChatBubbleLeftRight,
    },
    {
      key: "releaseinfo",
      label: "Release Info",
      icon: HiOutlineCalendarDays,
    },
  ];

  const [activeTab, setActiveTab] = useState("overview");

  const tabContent = {
    overview: <Overview />,
    cast: <Cast />,
    crew: <Crew />,
    reviews: <Reviews />,
    releaseinfo: <ReleaseInfo />,
  };

  return (
    <div>
      <nav className="flex rounded-xl bg-white px-2 shadow-md">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              setActiveTab(key);
              window.history.replaceState(null, "", `/movie/${id}/${key}`);
            }}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 border-b-2 py-4 text-sm font-medium transition-colors duration-300 hover:text-accent ${
              activeTab === key
                ? "border-accent text-accent"
                : "border-white text-gray-700"
            }`}
          >
            <Icon className="text-lg" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div>{tabContent[activeTab]}</div>
    </div>
  );
};

export default MovieTabs;
