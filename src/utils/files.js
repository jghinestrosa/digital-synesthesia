// Use this function because file.arrayBuffer() is not supported in all platforms (Safar, Firefox for Android...)
// https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer
export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('loadend', event => {
      resolve(event.target.result);
    });
    fileReader.readAsArrayBuffer(file);
  });
}
