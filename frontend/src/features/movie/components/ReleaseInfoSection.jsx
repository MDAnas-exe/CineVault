import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import SectionSubheading from "../../../components/ui/SectionSubheading";
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(date);
  const year = date.getUTCFullYear();
  return `${day} ${month}, ${year}`;
};

const getCountryName = (isoCode) => {
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(isoCode.toUpperCase());
  } catch {
    return "Unknown Country";
  }
};

const ReleaseInfoSection = ({ section }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      key={section.type}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <button
        className="flex w-full items-center justify-between p-3 md:px-6 md:py-5 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-3">
          <SectionSubheading className="mb-0">{section.type}</SectionSubheading>
          <span className="rounded-full bg-gray-100 px-2 md:px-3 py-1 font-inter text-xs md:text-sm text-secondary">
            {section.releases.length}
          </span>
        </div>
        <span
          className={`text-lg md:text-xl text-secondary transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronUp />
        </span>
      </button>

      <div className="h-px bg-gray-200" />

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-1000 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Mobile: stacked cards */}
        <div className="divide-y divide-gray-100 md:hidden">
          {section.releases.map((release, index) => (
            <div
              key={`${release.iso_3166_1}-${release.release_date}-${index}`}
              className="p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    loading="lazy"
                    src={`https://flagcdn.com/${release.iso_3166_1.toLowerCase()}.svg`}
                    alt=""
                    className="size-4"
                  />
                  <span className="font-inter text-sm text-primary">
                    {getCountryName(release.iso_3166_1)}
                  </span>
                </div>
                {release.certification && (
                  <span className="rounded-md border border-gray-300 px-2 py-1 font-inter text-xs font-medium text-primary">
                    {release.certification}
                  </span>
                )}
              </div>
              <div className="font-inter text-xs text-secondary">
                {formatDate(release.release_date)}
              </div>
              {section.type === "Premiere" && release.note && (
                <div className="font-inter text-xs text-secondary">
                  {release.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <table className="hidden md:table w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left font-inter text-xs font-semibold uppercase tracking-wider text-secondary">
                Date
              </th>
              <th className="px-6 py-4 text-left font-inter text-xs font-semibold uppercase tracking-wider text-secondary">
                Country
              </th>
              <th className="px-6 py-4 text-left font-inter text-xs font-semibold uppercase tracking-wider text-secondary">
                Certification
              </th>
              {section.type === "Premiere" && (
                <th className="px-6 py-4 text-left font-inter text-xs font-semibold uppercase tracking-wider text-secondary">
                  Note
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {section.releases.map((release, index) => (
              <tr
                key={`${release.iso_3166_1}-${release.release_date}-${index}`}
                className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-inter text-sm text-primary">
                  {formatDate(release.release_date)}
                </td>
                <td className="px-6 py-4 font-inter text-sm text-primary">
                  <div className="flex items-center gap-2">
                    <img
                      loading="lazy"
                      src={`https://flagcdn.com/${release.iso_3166_1.toLowerCase()}.svg`}
                      alt=""
                      className="size-4"
                    />
                    <span>{getCountryName(release.iso_3166_1)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {release.certification && (
                    <span className="rounded-md border border-gray-300 px-2 py-1 font-inter text-xs font-medium text-primary">
                      {release.certification}
                    </span>
                  )}
                </td>
                {section.type === "Premiere" && (
                  <td className="px-6 py-4 font-inter text-sm text-secondary">
                    {release.note}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReleaseInfoSection;
