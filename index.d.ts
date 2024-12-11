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

// interface Menu {
//   name: {
//     fr: string;
//     en: string;
//   };
//   slug: {
//     fr: { current: string };
//     en: { current: string };
//   };
// }

interface Menus {
  headerMenu: Menu[];
}
