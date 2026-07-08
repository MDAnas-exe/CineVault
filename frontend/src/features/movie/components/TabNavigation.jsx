import { useParams, useNavigate } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

import Details from "./Details";
import Cast from "./Cast";
import Crew from "./Crew";
import Reviews from "./Reviews";
import ReleaseInfo from "./ReleaseInfo";

const MovieTabs = () => {
  const { id, tab } = useParams();
  const navigate = useNavigate();
  const tabs = [
    { key: "details", label: "Details", icon: HiOutlineDocumentText },
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

  const activeTab = tab || "overview";

  const tabContent = {
    details: <Details />,
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
              navigate(`/movie/${id}/${key}`);
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
