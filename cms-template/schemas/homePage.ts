export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { name: "hero", title: "Hero", type: "heroSection" },
        { name: "bio", title: "Bio", type: "bioSection" },
        {
          name: "booksCarousel",
          title: "Books Carousel",
          type: "booksCarouselSection",
        },
        {
          name: "newsletterSignupSection",
          title: "Newsletter Sign-up",
          type: "newsletterSignupSection",
        },
      ],
      validation: (Rule: any) => [
        Rule.required().min(1),
        Rule.min(3).warning(
          "At least 3 sections is recommended. Consider adding more."
        ),
      ],
    },
  ],
} as const;
