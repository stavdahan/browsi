export type Domain = {
  url: string;
  desktopAds: number;
  mobileAds: number;
};

export type Publisher = {
  publisher: string;
  domains: Array<Domain>;
};

export type AddDomain = {
  url: string;
  mobileAds: number;
  desktopAds: number;
  publisherName: string;
};

export type UpdateDomain = {
  newDomainURL: string;
  url: string;
  mobileAds: number;
  desktopAds: number;
  publisherName: string;
};

export type DeleteDomain = {
  url: string;
  publisherName: string;
};
