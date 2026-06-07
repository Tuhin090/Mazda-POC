export const dashboardData = {
  user: {
    name: "Alex",
    avatar: "A",
    lastSynced: "4 minutes ago",
    date: "Tuesday, May 26, 2026",
  },

  vehicle: {
    selector: "2026 CX-5",
    name: "2026 MAZDA CX-5",
    trim: "2.5 S",
    // trim: "SOUL RED CRYSTAL · GRAND TOURING AWD",
    connected: true,
    image:
      "https://di-sitebuilder-assets.dealerinspire.com/Mazda/model-pages/2026/CX-5/gallery/1-xl.jpg",
    // image:
    //   "https://www.mazdausa.com/content/dam/musa/image-gallery/cx-5/tech-gallery-01.jpg",
    // image:
    //   "https://www.mazdausa.com/siteassets/vehicles/2026/mx-5-rf/04_btv/004_exterior/ext.-360s/club/46v-soul-red/e360-2026-mx5-rf-club-soulred-023.jpg#default?w=1480",
    vin: "JM3KFBCM5R0123456",
    odometer: "3,247 mi",
    warranty: "Active to 2029",
    warrantyActive: true,
    software: "v8.4.2",
    lastTrip: "12.4 mi · today",
    modelYear: "2026",
  },

  vehicleStatus: {
    fuel: { percent: 72, range: "284 mi range" },
    oilLife: { percent: 62, mileage: "~2,750 mi left" },
    doors: { status: "Locked", detail: "All 4 secured" },
    tirePressure: { value: "34 psi", detail: "All within range", ok: true },
    battery: { value: "12.6 V · Healthy" },
    exteriorLights: { status: "Off" },
  },

  subscription: {
    status: "TRIAL",
    endDate: "May 27, 2026",
    daysRemaining: 3,
    percentUsed: 97,
  },

  upcomingService: {
    month: "SEP",
    day: 18,
    title: "Oil & filter change",
    time: "9:30 AM · 45 min est.",
    dealer: "Mazda of Downtown",
    advisor: "J. Morales",
  },

  recentActivity: [
    { type: "trip", text: "Trip completed · 12.4 mi", time: "Today, 8:42 AM" },
    { type: "lock", text: "Doors locked remotely", time: "Today, 8:45 AM" },
    { type: "update", text: "Software updated to v8.4.2", time: "May 21, 2026" },
  ],

  quickActions: [
    { type: "remote", label: "Remote start" },
    { type: "locate", label: "Locate car" },
    { type: "service", label: "Book service" },
    { type: "manual", label: "Owner manual" },
    { type: "billing", label: "Billing" },
    { type: "support", label: "Support" },
  ],

  nav: ["DASHBOARD", "CONNECTED SERVICES", "SERVICE", "SUPPORT"],

  connectedServices: {
    trialStatus: "TRIAL",
    daysRemaining: 2,
    endDate: "May 27, 2026",
    footerNote: "Your trial ends on May 27, 2026. Upgrade to keep all Premier features active.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        price: "$10.99",
        period: "mo",
        description: "Essential remote & safety features",
        recommended: false,
        ctaLabel: "Choose Basic",
        features: [
          { label: "Remote Door Lock / Unlock", included: true },
          { label: "Vehicle Health Reports", included: true },
          { label: "SOS Emergency Alerts", included: true },
          { label: "Remote Engine Start", included: false },
          { label: "Stolen Vehicle Recovery", included: false },
          { label: "Wi-Fi Hotspot", included: false },
          { label: "Connected Navigation", included: false },
        ],
      },
      {
        id: "premier",
        name: "Premier",
        price: "$24.99",
        period: "mo",
        description: "Everything in Basic, plus full connectivity",
        recommended: true,
        ctaLabel: "Upgrade to Premier",
        features: [
          { label: "Remote Door Lock / Unlock", included: true },
          { label: "Vehicle Health Reports", included: true },
          { label: "SOS Emergency Alerts", included: true },
          { label: "Remote Engine Start", included: true },
          { label: "Stolen Vehicle Recovery", included: true },
          { label: "Wi-Fi Hotspot", included: true },
          { label: "Connected Navigation", included: true },
        ],
      },
    ],
  },

  support: {
    subtitle: "We're here to help with your quries and concerns. Contact us through any of the following channels",

    contacts: [
      {
        type: "chat",
        title: "Live chat",
        description: "Chat with a Mazda specialist now.",
        statusLabel: "Online · ~2 min wait",
        statusType: "online",
      },
      {
        type: "phone",
        title: "Call Help Center",
        description: "Speak with customer support.",
        phone: "(800) 421-6507",
        phoneRed: false,
      },
      {
        type: "roadside",
        title: "Roadside assistance",
        description: "24/7 emergency help, anywhere.",
        phone: "(800) 866-1998",
        phoneRed: true,
      },
    ],

    faqs: [
      {
        question: "How do I set up Connected Vehicle Services on my new Mazda?",
        answer:
          "To set up Connected Vehicle Services, download the MyMazda app from the App Store or Google Play. Create an account using the email associated with your vehicle purchase, then follow the in-app prompts to pair your vehicle. You will need your VIN and to be within Bluetooth range of your vehicle during initial setup.",
      },
      {
        question: "What happens when my Connected Services trial expires?",
        answer:
          "When your complimentary trial ends, your Connected Services features will be deactivated. You can subscribe to either the Basic ($10.99/mo) or Premier ($24.99/mo) plan to continue using the features. Your vehicle data and preferences will be preserved for 90 days after trial expiration.",
      },
      {
        question: "Why is my Remote Engine Start not working?",
        answer:
          "Remote Engine Start requires the Premier plan. If you are on the Premier plan and still experiencing issues, ensure the MyMazda app is updated to the latest version, your vehicle has cellular connectivity, and the engine hood is fully closed. If the issue persists, try toggling the feature off and on in the app settings.",
      },
    ],

    supportRequests: [
      {
        title: "Hotspot setup issue",
        status: "OPEN",
        caseNumber: "Case #MZ-48217",
        date: "Opened May 24",
      },
      {
        title: "Billing question",
        status: "RESOLVED",
        caseNumber: "Case #MZ-47980",
        date: "Closed May 19",
      },
    ],
  },
};
