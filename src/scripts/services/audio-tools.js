import moment from "moment";

const getCreatedAt = audio => new Date(audio.created_at).toLocaleDateString();

const getDuration = audio => {
  // If audio duration is an hour or longer
  if (audio.duration >= 3600) {
    return moment.utc(audio.duration * 1000).format("HH:mm:ss");
  } else {
    return moment.utc(audio.duration * 1000).format("mm:ss");
  }
};

const generateUrl = audio => {
  const title = audio.title.replace(/\s+/g, "_");
  return `/audio/${audio.id}-${encodeURI(title)}`;
};

const isValidLength = (string, maxLength) =>
  string.length > 0 && string.length >= maxLength;

export { generateUrl, getCreatedAt, getDuration, isValidLength };
