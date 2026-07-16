// Homepage replica content — snapshot of www.mazdausa.com taken 2026-07-16.
// Campaign copy/prices are frozen at capture time. All non-POC links point at
// the live site (opened in a new tab); internal POC routes are marked internal.
const M = "https://www.mazdausa.com";

export const EXTERNAL = {
  seeOffers: `${M}/shopping-tools/special-offers-and-incentives`,
  findADealer: `${M}/find-a-dealer`,
  buildAndPrice: `${M}/shopping-tools/build-and-price`,
  inventory: `${M}/shopping-tools/inventory/results`,
  requestAQuote: `${M}/shopping-tools/request-a-quote`,
  testDrive: `${M}/shopping-tools/reserve-a-test-drive`,
};

export const VEHICLES = [
  {
    id: "cx-5", name: "MAZDA CX-5", year: "2026", price: "$29,990", priceSup: "1",
    mpg: "26 MPG combined", mpgSup: "2", seats: "5 Passengers", trim: "",
    categories: ["suv"],
    exploreUrl: `${M}/vehicles/cx-5#/26CX5`, buildUrl: `${M}/shopping-tools/build-and-price#/26CX5`,
    poster: "/mazda/siteassets/vehicles/2026/cx-5/04_btv/009_model-discovery/images/2026-cx-5-model-discovery.png",
    video: "/mazda/siteassets/vehicles/2026/cx-5/04_btv/009_model-discovery/video/2026-cx-5-model-discovery.mp4",
    sprite: "/mazda/siteassets/vehicles/2026/cx-5/04_btv/002_sprites/model-selector/trim---hero-color/my26-2-5-premiumplus-soulred-animatedms.png",
    navExplore: `${M}/vehicles/cx-5`, navBuild: `${M}/shopping-tools/build-and-price#/26CX5`,
  },
  {
    id: "cx-70", name: "MAZDA CX-70", year: "2026", price: "$42,750", priceSup: "3",
    mpg: "25 MPG combined", mpgSup: "4", seats: "5 Passengers", trim: "Inline 6 Turbo",
    categories: ["suv"],
    exploreUrl: `${M}/vehicles/cx-70`, buildUrl: `${M}/shopping-tools/build-and-price#/26C70`,
    poster: "/mazda/siteassets/vehicles/2026/cx-70/04_btv/009_model-discovery/images/my26-cx70-model-discovery.jpg",
    video: "/mazda/siteassets/vehicles/2026/cx-70/04_btv/009_model-discovery/video/video-vehicle-card-cx-70.mp4",
    sprite: "/mazda/siteassets/vehicles/2026/cx-70/04_btv/002_sprites/model-selector/turbo-3-premium---jetblack/my26-cx70-3-3-turbo-s-premium-plus-jetblack-animatedms.png",
    navExplore: `${M}/vehicles/cx-70`, navBuild: `${M}/shopping-tools/build-and-price#/26C70`,
  },
  {
    id: "cx-90", name: "MAZDA CX-90", year: "2026", price: "$39,300", priceSup: "5",
    mpg: "25 MPG combined", mpgSup: "6", seats: "8 Passengers", seatsSup: "27", trim: "Inline 6 Turbo", seatsPrefix: "Seating up to",
    categories: ["suv"],
    exploreUrl: `${M}/vehicles/cx-90#/26C90`, buildUrl: `${M}/shopping-tools/build-and-price#/26C90`,
    poster: "/mazda/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-inline/009_model-discovery/image/mazda-cx-90-suv.jpg",
    posterAlt: "Mazda CX-90 SUV",
    video: "/mazda/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-inline/009_model-discovery/video/mazda-cx-90-suv.mp4",
    sprite: "/mazda/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-inline/002_sprites/model-selector/my25-cx90-inline-turbo-s-premium-plus-artisan-red-ms.png",
    navExplore: `${M}/vehicles/cx-90`, navBuild: `${M}/shopping-tools/build-and-price#/26C90`,
  },
  {
    id: "cx-30", name: "MAZDA CX-30", year: "2026", price: "$26,375", priceSup: "7",
    mpg: "27 MPG combined", mpgSup: "8", seats: "5 Passengers", trim: "",
    categories: ["suv"],
    exploreUrl: `${M}/vehicles/cx-30`, buildUrl: `${M}/shopping-tools/build-and-price#/26C30`,
    poster: "/mazda/siteassets/vehicles/2026/cx-30/04_btv/009_model-discovery/images/my26-image-vehicle-card-cx-30.jpg",
    video: "/mazda/siteassets/vehicles/2025/cx-30/04_btv/009_model-discovery/video/mazda-cx-30-crossover-suv.mp4",
    sprite: "/mazda/siteassets/vehicles/2026/cx-30/04_btv/002_sprites/model-selector/trim---hero-color/my26-cx30-2-5-turbo-premium-plus-polymetal-gray-animatedms.png",
    navExplore: `${M}/vehicles/cx-30`, navBuild: `${M}/shopping-tools/build-and-price#/26C30`,
  },
  {
    id: "cx-50", name: "MAZDA CX-50", year: "2026", price: "$29,900", priceSup: "9",
    mpg: "26 MPG combined", mpgSup: "10", seats: "5 Passengers", trim: "",
    categories: ["suv"],
    exploreUrl: `${M}/vehicles/cx-50`, buildUrl: `${M}/shopping-tools/build-and-price#/26C50`,
    poster: "/mazda/siteassets/vehicles/2026/cx-50/04_btv/009_model-discovery/images/2026-cx-50-discovery-thumb.jpg",
    video: "/mazda/siteassets/vehicles/2026/cx-50/04_btv/009_model-discovery/video/2026-cx-50-discovery-video.mp4",
    sprite: "/mazda/siteassets/vehicles/2026/cx-50/04_btv/002_sprites/model-selector/new-12.18-premium-plus/my26-cx50-2-5-turbo-premiumplus-polymetalgray-animatedms.png",
    navExplore: `${M}/vehicles/cx-50`, navBuild: `${M}/shopping-tools/build-and-price#/26C50`,
  },
  {
    id: "cx-50-hybrid", name: "Mazda CX-50 Hybrid", navName: "CX-50 HYBRID", year: "2026", price: "$34,750", priceSup: "11",
    mpg: "38 MPG combined", mpgSup: "12", seats: "5 Passengers", trim: "",
    categories: ["suv", "electrified"],
    exploreUrl: `${M}/vehicles/cx-50-hybrid`, buildUrl: `${M}/shopping-tools/build-and-price#/2650H`,
    poster: "/mazda/siteassets/vehicles/2026/cx-50-hybrid/04_btv/009_model-discovery/images/2026-cx-50-hybrid-discovery-thumb.jpg",
    video: "/mazda/siteassets/vehicles/2026/cx-50-hybrid/04_btv/009_model-discovery/video/2026-cx-50-hybrid-discovery-video.mp4",
    sprite: "/mazda/siteassets/vehicles/2025/cx-50-hybrid/04_btv/002_sprites/model-selector/hybrid-premium-plus/2025-cx50-hybrid-premium-plus-wind-chill-pearl-animatedms.png",
    navExplore: `${M}/vehicles/cx-50-hybrid`, navBuild: `${M}/shopping-tools/build-and-price#/2650H`,
  },
  {
    id: "cx-90-phev", name: "MAZDA CX-90 PHEV", year: "2026", price: "$50,695", priceSup: "13",
    mpg: "56 MPGe combined", mpgSup: "14", seats: "7 Passengers", seatsSup: "29", trim: "Plug-in Hybrid",
    categories: ["suv", "electrified"],
    exploreUrl: `${M}/vehicles/cx-90-phev`, buildUrl: `${M}/shopping-tools/build-and-price#/26C9P`,
    poster: "/mazda/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-phev/009_model-discovery/image/mazda-cx-90-phev-suv.jpg",
    posterAlt: "Mazda-CX-90-PHEV-SUV",
    video: "/mazda/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-phev/009_model-discovery/video/mazda-cx-90-phev-suv.mp4",
    sprite: "/mazda/siteassets/vehicles/2025/cx-90--cx-90-phev/06_btv/cx-90-phev/002_sprites/model-selector/my25-cx90-phev-premium-plus-rhodium-white-ms.png",
    navExplore: `${M}/vehicles/cx-90-phev`, navBuild: `${M}/shopping-tools/build-and-price#/26C9P`,
  },
  {
    id: "cx-70-phev", name: "MAZDA CX-70 PHEV", year: "2026", price: "$44,450", priceSup: "15",
    mpg: "61 MPGe combined", mpgSup: "14", seats: "5 Passengers", trim: "Plug-in Hybrid",
    categories: ["suv", "electrified"],
    exploreUrl: `${M}/vehicles/cx-70-phev`, buildUrl: `${M}/shopping-tools/build-and-price#/26C7P`,
    poster: "/mazda/siteassets/vehicles/2026/cx-70-phev/04_btv/009_model-discovery/images/my26-cx70-phev-homepage-vehicle-cards.jpg",
    video: null,
    sprite: "/mazda/siteassets/vehicles/2026/cx-70-phev/04_btv/002_sprites/model-selector/phev-sc-plus---rhodium-white/my26-cx70-phev-sc-plus-rhodiumwhite-animatedms.png",
    navExplore: `${M}/vehicles/cx-70-phev`, navBuild: `${M}/shopping-tools/build-and-price#/26C7P`,
  },
  {
    id: "mazda3-hatchback", name: "MAZDA3 HATCHBACK", year: "2026", price: "$25,650", priceSup: "16",
    mpg: "29 MPG combined", mpgSup: "17", seats: "5 Passengers", trim: "",
    categories: ["sedan"],
    exploreUrl: `${M}/vehicles/mazda3-hatchback`, buildUrl: `${M}/shopping-tools/build-and-price#/26M3H`,
    poster: "/mazda/siteassets/vehicles/2026/mazda3-hatchback/04_btv/009_model-discovery/image-carryover/mazda-3-hatchback.jpg",
    posterAlt: "Mazda 3 Hatchback",
    video: "/mazda/siteassets/vehicles/2026/mazda3-hatchback/04_btv/009_model-discovery/video-carryover/mazda-3-hatchback.mp4",
    sprite: "/mazda/siteassets/vehicles/2026/mazda3-hatchback/04_btv/002_sprites/model-selector/2.5-s-turbo-premium-plus---soul-red-crystal/my25-m3hb-2-5-turbo-premium-plus-soulredcrystal-metallic-animatedms.png",
    navExplore: `${M}/vehicles/mazda3-hatchback`, navBuild: `${M}/shopping-tools/build-and-price#/26M3H`,
  },
  {
    id: "mazda3-sedan", name: "MAZDA3 SEDAN", year: "2026", price: "$24,650", priceSup: "18",
    mpg: "30 MPG combined", mpgSup: "19", seats: "5 Passengers", trim: "",
    categories: ["sedan"],
    exploreUrl: `${M}/vehicles/mazda3-sedan`, buildUrl: `${M}/shopping-tools/build-and-price#/26M3S`,
    poster: "/mazda/siteassets/vehicles/2026/mazda3-sedan/04_btv/010_special-offers-refresh/a_desktop/m3s-desktop.png",
    video: "/mazda/siteassets/vehicles/2026/mazda3-sedan/04_btv/010_special-offers-refresh/a_desktop/video-vehicle-card-m3-sedan_cut.mp4",
    sprite: "/mazda/siteassets/vehicles/2025/mazda3-sedan/04_btv/002_sprites/model/my25-m3-sedan-turbo-premium-plus-polymental-gray-ms.png",
    navExplore: `${M}/vehicles/mazda3-sedan`, navBuild: `${M}/shopping-tools/build-and-price#/26M3S`,
  },
  {
    id: "mx-5-miata", name: "MAZDA MX-5 MIATA", year: "2026", price: "$30,430", priceSup: "20",
    mpg: "29 MPG combined", mpgSup: "21", seats: "2 Passengers", trim: "",
    categories: ["sports"],
    exploreUrl: `${M}/vehicles/mx-5-miata`, buildUrl: `${M}/shopping-tools/build-and-price#/26MX5`,
    poster: "/mazda/siteassets/vehicles/2026/mx-5-st/04_btv/009_model-discovery/image/2026-mazda-mx-5-miata-convertible-car.jpg",
    posterAlt: "2026 Mazda MX-5 Miata Convertible Car",
    video: "/mazda/siteassets/vehicles/2026/mx-5-st/04_btv/009_model-discovery/video/2026-mazda-mx-5-miata-convertible-car.mp4",
    sprite: "/mazda/siteassets/vehicles/2026/mx-5-st/04_btv/002_sprites/model-selector/grand-touring---aero-gray/my26-mx-5-st-gt-aerogray-animatedms.png",
    navExplore: `${M}/vehicles/mx-5-miata`, navBuild: `${M}/shopping-tools/build-and-price#/26MX5`,
  },
  {
    id: "mx-5-miata-rf", name: "MAZDA MX-5 MIATA RF", year: "2026", price: "$38,450", priceSup: "23",
    mpg: "29 MPG combined", mpgSup: "22", seats: "2 Passengers", trim: "",
    categories: ["sports"],
    exploreUrl: `${M}/vehicles/mx-5-miata-rf`, buildUrl: `${M}/shopping-tools/build-and-price#/26MXR`,
    poster: "/mazda/siteassets/vehicles/2026/mx-5-rf/04_btv/010_model-discovery/image/2026-mazda-mx-5-miata-rf-convertible-car.jpg",
    posterAlt: "2026 Mazda MX-5 Miata RF Convertible Car",
    video: "/mazda/siteassets/vehicles/2026/mx-5-rf/04_btv/010_model-discovery/video/2026-mazda-mx-5-miata-rf-convertible-car.mp4",
    sprite: "/mazda/siteassets/vehicles/2026/mx-5-rf/04_btv/002_sprites/model-selector/grand-touring---soul-red/2026-mx5-rf-gt-soulred-animatedms.png",
    navExplore: `${M}/vehicles/mx-5-miata-rf`, navBuild: `${M}/shopping-tools/build-and-price#/26MXR`,
  },
];

