export class VideoSource {
    source;

    /**
     * コンストラクタ
     *
     * @param {HTMLVideoElement} source
     */
    constructor(source) {
        this.source = source;
    }

    /**
     * ユーザーのビデオメディアを再生
     */
    play() {
        if (this.source.paused) {
            this.source.play();
        }
    }

    /**
     * ユーザーのビデオメディアを停止
     */
    pause() {
        this.source.pause();
    }

    /**
     * ユーザーのビデオメディアをセット
     *
     * @param {srcObject} stream
     */
    setStream(stream) {
        this.source.srcObject = stream;
    }

    getSource() {
        return this.source;
    }

    /**
     * ユーザーのビデオメディアを取得する
     *
     * @param {Function} onSuccess
     * @param {Function} onError
     */
    getUserVideoMedia(onSuccess, onError) {
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            onSuccess(stream)
        }).catch( (e) => {
            onError(e)
        });
    }
}
