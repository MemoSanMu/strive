var fileContent = document.getElementById('file');
var imageContent = document.getElementById('img');
/**
 * 格式化字节大小
 * @param 大小
 * @param 保留小数  默认2
 * @returns {string}
 */
function formatBytesSize(size, d) {
    if (d === void 0) { d = 2; }
    if (0 === size)
        return '0 B';
    var c = 1024, e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], f = Math.floor(Math.log(size) / Math.log(c));
    return parseFloat((size / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
}
fileContent === null || fileContent === void 0 ? void 0 : fileContent.addEventListener('change', function (e) {
    var _a;
    var target = e.target;
    var fileObj = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
    console.log(formatBytesSize(fileObj === null || fileObj === void 0 ? void 0 : fileObj.size), 'size');
    if (fileObj) {
        new ImageCompression({
            file: fileObj,
            quality: 0.5,
            onCompress: function (base64) {
                console.log(base64, 'base64');
                imageContent.src = base64;
            },
        });
    }
});
var ImageCompression = /** @class */ (function () {
    function ImageCompression(parameters) {
        this.fileReader = new FileReader();
        this.parameters = parameters;
        this.createBase64();
    }
    ImageCompression.prototype.createBase64 = function () {
        var _this = this;
        this.fileReader.onload = function (e) {
            var _a;
            var result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            _this.compress(result);
        };
        this.fileReader.readAsDataURL(this.parameters.file);
    };
    ImageCompression.prototype.compress = function (url) {
        var _this = this;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = url;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, img.width, img.height);
            var base64 = canvas.toDataURL(_this.parameters.file.type, _this.parameters.quality);
            if (_this.parameters.onCompress) {
                _this.parameters.onCompress(base64);
            }
        };
    };
    return ImageCompression;
}());