export const VEHICLE_CATEGORIES = [
  { key: "all", label: "ALL" },
  { key: "suv", label: "Crossovers & SUVs" },
  { key: "electrified", label: "ELECTRIFIED" },
  { key: "sedan", label: "SEDANS & HATCHBACKS" },
  { key: "sports", label: "SPORTS CARS" },
];

// ---------- Header mega menus ----------
export const VEHICLES_MENU = {
  quickLinks: [
    ["Build And Price", EXTERNAL.buildAndPrice],
    ["Search Inventory", EXTERNAL.inventory],
    ["Request A Quote", EXTERNAL.requestAQuote],
    ["Find A Dealer", EXTERNAL.findADealer],
    ["Special Offers", EXTERNAL.seeOffers],
    ["Schedule A Test Drive", EXTERNAL.testDrive],
    ["Certified Pre-Owned", `${M}/certified-pre-owned`],
  ],
  tout: {
    img: "/mazda/siteassets/images/01_musa-homepage-redesign/001_homepage-hero/2026/03_march/desktop/main-nav-shopping-desktop-v3.jpg",
    text: "Mazda ranked Safest New-Car Brand by Consumer Reports",
    sub: "Consumer Reports does not endorse products or services.",
    cta: ["LEARN MORE", `${M}/the-mazda-difference/safety`],
  },
};

