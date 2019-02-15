export default function addFallbackIfNecessary(component) {
  if (!window.AudioContext && !window.webkitAudioContext) {
    component.setState({ addFallbackAudioElement: true });
  } else {
    component.setState({ addFallbackAudioElement: false });
  }
}
