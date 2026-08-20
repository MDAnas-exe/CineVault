import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Button from "../../../components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../../utils/apiRequest.js";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Reel from "../../../assets/images/reel.svg?react";
import { useForm } from "react-hook-form";
import Textarea from "./Textarea";

const ReviewCard = ({ reviewInfo, isOwner = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { review: reviewInfo.review },
  });

  const { mutateAsync: delMutateAsync, isPending: isDeletePending } =
    useMutation({
      mutationFn: apiRequest,
      onSuccess: () => {
        toast.success("review deleted successfully!!");
        queryClient.invalidateQueries(["user-review", id]);
        queryClient.setQueryData(["user-review", id], null);
      },
      onError: () => toast.error("Failed to delete review."),
    });

  const { mutateAsync: editMutateAsync, isPending: isEditPending } =
    useMutation({
      mutationFn: apiRequest,
      onSuccess: () => {
        toast.success("review edited successfully!!");
        queryClient.invalidateQueries(["user-review", id]);
        queryClient.setQueryData(["user-review", id], null);
      },
      onError: () => toast.error("Failed to edit review."),
    });

  function getDateAdded(date) {
    let dateAdded = (Date.now() - new Date(date)) / 1000;
    let unit;

    if (dateAdded < 60) unit = parseInt(dateAdded) + " second";
    else if ((dateAdded /= 60) < 60) unit = parseInt(dateAdded) + " minute";
    else if ((dateAdded /= 60) < 24) unit = parseInt(dateAdded) + " hour";
    else if ((dateAdded /= 24) < 30) unit = parseInt(dateAdded) + " day";
    else if ((dateAdded /= 30) < 12) unit = parseInt(dateAdded) + " month";
    else unit = parseInt((dateAdded /= 12)) + " year";

    return parseInt(unit) > 1 ? unit + "s ago" : unit + " ago";
  }

  return (
    <div
      className={` ${!isEditing && "relative rounded-xl bg-neutral-50 px-3 py-3 md:px-5 md:py-4 font-inter"}`}
    >
      <div className="flex items-start justify-between gap-2">
        {!isEditing && (
          <span className="font-poppins text-sm font-semibold text-primary">
            {reviewInfo.name}
          </span>
        )}

        {isOwner && !isEditing && (
          <div className="relative shrink-0">
            <Button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`rounded-md p-1.5 text-neutral-400 hover:bg-neutral-200 hover:text-primary focus:ring-0 ${menuOpen && "focus:ring-2"}`}
              aria-label="Review options "
            >
              <FaEllipsisV className="text-xs" />
            </Button>

            {menuOpen && (
              <div
                className="fixed inset-0 z-5"
                onClick={() => setMenuOpen(false)}
              />
            )}

            <div
              className={twMerge(
                "absolute right-0 top-8 z-10 w-32 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-md origin-top-right transition-all duration-200 ease-out",
                menuOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none",
              )}
            >
              <Button
                type="button"
                className="w-full rounded-none px-4 py-2 text-left font-inter text-sm font-normal text-primary hover:bg-neutral-50 active:scale-100 focus:ring-0 focus:ring-offset-0"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button
                type="button"
                className={`w-full rounded-none px-4 py-2 text-left font-inter text-sm font-normal text-red-600 hover:bg-red-50 active:scale-100 focus:ring-0 focus:ring-offset-0 ${isDeletePending && "flex gap-2 items-center"}`}
                disabled={isDeletePending}
                onClick={() =>
                  delMutateAsync({
                    method: "DELETE",
                    endpoint: `users/reviews/${id}`,
                  })
                }
              >
                {isDeletePending ? (
                  <>
                    <Reel className="animate-spin size-4.5" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      <Textarea
        isEditing={isEditing}
        value={reviewInfo.review}
        register={register("review", {
          maxLength: {
            value: 2000,
            message: "reviews cannot be more than 2000 characters.",
          },
          required: "review cannot be empty",
          setValueAs: (v) => v.trim(),
        })}
        watch={watch}
      />

      {isEditing && (
        <p className="min-h-5 text-sm text-red-500">{errors.review?.message}</p>
      )}

      {isEditing ? (
        <div className="mt-3 flex justify-end gap-2">
          <Button
            type="button"
            className="rounded-lg px-3 py-1.5 md:px-4 md:py-2 font-inter text-xs md:text-sm font-medium text-neutral-500 hover:text-primary"
            onClick={() => setIsEditing(false)}
            disabled={isEditPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit((data) => {
              if (data.review === reviewInfo.review) {
                setIsEditing(false);
                return toast.success("review edited successfully");
              }
              editMutateAsync({
                endpoint: `users/reviews/${id}`,
                data,
                method: "PUT",
              });
            })}
            className={`rounded-lg bg-accent px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-primary hover:bg-[#c89412] disabled:cursor-not-allowed disabled:opacity-50 ${isEditPending && "flex gap-2 items-center"}`}
            disabled={isEditPending}
          >
            {isEditPending ? (
              <>
                <Reel className="animate-spin size-4" />{" "}
                <span>Submitting...</span>
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </div>
      ) : (
        <p className="mt-4 text-right font-inter text-xs text-neutral-400">
          {getDateAdded(reviewInfo.createdAt)}
        </p>
      )}
    </div>
  );
};

export default ReviewCard;
