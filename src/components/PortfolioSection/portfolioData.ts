/**
 * Portfolio content config.
 *
 * — To REORDER cards: change the order of items in this array (left = first card).
 * — To EDIT a card's title/category/subtitle: edit the matching key in
 *   src/locales/{ru,en,uz}.json under "portfolio.cards.<id>".
 * — To ADD a card: push a new object here with a unique `id`, then add the
 *   matching "portfolio.cards.<id>" block to all three locale files.
 * — To REMOVE a card: delete its object here (the locale text can stay unused).
 */

export interface PortfolioItem {
  /** Stable identifier. Also used as the i18n key: portfolio.cards.<id>.title/category/subtitle */
  id: string;
  /** Screenshot or logo shown inside the laptop mockup — path in /public. */
  image?: string;
  /**
   * Intrinsic pixel size of `image`. Required so next/image can compute the
   * right aspect ratio — CSS still controls the on-screen size (`object-fit`).
   * Only used when `imageFit` is 'contain'; the 'cover' layout fills its frame
   * via `fill` and ignores these.
   */
  imageWidth?: number;
  imageHeight?: number;
  /** How `image` fits its frame: 'cover' for a website screenshot, 'contain' for a logo. */
  imageFit?: 'cover' | 'contain';
  /** Logo has a transparent/dark background and needs a white backing chip to stay legible. */
  logoOnWhite?: boolean;
  /** Optional live URL. When set, the card's arrow icon and "view site" link become clickable. */
  link?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'tdyu',
    image: '/logo-tdyu.png',
    imageWidth: 1672,
    imageHeight: 941,
    link: undefined,
  },
  {
    id: 'hambi',
    image: '/logo-hambi.png',
    imageWidth: 1672,
    imageHeight: 941,
    link: undefined,
  },
  {
    id: 'smartloc',
    image: '/logo-smartloc.png',
    imageWidth: 1672,
    imageHeight: 941,
    link: undefined,
  },
];
