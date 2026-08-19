import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import apiRequest from "../../../utils/apiRequest.js";
import Button from "../../../components/ui/Button";
import Reel from "../../../assets/images/reel.svg?react";
import Textarea from "./Textarea";

const ReviewForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: apiRequest,
    onSuccess: () => {
      toast.success("review submitted successfully");
      queryClient.invalidateQueries(["user-review", id]);
    },
    onError: () => toast.error("failed to submit review"),
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutateAsync({ method: "PUT", data, endpoint: `users/reviews/${id}` }),
      )}
    >
      <Textarea
        isEditing={true}
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
      <p className="min-h-5 text-sm text-red-500">{errors.review?.message}</p>
      <div className="mt-3 flex justify-end gap-2">
        <Button
          type="button"
          className="rounded-lg px-4 py-2 font-inter text-sm font-medium text-neutral-500 hover:text-primary"
          onClick={() => setValue("review", "")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className={`rounded-lg bg-accent px-4 py-2 text-sm text-primary hover:bg-[#c89412] disabled:cursor-not-allowed disabled:opacity-50 ${isPending && "flex gap-2 items-center"}`}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Reel className="animate-spin size-4" />{" "}
              <span>Submitting...</span>
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
