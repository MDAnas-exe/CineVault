import {
  HiFilm,
  HiPencil,
  HiCamera,
  HiMusicalNote,
  HiBuildingOffice2,
} from "react-icons/hi2";
import { HiColorSwatch } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../../utils/apiRequest";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionState from "../../../components/ui/SectionState";
import CrewDepartment from "./CrewDepartment";
export default function Crew() {
  const { id } = useParams();

  const {
    data: crew,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["movie-credits", id, "crew"],
    queryFn: async () => {
      const data = await apiRequest({ endpoint: `movies/${id}/credits`, method: "GET" });
      return data.crew;
    },
    enabled: !!id,
  });

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
        <div className="w-30 h-8 mb-5 md:mb-10 md:h-12 md:w-44">
          <Skeleton width="100%" height="100%" />
        </div>

        <div className="md:space-y-12 space-y-6">
          {Array.from({ length: 5 }).map((_, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-7 w-7">
                  <Skeleton circle width="100%" height="100%" />
                </div>

                <div className="h-5 w-30 md:h-8 md:w-44">
                  <Skeleton width="100%" height="100%" />
                </div>
              </div>

              <Skeleton height={1} className="mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="md:size-12 size-6 self-start">
                      <Skeleton circle width="100%" height="100%" />
                    </div>

                    <div className="flex-1">
                      <div className="h-5.5 w-[70%]">
                        <Skeleton width="100%" height="100%" />
                      </div>

                      <div className="mt-2 h-4 w-1/2">
                        <Skeleton width="100%" height="100%" />
                      </div>
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
    <section className="md:mt-8 mt-4">
      <h2 className="mb-5 md:mb-10 font-poppins md:text-5xl text-3xl font-bold text-primary">
        Crew
      </h2>

      <div className="space-y-6 md:space-y-12">
        {groupedCrew.map((department) => (
          <CrewDepartment
            key={department.name}
            title={department.name}
            icon={department.icon}
            members={department.members}
          />
        ))}
      </div>
    </section>
  );
}
