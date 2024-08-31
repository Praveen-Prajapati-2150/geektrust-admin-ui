export default function debounce(fn, delayTime) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delayTime);
  };

  //   timeoutId = setTimeout(() => {
  //     fn(...args);
  //   }, delayTime);

  //   clearTimeout(timeoutId);
}
