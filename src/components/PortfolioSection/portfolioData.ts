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
  /** How `image` fits its frame: 'cover' for a website screenshot, 'contain' for a logo. */
  imageFit?: 'cover' | 'contain';
  /** Optional live URL. When set, the card's arrow icon and "view site" link become clickable. */
  link?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'tdyu',
    image: '/tdyu.png',
    imageFit: 'contain',
    link: undefined,
  },
  {
    id: 'hambi',
    image: '/hambi.png',
    imageFit: 'contain',
    link: undefined,
  },
  {
    id: 'smartloc',
    image: '/smartloc.png',
    imageFit: 'contain',
    link: undefined,
  },
];
