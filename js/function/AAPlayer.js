/**
 *  AA描画に関する操作クラス
 */
export class AAPlayer {
    /**
     * コンストラクタ
     *
     * @param {AACanvas} aaCanvas
     * @param {VideoSource} videoSource
     * @param {AARenderer} aaRenderer
     */
    constructor(aaCanvas, videoSource, aaRenderer) {
        this.aaCanvas = aaCanvas;
        this.videoSource = videoSource;
        this.aaRenderer = aaRenderer;
        this.animationFrame = null;
        this.playing = false;
        this.context = document.getElementById("buffer").getContext("2d");
    }

    /**
     * 初期化
     */
    init() {
        // 描画準備が整えられたらキャンバスのレイアウトを調整
        this.videoSource.source.addEventListener("canplaythrough", () => {
            const source = this.videoSource.getSource();
            this.aaCanvas.adjustScale(source.videoWidth, source.videoHeight);
        });

        // ユーザーのビデオメディアを描画
        this.videoSource.getUserVideoMedia(
            (stream) => {
                this.play(stream);
            },
            function (e) {
                console.log("error", e);
                alert("表示できません。");
            }
        );
    }

    /**
     * メディアの解像度を元にCanvasの位置・大きさを調整
     */
    renderAAByCanvasImage = () => {
        const imageWidth = this.aaCanvas.cfw | 0;
        const imageHeight = (imageWidth / this.aaCanvas.wph) | 0 || 1;

        try {
            this.context.drawImage(
                this.videoSource.getSource(),
                0,
                0,
                imageWidth,
                imageHeight
            );
        } catch (e) {
            if (e.name === "NS_ERROR_NOT_AVAILABLE") {
                setTimeout(() => {
                    this.renderAAByCanvasImage();
                }, 100);
                console.warn(e);
                return;
            } else {
                throw e;
            }
        }

        this.aaCanvas.draw(
            this.aaRenderer.render(
                this.context.getImageData(0, 0, imageWidth, imageHeight),
                this.aaCanvas.cfw,
                this.aaCanvas.cfh
            )
        );

        this.animationFrame = window.requestAnimationFrame(this.renderAAByCanvasImage);
    };

    /**
     * 再生状態取得
     *
     * @return {Boolean}
     */
    isPlaying() {
        return this.playing;
    };

    /**
     * 再生
     *
     * @param {Object} [stream] 動画URIの文字列 | createObjectURLの戻り値
     */
    play(stream) {
        console.log('2');
        if (stream) {
            console.log('set2');

            this.videoSource.setStream(stream);
        }

        if (this.playing) return;
        this.playing = true;
        this.videoSource.play();

        if (this.animationFrame === null) {
            this.renderAAByCanvasImage();
        }
    };
}
