/**
 * Portfolio content config.
 *
 * — To REORDER cards: change the order of items in this array (top = first card).
 * — To EDIT a card's title/description: edit the matching key in
 *   src/locales/{ru,en,uz}.json under "portfolio.cards.<id>".
 * — To ADD a card: push a new object here with a unique `id`, then add the
 *   matching "portfolio.cards.<id>" block to all three locale files.
 * — To REMOVE a card: delete its object here (the locale text can stay unused).
 */

export type PortfolioVisual = 'image' | 'chart' | 'cube' | 'timeline';

export interface PortfolioItem {
  /** Stable identifier. Also used as the i18n key: portfolio.cards.<id>.title/desc */
  id: string;
  /** Which graphic to render on the card. */
  visual: PortfolioVisual;
  /** Screenshot/logo path in /public — required when visual is 'image'. */
  image?: string;
  /** Short badge shown above the title, e.g. "Ed-tech · Med-tech". Optional. */
  tag?: string;
  /** Optional external link (case study, live product, etc). Renders a CTA when set. */
  link?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'beelineHambi',
    visual: 'image',
    image: '/beeline1.png',
    tag: 'Ed-tech · Med-tech',
  },
  {
    id: 'akfaMedline',
    visual: 'image',
    image: '/akfa-medline.png',
    tag: 'Healthcare · RAG',
  },
  {
    id: 'impact',
    visual: 'chart',
  },
  {
    id: 'solutions',
    visual: 'cube',
  },
  {
    id: 'process',
    visual: 'timeline',
  },
];
