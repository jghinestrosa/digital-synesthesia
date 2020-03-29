export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('loadend', event => {
      resolve(event.target.result);
    });
    fileReader.readAsArrayBuffer(file);
  });
}
