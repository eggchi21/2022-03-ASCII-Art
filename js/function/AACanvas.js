/**
 * AA描画領域に関する処理クラス
 */
export class AACanvas {
    canvas;
    cfw;
    cfh;
    wph;
    scale;
    innerText;

    /**
     * コンストラクタ
     *
     * @param {HTMLElement} canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.cfw = 1;
        this.cfh = 1;
        this.wph = 1.7;
        this.scale = 1.25;
        this.innerText = this.canvas.innerText ? "innerText" : "textContent";
    }

    /**
     * メディアの解像度を元にCanvasの位置・大きさを調整
     *
     * @param {Number} videoWidth
     * @param {Number} videoHeight
     */
    adjustScale(videoWidth, videoHeight) {
        this.wph = videoWidth / videoHeight;
        const width = 1600 * this.scale;
        const height = (width / this.wph | 0) || 1;
        this.cfw = (width / 10) | 0;
        this.cfh = (this.cfw / this.wph * 0.6) | 0;

        this.canvas.style.cssText = `
            width: ${width}px;
            height: ${height}px;
            left: -${width >> 1}px;`;
        this.resize();
    };

    /**
     * 指定された解像度を適用する
     *
     * @param {Number} videoWidth
     * @param {Number} videoHeight
     * @param {Number} rate
     */
    applyScale(videoWidth, videoHeight, rate) {
        this.scale = this.calcScale(rate);
        this.adjustScale(videoWidth, videoHeight);
    };


    /**
     * AAを描画
     *
     * @param {String} text
     */
    draw(text) {
        this.canvas[this.innerText] = text;
    };

    /**
     * Canvasが画面幅になるようScaleを調整する
     */
    resize() {
        const width = parseInt(this.canvas.offsetWidth);
        const height = parseInt(this.canvas.offsetHeight);

        const scale = Math.min(
            window.innerWidth * 0.97 / width,
            (window.innerHeight * 0.97) / height
        );
        const scaleText = 'scale(' + scale + ', ' + scale + ')';

        this.canvas.style.cssText += `
            -webkit-transform: ${scaleText};
            transform: ${scaleText};
            top: ${((height - height * scale) / -2)}px;`;
    };
}
