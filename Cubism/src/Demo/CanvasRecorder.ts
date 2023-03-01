export default class CanvasRecorder {
    canvas: HTMLCanvasElement;
    fps: number;
    recorder: MediaRecorder | null = null;
    chunks: Blob[] = [];
    videoStream: MediaStream | null = null;
    isRecording: boolean = false;

    /**
     * Create a new CanvasRecorder
     * @param canvas
     * @param fps
     */
    constructor(canvas: HTMLCanvasElement | string, fps = 60) {
        if (typeof canvas === "string") {
            let tempCanvas = document.getElementById(canvas);
            if (!tempCanvas) {
                throw new Error("Canvas not found");
            }
            this.canvas = tempCanvas as HTMLCanvasElement;
        } else {
            this.canvas = canvas;
        }
        this.fps = fps;
    }

    /**
     * Start recording
     * @param fileName The name of the file to save
     * @param fileType The type of the file to save
     */
    startRecording(fileName = "video", fileType = "webm"): void {
        this.videoStream = this.canvas.captureStream(this.fps);
        this.recorder = new MediaRecorder(this.videoStream);

        this.chunks = [];

        this.recorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
        }
        this.recorder.start();

        this.recorder.onstop = () => {
            console.log("Recording stopped");
            let blob = new Blob(this.chunks, {type: `video/${fileType}`});
            let url = URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = `${fileName}.${fileType}`;
            a.click();
            URL.revokeObjectURL(url);
        }

        this.isRecording = true;
    }

    /**
     * Stop recording
     */
    stopRecording(): void {
        if (this.recorder) {
            if (this.recorder.state === "recording") {
                console.log("is recording");
                this.recorder.stop();
            }
        }
        this.isRecording = false;
    }
}