export const SHOPPING_MENU = [
  {
    title: "EXPLORE",
    links: [
      ["Build and Price", EXTERNAL.buildAndPrice],
      ["Keep Me Updated", `${M}/keep-me-updated`],
    ],
    tout: {
      img: "/mazda/siteassets/global-nav/shopping-tools/01_explore-tout/build-and-price-your-vehicle-2025-mazda-cx-90.jpg",
      alt: "Build and Price Your Vehicle – 2025 Mazda CX-90",
      text: "2026 MAZDA CX-90",
      cta: ["BUILD YOURS", `${M}/shopping-tools/build-and-price#/26C90`],
    },
  },
  {
    title: "SHOP",
    links: [
      ["Inventory Search", `${M}/shopping-tools/inventory/results?c=n`],
      ["Request a Quote", EXTERNAL.requestAQuote],
      ["Reserve a Test Drive", EXTERNAL.testDrive],
      ["Certified Pre-Owned", `${M}/shopping-tools/inventory/results?c=c#cond=c`],
    ],
    tout: {
      img: "/mazda/siteassets/global-nav/shopping-tools/02_shop-tout/view-inventory-find-your-next-mazda.jpg",
      alt: "View Inventory – Find Your Next Mazda",
      text: "FIND YOUR NEXT MAZDA",
      cta: ["VIEW INVENTORY", EXTERNAL.inventory],
    },
  },
  {
    title: "BUY",
    links: [
      ["Special Offers", EXTERNAL.seeOffers],
      ["Payment Estimator", `${M}/shopping-tools/payment-estimator`],
      ["Apply For Financing", `${M}/shopping-tools/apply-for-financing`],
    ],
    tout: {
      img: "/mazda/siteassets/global-nav/shopping-tools/03_buy-tout/view-mazda-special-offers-and-incentives.jpg",
      alt: "View Mazda Special Offers and Incentives",
      text: "0% APR FOR 36 MONTHS PLUS NO PAYMENTS FOR 90 DAYS ON SELECT 2026 MODELS",
      textSup: "32",
      cta: ["VIEW OFFERS", EXTERNAL.seeOffers],
    },
  },
];

