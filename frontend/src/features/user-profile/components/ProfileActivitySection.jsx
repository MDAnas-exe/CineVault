import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi2";

const ProfileActivitySection = ({ title, viewAllTo, children }) => {
  const headingId = `profile-${title.toLowerCase().replaceAll(" ", "-")}-heading`;

  return (
    <section className="mt-8 first:mt-0 sm:mt-10" aria-labelledby={headingId}>
      <div className="mb-3 flex items-center justify-between gap-4 sm:mb-4">
        <h2
          id={headingId}
          className="border-l-4 border-accent pl-3 font-poppins text-xl font-bold text-primary sm:text-2xl"
        >
          {title}
        </h2>
        <Link
          to={viewAllTo}
          className="group inline-flex shrink-0 items-center gap-0.5 font-inter text-sm font-medium text-accent transition-colors hover:text-accent-hover hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          View all
          <HiChevronRight
            className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
      <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
        {children}
      </div>
    </section>
  );
};

export default ProfileActivitySection;
