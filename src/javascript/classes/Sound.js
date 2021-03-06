/**
 * @module
 */

/**
 * Sound
 * @class Sound Manager - Main class to add and manage game sounds
 */
export default class Sound {
	/**
	 * Play an audio from url
	 * @param name
	 * @return {Sound}
	 */
	constructor(name) {
		this.audio = new Audio(`assets/mp3/${name}.mp3`);
		return this;
	}

	/**
     * Plays the current instance of media
     * @param instance
     * @return {Sound}
     */
	static play(instance) {
		if (instance !== 'undefined' || this.audio) {
			if (!instance) {
				instance = this.audio;
			}
			instance.pause();
			instance.currentTime = 0;
			const noPromise = {
				catch: () => {}
			};
			(instance.play() || noPromise).catch(() => {});
		}
		return instance;
	}


	/**
     * Create instance correct name
     * @param key
     * @return {string}
     * @private
     */
	static _makeInstanceName(key) {
		return `${key}Instance`;
	}


	/**
     * Make singleton design pattern to getv only one innstance of class.
     * @param key
     * @return {*}
     * @private
     */
	static _getInstance(key) {
		const instanceName = this._makeInstanceName(key);
		return this[instanceName];
	}


	/**
     * Set instance
     * @param key
     * @param instance
     * @private
     */
	static _setInstance(key, instance) {
		const instanceName = this._makeInstanceName(key);
		this[instanceName] = instance;
	}


	/**
     * Play sound based on it's name
     * @param key {String} - Name of sound to play
     * @param canPlay {Boolean} - Setting to check if audio should get played
     * @param loop {Boolean} [false] - Sets if audio should get looped
     * @return Audio
     */
	static playByKey(key, canPlay, loop=false) {
		if (!canPlay) {
			return false;
		}

		let audioInstance;
		if (!(audioInstance = Sound._getInstance(key))) {
			audioInstance = new Audio(`assets/mp3/${key}.mp3`);
			audioInstance.loop=loop;
			Sound._setInstance(key, audioInstance);
		}

		this.play(audioInstance);

		return audioInstance;
	}


	/**
     * Play sound based on it's name
     * @param key
     */
	static pauseByKey(key) {
		const audioInstance = Sound._getInstance(key);
		audioInstance.pause();
	}
}
