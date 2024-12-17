interface InfoBanner {
  text: {
    fr: string;
    en: string;
  };
  link: {
    label: {
      fr: string;
      en: string;
    };
    url: string;
  };
}

interface Settings {
  userName: string;
  infoBanner: InfoBanner;
}

interface Category {
  category: "performance | dessin | verre";
}

interface Project {
  title: {
    fr: string;
    en: string;
  };

  slug: {
    fr: { current: string };
    en: { current: string };
  };

  categories: string[];
  year: {
    start: number;
    end: number;
  };
  cover: {
    image: any;
    hoverImage: any;
    alt: {
      fr: string;
      en: string;
    };
    copyright: string;
  };
}

// interface CurrentProject {
//   title: { fr: string; en: string };
//   slug: { fr: string; en: string };
//   cover: {
//     image: {
//       asset: {
//         _id: string;
//         metadata: { lqip: string };
//       };
//     };
//     alt: { fr: string; en: string };
//     copyright: { fr: string; en: string };
//   };
//   description: { fr: string; en: string };
//   hoverImage: {
//     asset: {
//       _id: string;
//       metadata: { lqip: string };
//     };
//   };
// }

interface Menus {
  headerMenu: HeaderMenu[];
}
[0];

interface HeaderMenu {
  name: {
    fr: string;
    en: string;
  };
  slug: {
    fr: { current: string };
    en: { current: string };
  };
}

interface LayoutMenu {
  headerMenu: HeaderMenu[];
}