export const DRIVES_MENU = [
  {
    title: "THE MAZDA DIFFERENCE",
    text: "See how our unique perspective creates our exceptional vehicles.",
    img: "/mazda/siteassets/global-nav/what-drives-us-mazda-difference/nav-touts/01_the-mazda-difference/the-mazda-difference-creating-exceptional-vehicles.jpg",
    alt: "The Mazda Difference – Creating Exceptional Vehicles",
    cta: ["DISCOVER", `${M}/the-mazda-difference`],
  },
  {
    title: "MAZDA CENTRAL",
    text: "Get news and insights on the topics that matter to you.",
    img: "/mazda/siteassets/global-nav/what-drives-us-mazda-difference/nav-touts/02_mazda-central/mazda-central-explore-topics-that-matter-to-you.jpg",
    alt: "Mazda Central – Explore Topics that Matter to You",
    cta: ["EXPLORE", `${M}/discover`],
  },
];

export const OWNERS_MENU = [
  {
    title: "Maintaining Your Mazda",
    links: [
      ["Service", `${M}/owners/service`],
      ["Warranty", `${M}/owners/warranty`],
      ["Recalls", `${M}/owners/recalls`],
      ["How to Use", `${M}/owners/how-to-use-my-mazda`],
    ],
    tout: {
      img: "/mazda/siteassets/global-nav/owners/01_maintaining-your-mazda/maintaining-your-mazda-vehicle-find-a-service-dealer-near-you.jpg",
      alt: "Maintaining Your Mazda Vehicle – Find a Service Dealer Near You",
      text: "Find a service dealer near you and make your next appointment.",
      cta: ["SCHEDULE YOURS", `${M}/owners/service`],
    },
  },
  {
    title: "Making it Yours",
    links: [
      ["Accessories", `${M}/owners/accessories`],
      ["Parts", `${M}/owners/parts`],
      // POC: FAQs routes to the internal Connected Services FAQ landing.
      ["FAQs", "/faq", { internal: true }],
    ],
    tout: {
      img: "/mazda/siteassets/global-nav/owners/02_making-it-yours/nav-owners-02-desktop.jpg",
      alt: "Explore Mazda Accessories",
      text: "Find the latest MAZDA accessories for your next adventure.",
      cta: ["EXPLORE", `${M}/owners/accessories`],
    },
  },
];

