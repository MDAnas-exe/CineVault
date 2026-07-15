import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchReleaseInfo from "../hooks/useFetchReleaseInfo";
import ReleaseInfoSection from "./ReleaseInfoSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SectionState from "../../../components/ui/SectionState";

const releaseTypes = {
  1: "Premiere",
  2: "Limited Theatrical",
  3: "Theatrical",
  4: "Digital",
  5: "Physical",
  6: "TV",
};

export default function ReleaseInfo() {
  const { id } = useParams();

  const { data, isLoading, isError, refetch } = useFetchReleaseInfo(id);

  const groupedReleaseInfo = useMemo(() => {
    if (!data) return [];

    const grouped = {
      Premiere: [],
      "Limited Theatrical": [],
      Theatrical: [],
      Digital: [],
      Physical: [],
      TV: [],
    };

    data.results.forEach((country) => {
      country.release_dates.forEach((release) => {
        grouped[releaseTypes[release.type]].push({
          ...release,
          iso_3166_1: country.iso_3166_1,
        });
      });
    });

    Object.values(grouped).forEach((releases) =>
      releases.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date),
      ),
    );

    return Object.entries(grouped)
      .filter(([, releases]) => releases.length)
      .map(([type, releases]) => ({
        type,
        releases,
      }));
  }, [data]);

  if (isLoading) {
    return (
      <section className="mt-8">
        <Skeleton width={340} height={48} className="mb-10" />
        <div className="space-y-8">
          {Array.from({ length: 4 }).map((_, sectionIndex) => (
            <div
              key={sectionIndex}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between p-3 md:px-6 md:py-5">
                <div className="flex items-center gap-3">
                  <Skeleton
                    width={120}
                    height={24}
                    className="md:w-45 md:h-8"
                  />
                  <Skeleton width={36} height={28} borderRadius={9999} />
                </div>
                <Skeleton circle width={20} height={20} />
              </div>
              <Skeleton height={1} />

              {/* Mobile: stacked cards */}
              <div className="divide-y divide-gray-100 md:hidden">
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton circle width={16} height={16} />
                        <Skeleton width={100} height={16} />
                      </div>
                      <Skeleton width={48} height={22} borderRadius={6} />
                    </div>
                    <Skeleton width={80} height={14} />
                  </div>
                ))}
              </div>

              {/* Desktop: table */}
              <div className="hidden md:block p-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="pb-4 text-left">
                        <Skeleton width={60} height={16} />
                      </th>
                      <th className="pb-4 text-left">
                        <Skeleton width={80} height={16} />
                      </th>
                      <th className="pb-4 text-left">
                        <Skeleton width={100} height={16} />
                      </th>
                      <th className="pb-4 text-left">
                        <Skeleton width={50} height={16} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="py-4">
                          <Skeleton width={90} height={18} />
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <Skeleton circle width={16} height={16} />
                            <Skeleton width={120} height={18} />
                          </div>
                        </td>
                        <td className="py-4">
                          <Skeleton width={48} height={24} borderRadius={6} />
                        </td>
                        <td className="py-4">
                          <Skeleton width={180} height={18} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          message="Couldn't load release information"
          description="Something went wrong while fetching the release information. Please try again."
          buttonText="Retry"
          onRetry={refetch}
        />
      </section>
    );
  }

  if (groupedReleaseInfo.length === 0) {
    return (
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white py-16 shadow-sm">
        <SectionState
          message="No release information available"
          description="Release information isn't available for this movie."
        />
      </section>
    );
  }

  return (
    <section className="md:mt-8 mt-4">
      <h2 className="mb-5 md:mb-10 font-poppins text-2xl md:text-5xl font-bold text-primary">
        Release Information
      </h2>

      <div className="md:space-y-8 space-y-4">
        {groupedReleaseInfo.map((section) => (
          <ReleaseInfoSection section={section} />
        ))}
      </div>
    </section>
  );
}
