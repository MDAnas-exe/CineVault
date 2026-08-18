import UserReviewSection from "./UserReviewSection";

const Reviews = () => {
  return (
    <section className="md:mt-8 mt-4">
      <h2 className="mb-5 md:mb-10 font-poppins text-2xl md:text-5xl font-bold text-primary">
        Reviews
      </h2>

      <UserReviewSection />

      {/* TODO: MovieReviewsSection */}
    </section>
  );
};

export default Reviews;
