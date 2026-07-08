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

  const activeTab = tab || "details";

  const tabContent = {
    details: <Details />,
    cast: <Cast />,
    crew: <Crew />,
    reviews: <Reviews />,
    releaseinfo: <ReleaseInfo />,
  };

  return (
    <div>
      <nav className="flex rounded-xl bg-white px-2 md:shadow-md shadow-[0_0_24px_3px_rgba(15,23,42,0.12)] md:justify-normal justify-between">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              navigate(`/movie/${id}/${key}`);
            }}
            className={`px-2 md:px-0 flex md:flex-1 md:flex-row flex-col cursor-pointer items-center justify-center md:gap-2 border-b-2 py-2 md:py-4 text-sm font-medium transition-colors duration-300 hover:text-accent ${
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
