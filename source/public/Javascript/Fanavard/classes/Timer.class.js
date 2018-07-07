/**
 @typedef {Object} TimerConfig
 @property {string} [cssClass=".timerDisplay"] - CssClass selecor for setting time in timerDisplay.
 @property {function}   onStart     - Event when timer get's started.
 @property {function}   onPause     - Event when timer get's paused.
 @property {function}   onResume    - Event when timer get's resumed.
 @property {Object}     blobTiming  - Blob for feeding WebWorker.
 @property {function}   workerOnMessage(event) - Callback function for WebWorker.onmessage .
 @property {function}   beatifySecond(seconds) - Function to make time beatiful.
 */

/**
 * @class
 * A class which use WebWorker to manage time.
 * @constructor
 * @param {TimerConfig}
 *
 * @property timerWorker {WebWorker} WebWorker used in timer
 * @property config {TimerConfig}
 *
 *
 * @example
 *           let timer = new Timer({
 *               onStart: function(){
 *                   TetrisGame.initValues.paused = false;
 *               },
 *               workerOnMessage:function (event) {
 *                   Storage.set('seconds', event.data);
 *               },
 *               onPause:function () {
 *                   TetrisGame.initValues.paused = true;
 *               },
 *               onResume:function () {
 *                   TetrisGame.initValues.paused = false;
 *               },
 *               blobTiming: new Blob([document.querySelector('#workerTiming').textContent], { type: "text/javascript" });,
 *           });
 */
class Timer {

    constructor(config) {
        this.timerWorker = null;
        //Default config
        let defaultConfig = {
                cssClsss: ".timerDisplay",
                onStart: () => { },
            onPause: () => { },
        onResume: () => { },
        blobTiming: '',
            workerOnMessage: (event) => { },
        beautifySecond: (s) => {
            if (s > 3600) {
                // 1 hour and 34 min
                return (Math.ceil(s / 3600) + lang.hour + lang.and + s % 3600 + lang.min);
            } else if (s > 60 && s <= 3600) {
                // 4 min and 3 s
                return (Math.ceil(s / 60) + lang.minute + lang.and + s % 60 + lang.second);
            } else {
                return (s + lang.second);
            }
        }
    };

        //Extend config
        this.config = Object.assign(defaultConfig, config);
    }


    /**
     * Starts the timer
     */
    start() {
        let timerDisplayEl = document.querySelector(this.config.cssClsss);
        if (typeof (Worker) !== "undefined") {
            if (!this.timerWorker) {
                this.timerWorker = new Worker(window.URL.createObjectURL(this.config.blobTiming));
            } else {
                // stop timer if running already
                this.pause();
            }

            this.timerWorker.onmessage = (event) => {
                timerDisplayEl.innerHTML = this.config.beautifySecond(event.data);
                this.config.workerOnMessage(event);
            }
            this.config.onStart();
        } else {
            timerDisplayEl.innerHTML = lang.webWorkerNotSupported;
        }
    }

    /**
     * Pauses the timer
     */
    pause() {
        this.timerWorker.postMessage({ 'pause_flag': true });
        this.config.onPause();
    }


    /**
     * Resumes the timer
     */
    resume() {
        this.timerWorker.postMessage({ 'pause_flag': false });
        this.config.onResume();
    }

}

