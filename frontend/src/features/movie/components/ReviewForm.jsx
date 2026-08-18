import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import apiRequest from "../../../utils/apiRequest.js";
import Button from "../../../components/ui/Button";

const MAX_CHARS = 2000;

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
        mutateAsync({ method: "PUT", data, endpoint: `users/reviews/${id}` })
      )}
    >
      <div className="relative">
        <textarea
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 pb-8 pt-3 font-inter text-sm text-primary placeholder:text-neutral-400 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Share your thoughts about this movie..."
          rows={5}
          {...register("review", {
            maxLength: {
              value: 2000,
              message: "reviews cannot be more than 2000 characters.",
            },
            required: "review cannot be empty",
            setValueAs: (v) => v.trim(),
          })}
        />
        <span className="absolute bottom-3 right-4 font-inter text-xs text-neutral-400">
          {watch("review")?.length || 0} / {MAX_CHARS}
        </span>
      </div>
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
          className="rounded-lg bg-accent px-4 py-2 text-sm text-primary hover:bg-[#c89412] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isPending}
        >
          Submit Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;

