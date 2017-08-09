export default function(object, arr) {
  arr.forEach(handler => {
    object[handler] = object[handler].bind(object);
  });
}
