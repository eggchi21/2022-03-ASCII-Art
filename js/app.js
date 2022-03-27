import { VideoSource } from './function/VideoSource.js';
import { AACanvas } from './function/AACanvas.js';
import { AARenderer } from './function/AARenderer.js';
import { AAPlayer } from './function/AAPlayer.js';

const aaPlayer = new AAPlayer(
    new AACanvas(document.getElementById('canvas')),
    new VideoSource(document.getElementById("video")),
    new AARenderer()
);

aaPlayer.init();
