import moment from "moment";

exports.getCreatedAt = audio => new Date(audio.created_at).toLocaleDateString();

exports.getDuration = audio =>
  moment.utc(audio.duration * 1000).format("HH:mm:ss");

exports.generateUrl = audio => {
  const title = audio.title.replace(/\s+/g, "_");
  return `/audio/${audio.id}-${encodeURI(title)}`;
};

exports.isValidLength = (string, maxLength) =>
  string.length > 0 && string.length >= maxLength;
