export function xhrRequest (url, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url);

  xhr.send();

  xhr.onload = () => {
    if (xhr.status !== 200) {
      alert('Error: Something went wrong!');
    } else {
      callback(JSON.parse(xhr.responseText));
    }
  };
}

export function xhrRequestViaPromise (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.send();

    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert('Error: Something went wrong!');
        reject();
      } else {
        resolve(JSON.parse(xhr.responseText));
      }
    };
  });
}



