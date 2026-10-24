// One place for the brand details, so a rename or a new link is a single edit.
export const SITE = {
  name: "Rainr Audio",
  // Shown in the footer. Leave empty to hide it (e.g. until the rainraudio.com mailbox exists).
  email: "",
  description:
    "Audio plugins and Max for Live devices for Ableton Live, built by a techno producer, mix and mastering engineer and software developer.",
  // Add links here once the accounts exist, e.g. { label: "Instagram", href: "https://www.instagram.com/rainraudio" }
  social: [] as { label: string; href: string }[],
};

// Progress stages shown on the "In the lab" cards. A card's `status` lights up its stage.
export const STAGES = {
  plugin: ["prototype", "build", "testing", "beta", "release"],
  device: ["idea", "build", "testing", "beta", "release"],
} as const;