export const OWNERS_MYMAZDA = {
  img: "/mazda/siteassets/global-nav/owners/03_mymazda-login/mymazda-sign-in.jpg",
  alt: "MyMazda Sign In",
  text: "Go to MyMazda to enjoy the full benefits of being a Mazda Owner and visit the Mazda Owner’s Club for badges, exclusive content, and more.",
  login: ["LOGIN", "http://www.mymazda.com/"],
  register: ["REGISTER", "http://www.mymazda.com/"],
};

export const SEARCH_OVERLAY = {
  recommended: [
    "What does PHEV mean?",
    "Local Incentives",
    "Car Manuals",
    "Apple CarPlay",
    "Skyactive",
  ],
  shortcuts: [
    ["Search Inventory", EXTERNAL.inventory, ""],
    ["Request A Quote", EXTERNAL.requestAQuote, ""],
    ["Build And Price", EXTERNAL.buildAndPrice, ""],
  ],
  articles: [
    {
      eyebrow: "Community",
      title: "A MAZDA MX-5 OWNER 25 YEARS IN THE MAKING",
      img: "/mazda/siteassets/images/content-hub/articles/community/a-mazda-mx-5-owner-25-years-in-the-making/an-mx-5-owner-25-years-in-the-making_5-d.jpg",
      alt: "Joe Schlueter with his Mazda MX-5 Miata",
      href: `${M}/discover/an-mx-5-owner-25-years-in-the-making`,
    },
    {
      eyebrow: "Community",
      title: "MIATA FANATIC GETS FIRST MX-5 MIATA RF",
      sub: "David Putter Claims His 16th Mazda",
      img: "/mazda/siteassets/images/content-hub/articles/community/miata-fanatic-gets-first-mx-5-miata-rf/miata-fanatic-gets-first-mx-5-miata-rf3-desktop-v2.jpg",
      href: `${M}/discover/miata-fanatic-gets-first-mx-5-miata-rf`,
    },
    {
      eyebrow: "Community",
      title: "MAZDA AND NATIONAL GEOGRAPHIC’S PHOTOGRAPHY QUEST",
      sub: "Introducing, Assignment: Inspiration",
      img: "/mazda/siteassets/images/content-hub/articles/community/mazda-and-national-geographics-photography-quest/mazda-and-national-geographic-partner-on-photography-quest_nat-geo-desktop-v2.jpg",
      href: M,
    },
    {
      eyebrow: "Community",
      title: "MEET THE MAN BEHIND MAZDA’S HERITAGE COLLECTION",
      sub: "Randy Miller keeps Mazda's historic cars ready for driving",
      img: "/mazda/siteassets/images/content-hub/articles/community/meet-the-man-behind-mazdas-heritage-collection/meet-man-in-charge-mazdas-heritage-collection_rnady-miller_rd-photos-7934_desktop.jpg",
      href: M,
    },
  ],
  exploreMore: ["Explore More", `${M}/discover`],
};

// ---------- Page sections ----------
export const HERO = {
  video: "/mazda/siteassets/video/more-to-move-you/2026-sse-desktop-video-hero.mp4",
  poster: "/mazda/contentassets/6491a36225a34ffb994ef18403ce164b/2026-sse-desktop-video-hero-fo.jpg",
  title: "THE MORE TO MOVE YOU SALES EVENT",
  cta: ["SEE OFFERS", EXTERNAL.seeOffers],
};

export const SHOPPING_TOOLS = [
  {
    title: "BUILD & PRICE", href: EXTERNAL.buildAndPrice,
    img: "/mazda/siteassets/vehicles/shopping-icons/test/build-and-price-your-mazda.png",
    alt: "Build & Price your Mazda",
  },
  {
    title: "SPECIAL OFFERS", href: EXTERNAL.seeOffers,
    img: "/mazda/siteassets/vehicles/shopping-icons/test/mazda-special-offers.png",
    alt: "Mazda Special Offers",
  },
  {
    title: "FIND A DEALER", href: EXTERNAL.findADealer,
    img: "/mazda/siteassets/vehicles/shopping-icons/test/find-a-mazda-dealer.png",
    alt: "Find a Mazda Dealer",
  },
  {
    title: "SCHEDULE A DRIVE", href: EXTERNAL.testDrive,
    img: "/mazda/siteassets/vehicles/shopping-icons/test/schedule-a-mazda-test-drive.png",
    alt: "Schedule a Mazda Test Drive",
  },
];

