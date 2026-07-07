import { FaUserCircle } from "react-icons/fa";
import {
  HiFilm,
  HiPencil,
  HiCamera,
  HiMusicalNote,
  HiBuildingOffice2,
} from "react-icons/hi2";
import { HiColorSwatch } from "react-icons/hi";
import { useParams } from "react-router-dom";
import useFetchMovieCredits from "../hooks/useFetchMovieCredits";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionState from "../../../components/ui/SectionState";

export default function Crew() {
  const { id } = useParams();

  const {
    data: crew,
    isLoading,
    isError,
    refetch,
  } = useFetchMovieCredits(id, "crew");

  const departments = [
    {
      name: "Directing",
      icon: HiFilm,
    },
    {
      name: "Writing",
      icon: HiPencil,
    },
    {
      name: "Camera",
      icon: HiCamera,
    },
    {
      name: "Sound",
      icon: HiMusicalNote,
    },
    {
      name: "Editing",
      icon: HiFilm,
    },
    {
      name: "Art",
      icon: HiColorSwatch,
    },
    {
      name: "Production",
      icon: HiBuildingOffice2,
    },
  ];

  if (isLoading) {
    return (
      <section className="mt-8">
        <Skeleton width={170} height={48} className="mb-10" />

        <div className="space-y-12">
          {Array.from({ length: 5 }).map((_, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="mb-5 flex items-center gap-3">
                <Skeleton circle width={28} height={28} />
                <Skeleton width={180} height={32} />
              </div>

              <Skeleton height={1} className="mb-6" />

              <div className="grid grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <Skeleton circle width={48} height={48} />

                    <div className="flex-1">
                      <Skeleton width="70%" height={22} />
                      <Skeleton width="50%" height={16} className="mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white py-16 shadow-sm">
        <SectionState
          message="Couldn't load crew information"
          description="Something went wrong while fetching the crew. Please try again."
          buttonText="Retry"
          onRetry={refetch}
        />
      </section>
    );
  }

  const groupedCrew = departments
    .map((department) => ({
      ...department,
      members: crew.filter((member) => member.department === department.name),
    }))
    .filter((department) => department.members.length);

  if (groupedCrew.length === 0) {
    return (
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white py-16 shadow-sm">
        <SectionState
          message="No crew information available"
          description="Crew details aren't available for this movie."
        />
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-10 font-poppins text-5xl font-bold text-primary">
        Crew
      </h2>

      <div className="space-y-12">
        {groupedCrew.map((department) => {
          const Icon = department.icon;

          return (
            <div key={department.name}>
              <div className="mb-5 flex items-center gap-3">
                <Icon className="text-2xl text-accent" />

                <h3 className="font-poppins text-3xl font-semibold text-primary">
                  {department.name}
                </h3>
              </div>

              <div className="mb-6 h-px bg-gray-200" />

              <div className="grid grid-cols-3 gap-6">
                {department.members.map((member) => (
                  <div
                    key={member.credit_id}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    {member.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="h-12 w-12 text-gray-300" />
                    )}

                    <div className="min-w-0">
                      <h4 className="truncate font-poppins text-lg font-semibold text-primary">
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
          );
        })}
      </div>
    </section>
  );
}
