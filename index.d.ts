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

interface Role {
  fr: string;
  en: string;
}

interface Contributor {
  name: string;
  company: string;
  roles: Role[];
}

interface Figure {
  image: {
    asset: {
      _id: string;
      metadata: { lqip: string };
    };
  };
  alt: {
    fr: string;
    en: string;
  };
  legend: {
    fr: string;
    en: string;
  };
  alt: {
    fr: string;
    en: string;
  };
  copyright: string;
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
  externalLink: {
    url: string;
    label: {
      fr: string;
      en: string;
    };
  };

  gallery: Figure[];

  techniques: {
    fr: string;
    en: string;
  }[];

  video: {
    url: string;
    label: {
      fr: string;
      en: string;
    };
  };

  categories: string[];
  duration: string;
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
  shortDescription: {
    fr: string;
    en: string;
  };
  longDescription: {
    fr: any;
    en: any;
  };
  contributors: Contributor[];
  supporters: string[];
  performances: {
    location: string;
    city: string;
    dates: string[];
  }[];
  acknowledgements: {
    fr: string;
    en: string;
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
