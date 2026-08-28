/**
 * The homepage is five full-viewport photographs. Content lives here so the
 * page component stays about composition.
 *
 * Photography is licensed stock, used as atmosphere only. No panel captions a
 * building as Primestone's work — see PRODUCT.md: no photograph of a completed
 * Primestone project exists, and none may be implied.
 */

export type Panel = {
  id: string
  image: string
  /** Focal point kept in frame as the crop changes across viewports. */
  position: string
  eyebrowless: true
  heading: string
  body?: string
  items?: string[]
}

export const PANELS: Panel[] = [
  {
    id: "distance",
    image: "panel-distance",
    position: "50% 62%",
    eyebrowless: true,
    heading: "You are building at home.\nYou are not at home.",
    body: "Residential, commercial and civil construction in The Gambia — for people making the decisions from another country.",
  },
  {
    id: "build",
    image: "panel-build",
    position: "50% 55%",
    eyebrowless: true,
    heading: "What we build",
    items: [
      "Residential construction",
      "Commercial construction",
      "Renovation and remodelling",
      "Civil engineering",
      "Site development",
      "Custom builds",
    ],
  },
  {
    id: "process",
    image: "panel-process",
    position: "50% 50%",
    eyebrowless: true,
    heading: "You will not be\nleft guessing.",
    body: "You are not on the site, so ask us for what you need and we will send it — photographs of where the work has reached, what was done, what is holding it up. Ask on WhatsApp and we answer during Gambian working hours.",
  },
  {
    id: "people",
    image: "panel-people",
    position: "50% 45%",
    eyebrowless: true,
    heading: "A person answers.\nNot a form.",
    body: "We are at Turntable, Brusubi. You can call the same two numbers that are on every page of this site, and the same people pick up.",
  },
  {
    id: "place",
    image: "panel-place",
    position: "50% 55%",
    eyebrowless: true,
    heading: "Tell us what you\nare building.",
    body: "Send the plot, the plan, or just the idea. We will tell you what it takes.",
  },
]

/**
 * CC BY-SA requires visible attribution. This is a licence obligation, not a
 * nicety — it is surfaced at /credits and linked from the menu.
 */
export const PHOTO_CREDITS = [
  { file: "panel-distance", title: "Maison en construction à keur mbaye diakhaté", author: "Deyonro23", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Maison_en_construction_%C3%A0_keur_mbaye_diakhat%C3%A9.jpg" },
  { file: "panel-build", title: "Plusieurs maison en construction à keur mbaye diakhaté", author: "Deyonro23", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Plusieurs_maison_en_construction_%C3%A0_keur_mbaye_diakhat%C3%A9.jpg" },
  { file: "panel-process", title: "Brick factory", author: "Fatih Bilen", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Brick_factory.jpg" },
  { file: "panel-people", title: "Moulding Bricks", author: "Susan565", licence: "CC0", licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/", source: "https://commons.wikimedia.org/wiki/File:Moulding_Bricks.jpg" },
  { file: "panel-place", title: "House in Serrekunda, Gambia", author: "Wolltanz", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:House_in_serrekunda_Gambia.jpg" },
  { file: "panel-about", title: "Banjul", author: "Atamari", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Banjul_001_atamari.JPG" },
  { file: "panel-services", title: "Building Under Construction in Awka", author: "Johnnybam", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Building_Under_Construction_in_Awka.jpg" },
  { file: "panel-projects", title: "Bamboo Scaffolding for Painting Work in Awka", author: "Johnnybam", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Bamboo_Scaffolding_for_Painting_Work_in_Awka.jpg" },
  { file: "panel-team", title: "Construction site workers in Embu, Kenya", author: "Mugambi Muriuki", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/Category:Construction_in_Kenya" },
  { file: "panel-quote", title: "Construction site workers in Embu, Kenya", author: "Mugambi Muriuki", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/Category:Construction_in_Kenya" },
  { file: "panel-contact", title: "Street in Banjul", author: "Demian", licence: "CC BY 2.0", licenceUrl: "https://creativecommons.org/licenses/by/2.0/", source: "https://commons.wikimedia.org/wiki/File:Street_in_Banjul_(3407998326).jpg" },
  { file: "svc-civil", title: "Asphalt paving", author: "Sammya Nig Ltd", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Asphalt_paving.jpg" },
]

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Request a quote" },
]
