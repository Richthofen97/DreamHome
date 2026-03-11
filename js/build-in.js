export const pageStructure = {
  header: {
    targetId: "site-header",
    file: "./components/site-header.html",
  },

  main: {
    targetId: "site-main",
    sections: [
      "./components/hero-section.html",
      "./components/property-search.html",
      "./components/about-section.html",
      "./components/features-section.html",
      "./components/residences-section.html",
      "./components/testimonials-section.html",
      "./components/support-section.html",
    ],
  },

  footer: {
    targetId: "site-footer",
    file: "./components/site-footer.html",
  },
};
