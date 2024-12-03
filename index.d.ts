interface User {
  name: string;
}

interface GeneralInfo {
  infoBanner: InfoBanner;
}

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
