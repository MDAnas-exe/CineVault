import { useState } from "react";
import { FaChevronUp, FaUserCircle } from "react-icons/fa";
import SectionSubheading from "../../../components/ui/SectionSubheading";

export default function CrewDepartment({ title, icon: Icon, members }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="mb-5 flex w-full cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Icon className="text-2xl text-accent" />

          <SectionSubheading className="mb-0">{title}</SectionSubheading>
        </div>

        <FaChevronUp
          className={`text-lg text-secondary transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div className="mb-6 h-px bg-gray-200" />

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 gap-6 pb-1 md:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.credit_id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {member.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                  alt={member.name}
                  className="h-12 w-12 rounded-full object-top md:object-cover"
                />
              ) : (
                <FaUserCircle className="h-12 w-12 text-gray-300" />
              )}

              <div className="min-w-0">
                <h4 className="truncate font-poppins text-xs font-semibold text-primary md:text-lg">
                  {member.name}
                </h4>

                <p className="truncate font-inter text-sm text-secondary">
                  {member.job}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
