export default {
  title: "Travellers Guild Rules",
  orgName: "Travellers Guild",
  logo: {
    navbarClassname: "h-8 w-8",
    url: "https://res.cloudinary.com/djp21wtxm/image/upload/v1666834687/Ribbon_dd4xgm.svg",
    darkUrl:
      "https://res.cloudinary.com/djp21wtxm/image/upload/v1666834738/RibbonWhite_kunfov.svg",
  },
  feedback: {
    formspreeId: "mqkvwvay",
  },
  navbar: {
    topLinks: [
    ],
    tabs: [
      { title: "Home", href: "/", referenceHref: "/" },
      { title: "Rules", href: "/rules", referenceHref: "/rules" },
      { title: "Guides", href: "/guides", referenceHref: "/guides" },
      { title: "Resources", href: "/resources", referenceHref: "/resources" },
      { title: "About", href: "/about", referenceHref: "/about"}
    ],
  },
  sidebars: {
    guides: [
      {
        title: "Quick start",
        pages: [
          "/guides/quick-start/create-a-project",
          "/guides/quick-start/edit-a-page",
          "/guides/quick-start/link-to-a-page",
          "/guides/quick-start/set-a-template",
          "/guides/quick-start/prepare-for-seo",
          "/guides/quick-start/publish-to-the-web",
          "/guides/quick-start/set-up-a-custom-domain",
        ],
      },
      {
        title: "Basics",
        pages: [
          "/guides/basics/project-structure",
          "/guides/basics/markdown",
          "/guides/basics/jsx",
          "/guides/basics/mdx",
          "/guides/basics/markdoc",
          "/guides/basics/es-modules",
          "/guides/basics/css",
          "/guides/basics/tailwind-css",
          "/guides/basics/metadata",
        ],
      },
      {
        title: "Publishing",
        pages: [
          {
            title: "Custom domains",
            href: "/guides/publishing/custom-domains",
            pages: [
              "/guides/publishing/custom-domains/subdomains",
              "/guides/publishing/custom-domains/subpaths",
            ],
          },
          {
            title: "Analytics",
            pages: [
              "/guides/publishing/analytics/google",
              "/guides/publishing/analytics/fathom",
              "/guides/publishing/analytics/mixpanel",
            ],
          },
          "/guides/publishing/sitemaps",
          "/guides/publishing/favicons",
          "/guides/publishing/integrations",
        ],
      },
      {
        title: "Layout and design",
        pages: [
          "/guides/layout-and-design/templates",
          "/guides/layout-and-design/responsive-designs",
          "/guides/layout-and-design/using-colors",
          "/guides/layout-and-design/typography",
          "/guides/layout-and-design/mathematics",
        ],
      },
    ],
  },
  sampleGallery: {
    Develop: [
      {
        title: "Markdoc",
        href: "/guides/develop/cli",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cover:
          "https://res.cloudinary.com/djp21wtxm/image/upload/v1652948650/Markdoc_Playground_caiqqe.svg",
      },
      {
        title: "Projects",
        href: "/guides/develop/projects",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cover:
          "https://res.cloudinary.com/djp21wtxm/image/upload/v1652948516/Motif_UI_Kit_izcgb8.svg",
      },
      {
        title: "Environments",
        href: "/guides/develop/environments",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cover:
          "https://res.cloudinary.com/djp21wtxm/image/upload/v1652948516/Beautiful_Release_Notes_lf9qb0.svg",
      },
    ],
    Databases: [
      {
        title: "MongoDB",
        href: "/guides/databases/mongodb",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cover:
          "https://res.cloudinary.com/djp21wtxm/image/upload/v1652950827/Docs_UI_Kit_q0mlmz.svg",
      },
      {
        title: "MySQL",
        href: "/guides/databases/mysql",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cover:
          "https://res.cloudinary.com/djp21wtxm/image/upload/v1652950827/Icons_y6ffug.svg",
      },
      {
        title: "PostgreSQL",
        href: "/guides/databases/postgresql",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cover:
          "https://res.cloudinary.com/djp21wtxm/image/upload/v1652951184/Menus_ljg4im.svg",
      },
    ],
    Deploy: [
      {
        title: "Builds",
        href: "/guides/deploy/builds",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cover:
          "https://res.cloudinary.com/djp21wtxm/image/upload/v1652951051/Markdoc_z4mgjs.svg",
      },
      {
        title: "Integrations",
        href: "/guides/deploy/integrations",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cover:
          "https://res.cloudinary.com/djp21wtxm/image/upload/v1652951020/Terminals_bgpao2.svg",
      },
      {
        title: "Monorepo",
        href: "/guides/deploy/monorepo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cover:
          "https://res.cloudinary.com/djp21wtxm/image/upload/v1652951294/Canvas_Draw_e8hhsm.svg",
      },
    ],
  },
};
