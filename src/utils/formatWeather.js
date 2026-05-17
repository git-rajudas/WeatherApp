export const formatTime = (dt) => {

  return new Date(dt * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

};

export const formatDay = (dt) => {

  return new Date(dt * 1000).toLocaleDateString("en-US", {
    weekday: "long",
  });

};


export const getWindDirection = (deg) => {

  const directions = [
    "North",
    "NE",
    "East",
    "SE",
    "South",
    "SW",
    "West",
    "NW"
  ];

  const index = Math.round(deg / 45) % 8;

  return directions[index];
};