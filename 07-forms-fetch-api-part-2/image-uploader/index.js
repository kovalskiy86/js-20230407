const IMGUR_CLIENT_ID = '28aaa2e823b03b1';

// throws FetchError if upload failed
// NOTE: check https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker

export default class ImageUploader {
  async upload(file) {
    const formData = new FormData();// <form name="baz" ...

    formData.append('image', file);

    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
        body: formData,
        referrer: ''
      });

      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export class ImageUploaderV2 {
  async upload (file) {
    const fileName = 'some file name.jpeg';
    const mimeType = 'image/jpeg';

    try {
      const response = await fetch('https://en2mna2xpr439.x.pipedream.net', {
        method: 'POST',
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': `attachment; filename="${fileName}"`,
        },
        body: file,
      });

      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