export const SAFETY = {
  eyebrow: "SAFETY",
  title: "DRIVING FORWARD WITH CONFIDENCE",
  text: "Our dedication to safety meets our drive to innovate in a proactively integrated suite of advanced safety features. Each one is engineered to help keep you and your passengers safe—without compromising your drive.",
  awardImg: "/mazda/siteassets/images/01_musa-homepage-redesign/09_safety/desktop/2026-homepage-desktop-consumer-reports-fwbi.jpg",
  awardAlt: "Consumer Reports - Safest New-Car Brand",
  cardImg: "/mazda/siteassets/images/01_musa-homepage-redesign/001_homepage-hero/2026/03_march/desktop/Mazda-Named-Safest-New-Car-Brand-by-Consumer-Reports.jpg",
  cardAlt: "Mazda Named Safest New-Car Brand by Consumer Reports",
  cardDisclaimer: "Consumer Reports does not endorse products or services.",
  cardTitle: "COMMITTED TO SAFETY",
  cardText: [
    "Mazda has been named the Safest New-Car Brand by ",
    "Consumer Reports",
    " magazine. This distinction highlights the brand's commitment to driver and passenger protection. Through thoughtful design and advanced safety technologies, Mazda continues to raise the bar for confidence on every journey.",
  ],
  cardCta: ["LEARN MORE", `${M}/siteassets/images/01_musa-homepage-redesign/001_homepage-hero/2026/03_march/desktop/cr_2026safestcarbrands.pdf`],
};

export const OFFERS = {
  eyebrow: "YOUR JOURNEY BEGINS",
  title: "GET STARTED WITH SAVINGS",
  text: "If you’re ready to Move and Be Moved, your local Mazda dealership is a great place to start. They’ll answer any questions you have and can give you access to the exclusive deals and offers that will make Mazda ownership more affordable.",
  heading: "SPECIAL OFFERS",
  slides: [
    {
      text: "UP TO $5,000 CUSTOMER CASH ON SELECT CROSSOVER SUVS",
      sup: "24",
      img: "/mazda/siteassets/images/02_musa-special-offers-hero-carousel/2026/07_july/cx-70-special-offers-desktop.jpg",
      ctas: [["SEE OFFERS", EXTERNAL.seeOffers]],
    },
    {
      text: "$3,000 CUSTOMER CASH ON A 2026 MAZDA CX-70",
      sup: "25",
      img: "/mazda/siteassets/images/02_musa-special-offers-hero-carousel/2026/04_april/my26-cx70-phev-incentives-carrousel-desktop.jpg",
      ctas: [
        ["VIEW THE MAZDA CX-70", `${M}/vehicles/cx-70`],
        ["SEE OFFERS", `${M}/shopping-tools/special-offers-and-incentives#2026-cx-70`],
      ],
    },
    {
      text: "0% APR for 72 MONTHS PLUS DEFERRED PAYMENTS FOR 90 DAYS ON A 2026 MAZDA CX-90 PHEV",
      sup: "26",
      img: "/mazda/siteassets/images/02_musa-special-offers-hero-carousel/2026/02_february/my26_cx-90_phev_special-offers_home-page_desktop.jpg",
      ctas: [
        ["VIEW THE MAZDA CX-90 PHEV", `${M}/vehicles/cx-90-phev`],
        ["SEE OFFERS", `${M}/shopping-tools/special-offers-and-incentives#2026-cx-90-phev`],
      ],
    },
  ],
};

export const ELECTRIFICATION = {
  eyebrow: "ENHANCED BY INNOVATION",
  title: "EMBRACING THE ROAD AHEAD",
  img: "/mazda/siteassets/images/01_musa-homepage-redesign/004_technology/a_5050-1/08_august/02_desktop/2026-cx-90-phev-owner-50-50-left.jpg",
  cardTitle: "MORE POWERTRAINS, MORE OPTIONS.",
  cardText: "As driving technology advances, Mazda is proud to offer hybrid models, plug-in hybrid EVs and more. Find the one that works best for you and your life.",
  cardCta: ["ELECTRIFICATION", `${M}/the-mazda-difference/electric-vehicles`],
  iihsVideo: "/mazda/siteassets/video/2025-iihs-top-safety-pick-/00_homepage/Mazda-Vehicles-2026-IIHS-Top-Safety-Pick-Plus-Award.mp4",
  iihsAlt: "Mazda Vehicles – 2026 IIHS Top Safety Pick+ Award",
  iihsTitle: "THERE'S A NEW LEADER IN SAFETY",
  iihsText: [
    "For the third year in a row, Mazda has debuted as the industry leader in the IIHS ",
    "TOP SAFETY PICK",
    "+ awards. The 2026 Mazda CX-30, CX-50 and CX-50 Hybrid, CX-70, CX-70 Plug-in Hybrid, CX-90, CX-90 Plug-in Hybrid, Mazda3 Hatchback, and Mazda3 Sedan have all won 2026 IIHS ",
    "TOP SAFETY PICK",
    "+ awards.",
  ],
  iihsLink: ["www.iihs.org", "http://www.iihs.org"],
  iihsCta: ["FOCUS ON SAFETY", `${M}/the-mazda-difference/safety`],
};

