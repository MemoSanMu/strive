const fileContent = document.getElementById('file') as HTMLInputElement | null;
const imageContent = document.getElementById('img') as HTMLImageElement;

/**
 * 格式化字节大小
 * @param 大小
 * @param 保留小数  默认2
 * @returns {string}
 */
function formatBytesSize(size, d = 2) {
  if (0 === size) return '0 B';
  let c = 1024,
    e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    f = Math.floor(Math.log(size) / Math.log(c));
  return parseFloat((size / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
}

fileContent?.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement;
  const fileObj = target.files?.[0];
  console.log(formatBytesSize(fileObj?.size), 'size');
  if (fileObj) {
    new ImageCompression({
      file: fileObj,
      quality: 0.5,
      onCompress: (base64) => {
        console.log(base64, 'base64');
        imageContent.src = base64;
      },
    });
  }
});

interface ParametersType {
  file: File;
  quality?: number;
  onCompress?: (base64: string) => void;
}

class ImageCompression {
  parameters: ParametersType;
  fileReader = new FileReader();
  constructor(parameters: ParametersType) {
    this.parameters = parameters;
    this.createBase64();
  }
  createBase64() {
    this.fileReader.onload = (e) => {
      const result = e.target?.result as string;
      this.compress(result);
    };
    this.fileReader.readAsDataURL(this.parameters.file);
  }

  compress(url: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0, img.width, img.height);
      const base64 = canvas.toDataURL(
        this.parameters.file.type,
        this.parameters.quality
      );
      if (this.parameters.onCompress) {
        this.parameters.onCompress(base64);
      }
    };
  }
}
