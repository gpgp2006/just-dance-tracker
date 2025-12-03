const BASE_PLATFORM_INPUTS = {
  "Xbox 360": ["Kinect"],
  "Xbox One": ["Kinect", "Phone App"],
  "Xbox Series X/S": ["Phone App"],
  PC: ["Phone App"],
  PS3: ["PS Move"],
  PS4: ["PS Move", "Phone App", "PS Camera"],
  PS5: ["Phone App"],
  Wii: ["Wiimote"],
  "Wii U": ["Wiimote", "Phone App"],
  Switch: ["Joy-Con", "Phone App"],
};

const EXCEPTIONS = {
  4: {
    "Wii U": ["Wiimote"],
  },

  2014: {
    "Xbox One": ["Kinect"],
    PS4: ["PS Move", "PS Camera"],
    "Wii U": ["Wiimote"],
  },
};

export const GAME_PLATFORMS = {
  4: ["Wii", "Wii U", "Xbox 360", "PS3"],
  2014: ["Wii", "Wii U", "Xbox 360", "Xbox One", "PS3", "PS4"],
  2015: ["Wii", "Wii U", "Xbox 360", "Xbox One", "PS3", "PS4"],
  2017: ["Wii", "Wii U", "Switch", "Xbox 360", "Xbox One", "PS3", "PS4", "PC"],
  2022: ["Switch", "Xbox One", "Xbox Series X/S", "PS4", "PS5"],
};

export const getValidInputs = (platform, edition) => {
  const editionNum = parseInt(edition);

  if (EXCEPTIONS[editionNum] && EXCEPTIONS[editionNum][platform]) {
    return EXCEPTIONS[editionNum][platform];
  }

  return BASE_PLATFORM_INPUTS[platform] || [];
};