export const MIATA = {
  img: "/mazda/siteassets/vehicles/2026/mx-5-st/01_vlp/000_hero/fwbihomepage/desktop/2026-mazda-mx-5-miata-convertible-roadster_d.jpg",
  alt: "2026 Mazda MX-5 Miata Convertible Roadster",
  eyebrow: "CONNECTION THROUGH EVERY CURVE",
  title: "THE 2026 MAZDA MX-5 MIATA",
  text: "Designed for balance and agility, the MX-5 Miata delivers responsive performance and a natural connection to the road.",
  cta: ["EXPLORE", `${M}/vehicles/mx-5-miata`],
};

export const DEALER = {
  img: "/mazda/siteassets/images/01_musa-homepage-redesign/006_incentives/b_5050/desktop/find-your-local-mazda-dealer.jpg",
  alt: "Find Your Local Mazda Dealer",
  title: "FIND INSPIRATION AT YOUR LOCAL DEALER",
  text: "At your local Mazda dealership, you can explore our lineup, discover new offers, and feel what it’s like to get behind the wheel of your dream Mazda vehicle.",
  cta: ["LEARN MORE", EXTERNAL.findADealer],
};

export const OWNERSHIP = {
  eyebrow: "EMPOWERING MAZDA OWNERS",
  title: "ELEVATE YOUR OWNERSHIP EXPERIENCE",
  text: "Mazda drivers inspire us to excel, innovate and always improve–and so we’ve made every experience of ownership, from scheduling service to shopping for accessories, as easy and rewarding as driving one of our vehicles.",
  cards: [
    {
      img: "/mazda/siteassets/images/01_musa-homepage-redesign/007_owners/a_3-col-tout/mazda-owners.jpg",
      alt: "Mazda Owners",
      title: "MAZDA OWNERS LOGIN",
      text: "Go to MyMazda to enjoy the full benefits of being a Mazda Owner and the Mazda Owner’s Club.",
      cta: ["LOGIN OR REGISTER", "https://mymazda.com/MyMazda/welcome.action"],
    },
    {
      img: "/mazda/siteassets/images/01_musa-homepage-redesign/007_owners/a_3-col-tout/schedule-your-mazda-service.jpg",
      alt: "Schedule Your Mazda Service",
      title: "SCHEDULE SERVICE",
      text: "Find a service dealer near you and make your next appointment.",
      cta: ["SCHEDULE YOURS", `${M}/owners/schedule-service`],
    },
  ],
};

export const FOOTER_COLUMNS = [
  {
    title: "Shopping Tools",
    links: [
      ["BUILD AND PRICE", EXTERNAL.buildAndPrice],
      ["INVENTORY SEARCH", EXTERNAL.inventory],
      ["CERTIFIED PRE-OWNED", `${M}/shopping-tools/inventory/results?c=c#cond=c`],
      ["REQUEST A QUOTE", EXTERNAL.requestAQuote],
      ["SPECIAL OFFERS", EXTERNAL.seeOffers],
      ["Payment Estimator", `${M}/shopping-tools/payment-estimator`],
      ["APPLY FOR FINANCING", `${M}/shopping-tools/apply-for-financing`],
    ],
  },
  {
    title: "Vehicles",
    links: [
      ["ALL MAZDA VEHICLES", `${M}/vehicles`],
      ["CUVS", `${M}/cuv`],
      ["PHEV VEHICLES", `${M}/the-mazda-difference/electric-vehicles/plug-in-hybrids`],
      ["HYBRID VEHICLES", `${M}/the-mazda-difference/electric-vehicles/hybrids`],
      ["ELECTRIFIED VEHICLES", `${M}/the-mazda-difference/electric-vehicles`],
      ["COMPACT SUVS", `${M}/mazda-compact-subcompact-suvs`],
    ],
  },
  {
    title: "Other Mazda Sites",
    links: [
      ["MAZDA GLOBAL", "https://www.mazda.com/"],
      ["Mazda Foundation", "https://www.mazdafoundation.org/"],
      ["MOTORSPORTS", "https://www.mazdamotorsports.com/"],
      ["MAZDA RECALL INFO", "https://www.mazdarecallinfo.com/"],
      ["Mazda Stories", "https://mazdastories.com/"],
      ["MAZDA FINANCIAL SERVICES", "https://www.mazdafinancialservices.com/"],
      ["MAZDA PROTECTION PRODUCTS", "https://www.mazdafinancialservices.com/us/en/vehicle-protection/which-plan-is-right-for-you.html"],
    ],
  },
  {
    title: "About",
    links: [
      ["Mazda News", "https://news.mazdausa.com/media-home"],
      ["Careers", `${M}/site/careers`],
      ["Mazda Mobile Apps", `${M}/about-mazda/mobile-apps`],
      ["ESG & Sustainability", `${M}/the-mazda-difference/sustainability`],
      ["Resource Center", `${M}/resource-center`],
    ],
  },
  {
    title: "Help",
    links: [
      ["Accessibility", `${M}/accessibility`],
      ["Sitemap", `${M}/sitemap`],
      // POC: FAQ routes to the internal Connected Services FAQ landing.
      ["FAQ", "/faq", { internal: true }],
      ["Contact Us", `${M}/contact-us`],
      ["Dealer Directory", EXTERNAL.findADealer],
    ],
  },
];

