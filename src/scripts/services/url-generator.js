export default function (audioItem) {
  return `/audio/${audioItem.id}-${encodeURI(audioItem.title)}`;
}
