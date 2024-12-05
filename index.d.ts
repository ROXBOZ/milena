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