export const FOOTER_LEGAL = [
  ["Terms and Conditions", `${M}/site/terms-of-use`],
  ["Privacy Policy", `${M}/site/privacy`],
  ["Manage Cookie Preferences", "#", { noop: true }],
  ["Do not sell or share my personal information", "https://privacy.mazdausa.com/us/request_opt_out_form"],
  ["How to disconnect remote vehicle access", "https://webpage.mazdausa.com/MazdaStatic/CVContactus.action"],
];

export const FOOTER_SOCIALS = [
  ["Facebook", "https://www.facebook.com/MazdaUSA", "M13 22v-8h2.7l.4-3H13V9.1c0-.9.2-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v8h3z"],
  ["YouTube", "https://www.youtube.com/user/mazdausa", "M23 12s0-3-.4-4.4c-.2-.8-.9-1.4-1.7-1.6C19.4 5.6 12 5.6 12 5.6s-7.4 0-8.9.4c-.8.2-1.5.8-1.7 1.6C1 9 1 12 1 12s0 3 .4 4.4c.2.8.9 1.4 1.7 1.6 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.8 1.7-1.6C23 15 23 12 23 12zm-13 3V9l5 3-5 3z"],
  ["X", "https://twitter.com/MazdaUSA", "M17.5 3h3l-6.6 7.6L21.8 21h-6l-4.7-6.1L5.7 21h-3l7-8L2.6 3h6.1l4.2 5.6L17.5 3zm-1.1 16h1.7L7.7 4.8H5.9L16.4 19z"],
  ["Instagram", "https://www.instagram.com/mazdausa/", "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z"],
  ["Threads", "https://www.threads.net/@mazdausa", "M12.7 11.1c.1 0 .2 0 .3.1 2.1.1 3.8.7 4.9 1.9 1 1.1 1.5 2.6 1.4 4.3-.2 3.2-2.7 5.3-6.4 5.6h-.9c-3 0-5.3-1-6.9-3C3.7 18.2 3 15.7 3 12.5v-.1c0-3.2.8-5.7 2.2-7.5 1.6-2 4-3 6.9-3h.9c2.9.2 5.1 1.3 6.5 3.2.6.8 1 1.7 1.3 2.7l-2 .6c-.2-.8-.6-1.5-1-2-1-1.4-2.6-2.1-4.8-2.3h-.8c-2.4 0-4.2.8-5.4 2.2C5.6 7.8 5 9.9 5 12.4v.1c0 2.6.6 4.6 1.7 6 1.2 1.5 3 2.3 5.4 2.3h.8c2.6-.2 4.3-1.5 4.4-3.6.1-1-.2-1.9-.8-2.5-.5-.5-1.2-.9-2.1-1.1-.1.9-.3 1.7-.7 2.4-.6 1-1.5 1.7-2.7 2-1 .3-2.1.2-3-.3-1-.6-1.7-1.6-1.7-2.8-.1-1.1.4-2.2 1.3-2.9.9-.7 2.1-1 3.6-1h1.5c0-.7-.2-1.2-.5-1.6-.4-.4-1-.7-1.7-.7h-.1c-.6 0-1.4.2-1.9.9l-1.6-1.1c.9-1.2 2.2-1.8 3.6-1.8h.1c2.4.1 3.9 1.5 4.1 3.9v.5zM10.4 15c0 .5.3.9.7 1.1.5.3 1.1.3 1.7.1.9-.2 1.5-.9 1.7-2 .1-.3.1-.7.1-1h-1.3c-2 0-2.9.6-2.9 1.8z"],
];
