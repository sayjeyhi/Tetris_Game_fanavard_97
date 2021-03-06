/**
 * @module
 */
import TetrisGame from '../classes/Tetris/TetrisGame';
import MaterialColor from '../classes/MaterialColor';
import Vivus from 'vivus';
import Sound from '../classes/Sound';
import Helper from '../classes/Helper';
import Gameplay from '../classes/Tetris/Gameplay';
import Settings from '../classes/Tetris/Settings';
import Timeout from '../classes/Timeout';
import Storage from '../classes/Storage';
import ScoreHandler from '../classes/Tetris/ScoreHandler';

/**
 * @class ArshLoader - makes animation of page loading on game load
 */
export default class ArshLoader {
	/**
     * Set main properties of ArshLoader
     * @return {ArshLoader}
     */
	static setProperties() {
		// make animation frame available
		Timeout.addAnimeFrame();

		/**
         * Animate loading flag
         */
		this.animationLoading = false;

		/**
         * Is loaded scripts
         */
		this.isLoaded = false;

		/**
         * Timing properties for vivus
         */
		this.timingProps = {
			type: 'delayed',
			duration: 150,
			start: 'autostart'
		};

		/**
         * Get game settings
         */
		this._settings = this._getSettings();

		// could we use animation
		this.useAnimation = this._settings.useAnimation === 1;
		this.soundPlay = this._settings.soundPlay === 1;
	}

	/**
     * Get settings
     * @return {any}
     * @private
     */
	static _getSettings() {
		return Storage.getObject('settings', {
			useAnimation: 1,
			soundPlay: 1
		});
	}

	/**
     * Called after loading
     */
	static afterLoad() {
		if (!ArshLoader.isLoaded) {
			const loadingTextElement = Helper._('.loadingText');
			Helper._('.arshLoadingAnimation', loadingTextElement).className
                += ' fallDownExpert fadeOut';


			// change color of logo loop
			setInterval(() => { ArshLoader._setRandomColor(); }, 2000);

			Timeout.request(() => {
				loadingTextElement.innerHTML = '';

				const chooseWordsKind = document.createElement('div');

				chooseWordsKind.innerHTML
                    = '<div data-choosedWordsKind=\'animals-حیوانات-動物\' class=\'wordsKind\'>'
                    + '<div class="persianTitle">حیوانات</div>'
                    + '<div class="englishTitle">Animals</div>'
                    + '<div class="japaneseTitle">動物</div>'
                    + '<i class="icon-upDown"></i>'
                    + '</div>';

				Helper._('.wordsKind', chooseWordsKind).onclick = function(ev) {
					ev.stopPropagation();
					const openedStatus = chooseWordsKind.dataset.opened || 'no';
					const newDisplay
                        = openedStatus === 'yes' ? 'none' : 'inline-block';
					chooseWordsKind.dataset.opened
                        = openedStatus === 'yes' ? 'no' : 'yes';
					Helper._(
						'.chooseWordKindTooltip'
					).style.display = newDisplay;
				};

				window.onclick = function(ev) {
					if (!ev.target.matches('.wordsKind')) {
						chooseWordsKind.dataset.opened = 'no';
						if (Helper._('.chooseWordKindTooltip')) Helper._('.chooseWordKindTooltip').style.display = 'none';
					}
				};

				const btnFa = document.createElement('div');
				btnFa.onclick = function() {
					const wordsType
                        = Helper._('.wordsKind').dataset.choosedwordskind
                        || 'animales-حیوانات-動物';
					ArshLoader.startGame('fa', wordsType);
				};
				btnFa.className = 'btnEnterProject animatedOneSecond bounceIn';
				btnFa.innerHTML
                    = '<i class=\'icon-uniE685\'></i> ورود به بازی';

				const btnEn = document.createElement('div');
				btnEn.onclick = function() {
					const wordsType
                        = Helper._('.wordsKind').dataset.choosedwordskind
                        || 'animales-حیوانات-動物';
					ArshLoader.startGame('en', wordsType);
				};
				btnEn.className = 'btnEnterProject animatedOneSecond bounceIn ltr';
				btnEn.innerHTML = '<i class=\'icon-uniE685\'></i> Enter Game';

				const btnJa = document.createElement('div');
				btnJa.onclick = function() {
					const wordsType
                        = Helper._('.wordsKind').dataset.choosedwordskind
                        || 'animales-حیوانات-動物';
					ArshLoader.startGame('ja', wordsType);
				};
				btnJa.className = 'btnEnterProject animated bounceIn ltr';
				btnJa.innerHTML = '<i class=\'icon-uniE685\'></i>ゲームに入る';

				const workKindChooser = document.createElement('div');
				workKindChooser.className = 'chooseWordKindTooltip';
				workKindChooser.innerHTML
                    = '<ul>'
                    + '<li onclick="arshLoader.chooseWordKind(\'animals\' , this);" >'
                    + '<div class="persianTitle">حیوانات</div>'
                    + '<div class="englishTitle">Animals</div>'
                    + '<div class="japaneseTitle">動物</div>'
                    + '<i class="icon-fish"></i>'
                    + '</li>'
                    + '<li onclick="arshLoader.chooseWordKind(\'colors\' , this);">'
                    + '<div class="persianTitle">رنگ ها</div>'
                    + '<div class="englishTitle">Colors</div>'
                    + '<div class="japaneseTitle">色</div>'
                    + '<i class="icon-brush"></i>'
                    + '</li>'
                    + '<li onclick="arshLoader.chooseWordKind(\'things\' ,this);">'
                    + '<div class="persianTitle">اشیا</div>'
                    + '<div class="englishTitle">Things</div>'
                    + '<div class="japaneseTitle">もの</div>'
                    + '<i class="icon-jorab"></i>'
                    + '</li>'
                    + '<li onclick="arshLoader.chooseWordKind(\'fruits\' , this);">'
                    + '<div class="persianTitle">میوه ها</div>'
                    + '<div class="englishTitle">Fruits</div>'
                    + '<div class="japaneseTitle">もの</div>'
                    + '<i class="icon-albalo"></i>'
                    + '</li>'
                    + '</ul>';


				let documentLink = document.createElement("div");
				documentLink.className = "linkToDocHolder";

				let wiki = document.createElement("a");
				wiki.href = "/wiki";
				wiki.target = "_blank";
				wiki.className = "linkToDoc";
				wiki.innerText = "wiki";

				let apiDocs = document.createElement("a");
				apiDocs.href = "/api-docs";
				apiDocs.target = "_blank";
				apiDocs.className = "linkToDoc";
				apiDocs.innerText = "classes";

				let githubLink = document.createElement("a");
        githubLink.href = "https://github.com/sayjeyhi/letters-tetris";
        githubLink.target = "_blank";
        githubLink.className = "linkToDoc";
        githubLink.innerText = "github";

				documentLink.appendChild(githubLink);
				documentLink.appendChild(wiki);
				documentLink.appendChild(apiDocs);

				loadingTextElement.appendChild(chooseWordsKind);
				loadingTextElement.appendChild(btnFa);
				loadingTextElement.appendChild(btnEn);
				loadingTextElement.appendChild(btnJa);
				loadingTextElement.appendChild(documentLink);
				loadingTextElement.appendChild(workKindChooser);


				ArshLoader.isLoaded = true;
			}, 1000);
		}
	}

	/**
     * Choose one of defined word kinds
     * @param name
     * @param el
     */
	static chooseWordKind(name, el) {
		const choosedPersianTitle = Helper._('.persianTitle', el).innerHTML;
		const choosedEnglishTitle = Helper._('.englishTitle', el).innerHTML;
		const choosedJapaneseTitle = Helper._('.japaneseTitle', el).innerHTML;
		const chooserEl = Helper._('.wordsKind');
		el.parentNode.parentNode.style.display = 'none';

		Helper._('.persianTitle', chooserEl).innerHTML = choosedPersianTitle;
		Helper._('.englishTitle', chooserEl).innerHTML = choosedEnglishTitle;
		Helper._('.japaneseTitle', chooserEl).innerHTML = choosedJapaneseTitle;
		chooserEl.dataset.choosedwordskind = `${name.toString()}-${choosedPersianTitle.toString()}-${choosedJapaneseTitle.toString()}`;
		// this.chooseWordKind.dataset.opened = "no";
		Helper._('.wordsKind').parentElement.dataset.opened = 'no';
	}

	/**
     * Set random color for our loader svg
     */
	static _setRandomColor() {
		const color = MaterialColor.getRandomColor();
		const animateEl = Helper._('#jafarRezaeiAnimate');
		if (animateEl) {
			animateEl.style.color = color;
			animateEl.style.fill = color;
		}
	}

	/**
     * Start game when enter to game button clicked
     * @param lang
     * @param wordsType
     */
	static startGame(lang, wordsType) {
		wordsType = wordsType.split('-');
		//Hide other buttons
		Helper._('.loadingText').style.display = 'none';
		Helper.fetchJson(`assets/localization/lang.${lang}.json`)
			.then(langFiles => {
				window.lang = langFiles;
				Helper.fetchJson(`assets/words/${lang}/${wordsType[0]}.json`)
					.then(words => {
						window.TetrisWords = words;
						this.initGame(wordsType);
					})
					.catch(err => {
						console.log(err);
						Helper._('.loadingText').style.display = 'block';
					});
			})
			.catch(err => {
				console.log(err);
				Helper._('.loadingText').style.display = 'block';
			});
	}

	/**
     * Initialize whole game
     * @param wordsType
     */
	static initGame(wordsType) {
		window.Gameplay = Gameplay;
		window.Settings = Settings;
		window.ScoreHandler = ScoreHandler;

		const tetrisGameConfig = {
			rows: 10,
			columnsMin: 6,
			columnsMax: 16,
			workingWordCount: 5,
			charSpeed: 800, // 1 second - get division to level when making game harder
			useLowercase: false,
			simpleFallDownAnimateSpeed: 700,
			mediumFallDownAnimateSpeed: 500,
			expertFallDownAnimateSpeed: 200,
			successAnimationIterationDuration: 100,
			do_encryption: true, // Enables encryption when saving score
			encryptionKeySize: 16, // Size of key Used in encryption
			directionWordChecks: {
				ltr: true, // check left to right
				rtl: true, // check right to left
				ttd: true, // check top top down
				dtt: true // check down to top
			},
			scoreCalculator: word => {
				return Math.pow(word.length, 1.3); // Larger words will have better score
			},

			// user setting values
			playBackgroundSound: true,
			playEventsSound: true,
			level: 1, // Up to 3 - if it is big it is hard to play
			useAnimationFlag: true, // Make animate or not
			showGrids: true, // Show grids flag
			chooseedWordKind: {
				persianTitle: wordsType[1],
				englishTitle: wordsType[0],
				japaneseTitle: wordsType[2]
			}
		};

		TetrisGame.init(tetrisGameConfig);
		TetrisGame.build();
	}

	/**
     * Build arsh loader when page is ready
     */
	static build() {
		window.arshLoader = ArshLoader;

		// register main fields of class
		ArshLoader.setProperties();

		let content
            = '    <div class="bloc">\n'
            + '        <div><img src="assets/img/fanavardLogo.png" alt="فن آورد" style="width:150px;height: auto"/></div>';

		if (this.useAnimation) {
			content
                += '        <svg id="jafarRezaeiAnimate" viewBox="-17 -20 412.8504 64.80315" height="70.80315" width="412.8504" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:400px;padding:50px 0 !important;height:auto">\n'
                + '            <defs>\n'
                + '                <filter id="dropshadow" height="50%">\n'
                + '                    <feGaussianBlur in="SourceAlpha" stdDeviation="1"/> <!-- stdDeviation is how much to blur -->\n'
                + '                    <feOffset dx="1" dy="1" result="offsetblur"/> <!-- how much to offset -->\n'
                + '                    <feComponentTransfer>\n'
                + '                        <feFuncA type="linear" slope="0.15"/> <!-- slope is the opacity of the shadow -->\n'
                + '                    </feComponentTransfer>\n'
                + '                    <feMerge>\n'
                + '                        <feMergeNode/> <!-- this contains the offset blurred image -->\n'
                + '                        <feMergeNode in="SourceGraphic"/>\n'
                + '                        <!-- this contains the element that the filter is applied to -->\n'
                + '                    </feMerge>\n'
                + '                </filter>\n'
                + '            </defs>\n'
                + '            <path d="m 380.94802,-8.5661138 c -1.16394,-1.169545 -2.04844,-2.1586942 -2.04844,-2.2908222 0,-0.31761 4.13788,-4.469788 4.4544,-4.469788 0.14442,0 0.99819,0.743825 2.09678,1.826772 1.01925,1.004724 1.92634,1.826772 2.01575,1.826772 0.0894,0 0.9965,-0.822048 2.01575,-1.826772 1.0986,-1.082947 1.95237,-1.826772 2.09678,-1.826772 0.14771,0 1.0729,0.834497 2.35006,2.119684 1.15854,1.165827 2.13431,2.091811 2.16838,2.057743 0.0341,-0.03407 0.062,0.06424 0.062,0.21846 0,0.154221 -0.0526,0.247886 -0.11692,0.208144 -0.0643,-0.03974 -0.15015,0.03246 -0.19076,0.160443 -0.0406,0.127985 -0.94505,1.0925882 -2.00984,2.1435622 -1.37982,1.361926 -2.02021,1.910862 -2.22919,1.910862 -0.20882,0 -0.82325,-0.525807 -2.13468,-1.826772 -1.0128,-1.004724 -1.91798,-1.8267712 -2.01153,-1.8267712 -0.0935,0 -0.99873,0.8220472 -2.01153,1.8267712 -1.36398,1.353095 -1.92146,1.826772 -2.14998,1.826772 -0.23119,0 -0.82193,-0.515879 -2.35698,-2.058288 z"/>\n'
                + '            <path d="m 329.87077,36.090456 c 0.13531,-0.08577 0.12917,-0.121443 -0.0315,-0.183093 -0.18002,-0.06908 -0.19953,-1.18667 -0.19953,-11.424419 0,-12.480375 -0.01,-12.305231 0.77669,-14.199595 1.11394,-2.6838448 3.35391,-4.7769588 6.08945,-5.6902398 1.5544,-0.518946 2.58117,-0.667469 4.76257,-0.688906 l 1.86495,-0.01833 0.46247,-0.566929 c 1.06326,-1.303413 2.09224,-2.272092 2.56349,-2.41328505 0.91336,-0.273651 1.11891,-0.0983 4.45309,3.79911205 1.44518,1.689295 2.28289,2.562615 2.68179,2.795785 0.96756,0.565569 1.76596,0.627907 7.47356,0.583528 l 5.2383,-0.04073 0.46509,-0.354844 c 0.8587,-0.65518 0.89401,-0.774792 0.96383,-3.265701 0.0508,-1.81174 0.0996,-2.270487 0.25196,-2.366604 0.10394,-0.06558 1.22164,-0.120097 2.48376,-0.121158 2.14092,-0.0018 2.30352,0.01441 2.4252,0.241757 0.0739,0.138117 0.13041,1.095416 0.13041,2.209744 0,2.159505 0.12726,2.649309 0.83245,3.204006 0.64013,0.503532 1.02762,0.531398 6.83231,0.491345 l 5.58602,-0.03854 0.24075,-0.297421 c 0.13242,-0.163583 0.24076,-0.405794 0.24076,-0.538249 0,-0.57258 -1.79823,-2.100805 -4.26816,-3.627308 -1.0769,-0.665561 -1.28868,-0.847017 -1.24545,-1.067111 0.0672,-0.341988 6.26038,-9.403449 6.48617,-9.490093 0.24782,-0.0951 0.56688,0.239625 1.43099,1.501248 0.91148,1.330807 1.60653,2.768969 2.08913,4.322777 l 0.35197,1.13316495 0.0404,6.82062405 c 0.0441,7.4460908 0.0248,7.7045348 -0.68603,9.2186578 -0.52355,1.115157 -1.87188,2.389066 -3.19113,3.014972 -2.00463,0.95109 -2.21029,0.977242 -7.68504,0.977242 h -4.85039 l -0.89474,-0.32735 c -1.12304,-0.410871 -2.17394,-1.102086 -3.09371,-2.034854 -0.39287,-0.398426 -0.79182,-0.72441 -0.88656,-0.72441 -0.0947,0 -0.51063,0.34241 -0.92421,0.76091 -0.9299,0.940971 -2.00979,1.651249 -3.08267,2.027588 -0.71288,0.25006 -1.14841,0.296104 -3.36421,0.355673 -1.43865,0.03868 -2.5969,0.123203 -2.66396,0.194412 -0.0653,0.06929 -0.14545,0.806299 -0.17818,1.637795 -0.0899,2.283563 -0.74275,3.882634 -2.14399,5.251487 -2.84759,2.781777 -7.71409,2.816662 -10.58144,0.07585 -0.47956,-0.458397 -2.32413,-2.781579 -4.37987,-5.516315 -1.95326,-2.598426 -3.7009,-4.851687 -3.88365,-5.007248 -0.60968,-0.518994 -2.02477,-0.254231 -2.36701,0.442868 -0.0588,0.119858 -0.13713,3.27934 -0.17398,7.021073 -0.0654,6.638624 -0.0738,6.821184 -0.34701,7.548884 -0.72766,1.937959 -2.34099,3.495321 -4.17579,4.0309 -0.37635,0.109859 -0.85824,0.203728 -1.07086,0.208599 -0.33005,0.0076 -0.34974,0.02469 -0.13462,0.117128 0.19176,0.0824 0.11649,0.109931 -0.31496,0.1152 -0.35515,0.0043 -0.50415,-0.03287 -0.39889,-0.0996 z"/>\n'
                + '            <path d="m 363.63536,28.168077 c -1.70075,-1.692145 -1.99562,-2.041908 -1.99562,-2.367184 0,-0.32588 0.30052,-0.680205 2.05587,-2.423936 1.151,-1.143364 2.15718,-2.042265 2.28601,-2.042265 0.12707,0 1.06007,0.818108 2.08332,1.826772 1.01925,1.004724 1.92991,1.826771 2.02371,1.826771 0.0938,0 0.99919,-0.822047 2.012,-1.826771 1.06792,-1.059407 1.94161,-1.826772 2.07987,-1.826772 0.14048,0 1.1122,0.873795 2.36579,2.127388 1.86166,1.86166 2.11654,2.164585 2.04045,2.425197 -0.0478,0.163794 -0.97845,1.190722 -2.0681,2.282061 -1.48114,1.483434 -2.05914,1.984252 -2.29007,1.984252 -0.22918,0 -0.74731,-0.441004 -2.00792,-1.70904 -0.93448,-0.939972 -1.80363,-1.766892 -1.93147,-1.837601 -0.19849,-0.109789 -0.5045,0.139761 -2.09576,1.709039 -1.49761,1.47694 -1.93194,1.837602 -2.2129,1.837602 -0.2829,0 -0.73018,-0.378679 -2.34518,-1.985513 z"/>\n'
                + '            <path d="m 293.04131,36.074856 c 0.1965,-0.08444 0.13706,-0.110223 -0.27002,-0.117128 -0.87807,-0.01489 -3.30187,-0.700705 -4.88264,-1.381536 -1.72033,-0.740931 -3.2031,-1.558066 -5.17804,-2.853536 -1.59213,-1.044365 -1.93635,-1.367187 -1.75847,-1.649183 0.0664,-0.105247 1.02778,-0.574574 2.13643,-1.042947 12.17703,-5.144448 18.85983,-9.326117 18.85983,-11.801291 0,-0.558188 -0.54918,-1.528033 -1.4807,-2.614909 -0.90099,-1.051235 -3.89253,-3.967055 -5.19053,-5.0591548 -0.49414,-0.415748 -0.93459,-0.857354 -0.97879,-0.981347 -0.0884,-0.247963 -0.11736,-0.203522 3.65619,-5.606974 1.49937,-2.14698605 2.47166,-3.42742705 2.60261,-3.42742705 0.12214,0 0.90253,0.903251 1.87761,2.17322905 3.14548,4.096832 4.29454,5.281063 5.85062,6.02979 l 0.7559,0.363711 4.43275,10e-5 c 5.15399,1.16e-4 5.32429,-0.02949 5.32911,-0.926398 0.003,-0.522547 -1.13193,-1.578208 -3.03241,-2.821083 -2.51134,-1.642381 -2.53845,-1.663172 -2.45438,-1.882253 0.0421,-0.109625 1.50282,-2.28933305 3.24612,-4.843797 2.00125,-2.932435 3.24581,-4.64448 3.37628,-4.64448 0.11363,0 0.49063,0.382677 0.83775,0.850394 1.35871,1.83072 2.1822,3.542988 2.72115,5.65796395 0.27648,1.085009 0.28379,1.282401 0.28379,7.66487005 0,5.8699358 -0.0231,6.6363368 -0.22259,7.3700788 -0.64032,2.355795 -2.03961,3.897494 -4.37583,4.821212 -1.59774,0.631726 -2.4294,0.722095 -6.64538,0.722095 -4.26672,0 -4.72408,-0.05737 -6.12247,-0.767978 -0.41085,-0.208776 -0.816,-0.35311 -0.90035,-0.320744 -0.10338,0.03967 -0.1823,0.606369 -0.2422,1.73914 -0.4257,8.050536 -2.60916,12.66336 -6.83717,14.444384 -0.85614,0.360644 -2.60094,0.774914 -3.31543,0.787187 -0.43295,0.0074 -0.50738,0.03532 -0.31496,0.118011 0.16528,0.07102 -0.13815,0.108275 -0.88189,0.108275 -0.74373,0 -1.04716,-0.03725 -0.88189,-0.108275 z"/>\n'
                + '            <path d="m 313.92177,28.104957 c -1.53206,-1.53418 -2.04581,-2.126316 -2.04581,-2.357973 0,-0.441773 3.96796,-4.41229 4.40945,-4.41229 0.43546,0 4.40945,3.970022 4.40945,4.405047 0,0.448756 -3.95796,4.413851 -4.4059,4.413851 -0.24746,0 -0.79191,-0.471181 -2.36719,-2.048635 z"/>\n'
                + '            <path d="m 274.39564,19.776866 c -1.06022,-0.344689 -1.77931,-0.783952 -2.68859,-1.642345 -1.76298,-1.66431 -2.86104,-3.978756 -3.1601,-6.660826 -0.0832,-0.746146 -0.13556,-4.4499978 -0.13556,-9.5896628 v -8.373979 l -0.69811,-0.202949 c -2.1728,-0.631649 -2.96348,-3.4999792 -1.49537,-5.4247572 0.31016,-0.406643 7.15477,-5.161021 8.36073,-5.807499 0.27468,-0.147247 0.46398,-0.303152 0.42067,-0.346457 -0.0433,-0.04331 0.13249,-0.07874 0.39065,-0.07874 0.28083,0 0.4381,0.05061 0.39151,0.125985 -0.0428,0.06929 10e-4,0.125984 0.0966,0.125984 0.37652,0 0.73583,0.590393 0.85313,1.401796 0.0639,0.44161 0.11753,5.735212 0.11932,11.7635582 0.002,7.560252 0.0461,11.115135 0.14151,11.458656 0.18078,0.651204 0.81276,1.270185 1.48039,1.449958 0.36284,0.0977 1.82746,0.131605 4.56961,0.105776 3.82571,-0.03604 4.04493,-0.05073 4.21431,-0.282564 0.0983,-0.134503 0.17867,-0.409694 0.17867,-0.611536 0,-0.53118 -1.12486,-1.57974 -3.03433,-2.8285 -2.51134,-1.642381 -2.53845,-1.663172 -2.45438,-1.882253 0.0421,-0.109625 1.50282,-2.28933305 3.24612,-4.843797 2.00125,-2.932435 3.24581,-4.64448 3.37628,-4.64448 0.11363,0 0.48971,0.382677 0.83569,0.850394 1.35404,1.830434 2.10685,3.367731 2.66512,5.44244795 0.32196,1.196517 0.32406,1.236436 0.37498,7.16481505 0.055,6.4035768 -0.01,7.4895628 -0.53351,8.9321908 -0.80553,2.219203 -2.61131,3.672266 -5.4625,4.39553 -1.15578,0.293187 -1.32089,0.301085 -6.17922,0.2956 -4.84308,-0.0055 -5.01798,-0.01417 -5.87362,-0.292349 z"/>\n'
                + '            <path d="m 286.39496,-9.7519198 c -1.9858,-1.9650922 -2.32374,-2.4064752 -2.12297,-2.7727922 0.25129,-0.458486 4.13407,-4.187838 4.36013,-4.187838 0.13441,0 1.11164,0.871384 2.29033,2.042264 1.58614,1.575642 2.05587,2.115693 2.05587,2.363637 0,0.45068 -3.95188,4.4129962 -4.40138,4.4129962 -0.22288,0 -0.80575,-0.496391 -2.18198,-1.858267 z"/>'
                + '            <path d="m 255.49801,23.985724 c -1.03478,-0.224402 -1.99825,-0.681242 -2.95132,-1.399411 -1.22102,-0.920059 -2.134,-2.013436 -2.8072,-3.361855 -0.28539,-0.571654 -0.59167,-1.03937 -0.6806,-1.03937 -0.089,0 -0.52852,0.27763 -0.97682,0.616957 -1.48811,1.126347 -1.81876,1.203524 -5.34387,1.247346 -3.34964,0.04164 -3.91917,-0.03344 -5.29291,-0.697743 -0.98434,-0.476005 -2.60328,-2.094898 -3.30841,-3.308293 -0.63741,-1.096919 -1.66193,-3.350076 -2.26276,-4.976378 -0.45443,-1.2300338 -0.5773,-1.4488188 -0.81372,-1.4488188 -0.0851,0 -0.90461,1.4314958 -1.82108,3.1811028 -0.91646,1.749606 -1.78753,3.285124 -1.93568,3.412262 -0.25138,0.2157 -0.52668,0.227936 -4.11625,0.18294 -3.59561,-0.04507 -3.89212,-0.06618 -4.53978,-0.323245 -0.95544,-0.379224 -1.91992,-1.256306 -2.35435,-2.141008 l -0.35431,-0.7215 -0.0357,-6.7879458 c -0.0413,-7.855447 -0.0531,-7.749467 0.97253,-8.775053 0.94172,-0.941718 1.27785,-1.003931 5.42417,-1.003931 2.61739,0 3.53495,-0.03974 3.69973,-0.160221 0.20372,-0.148977 0.17894,-0.257283 -0.35323,-1.543307 -0.31478,-0.760697 -0.57262,-1.475008 -0.57299,-1.587358 0,-0.172212 2.08444,-2.189882 6.07284,-5.8767542 0.54367,-0.502578 0.91365,-0.75495 1.03722,-0.70753 0.1254,0.04812 1.20325,3.142094 3.1045,8.9114502 3.05514,9.270851 3.44629,10.26415 4.5064,11.443244 0.83091,0.924156 1.04595,0.985043 3.47907,0.985043 1.95288,0 2.09941,-0.01663 2.34937,-0.266587 0.24147,-0.241464 0.25631,-0.339415 0.15748,-1.03937 -0.21382,-1.514457 -0.11635,-3.196506 0.25015,-4.316785 1.34515,-4.111673 5.77773,-6.699227 9.8184,-5.731553 2.37955,0.569866 4.54059,2.137677 5.46732,3.96647395 0.34469,0.68022205 3.42418,10.16304285 3.74927,11.54530185 0.11157,0.47444 0.19337,1.411609 0.19444,2.227983 0.006,4.703649 -2.33056,8.127227 -6.2994,9.229195 -1.0784,0.29942 -2.72277,0.425137 -3.46251,0.264718 z"/>\n'
                + '            <path d="m 185.8234,36.086661 c 0.17184,-0.06721 -1.3e-4,-0.120344 -0.56693,-0.175182 -2.42847,-0.234958 -6.57675,-1.911857 -9.97666,-4.032969 -0.9806,-0.611763 -1.34948,-0.918099 -1.52447,-1.265983 -0.12697,-0.252413 -0.32302,-0.458934 -0.4357,-0.458934 -0.11267,0 -1.03352,-0.822047 -2.04633,-1.826772 -1.0128,-1.004724 -1.91798,-1.826772 -2.01153,-1.826772 -0.0935,0 -0.99872,0.822048 -2.01152,1.826772 -1.33632,1.325653 -1.92385,1.826772 -2.14174,1.826772 -0.21792,0 -0.81525,-0.50961 -2.17812,-1.858268 -1.98581,-1.965092 -2.32375,-2.406474 -2.12298,-2.772791 0.24693,-0.450541 4.13391,-4.187839 4.35557,-4.187839 0.12673,0 1.06133,0.819611 2.08305,1.826772 1.01925,1.004724 1.92633,1.826771 2.01574,1.826771 0.0894,0 0.9965,-0.822047 2.01575,-1.826771 1.04951,-1.034561 1.95494,-1.826772 2.08784,-1.826772 0.13563,0 1.13241,0.897749 2.36204,2.127388 1.86599,1.865985 2.11651,2.16398 2.03888,2.425197 -0.0487,0.163794 -0.8766,1.092219 -1.83981,2.063164 -1.67006,1.683457 -1.96886,2.077168 -1.57642,2.077168 0.25824,0 7.8347,-3.551809 11.15617,-5.229966 3.75264,-1.895999 6.01342,-3.311485 6.51732,-4.080534 0.403,-0.615043 0.19611,-0.642256 -4.88281,-0.642256 -4.33726,0 -4.67704,-0.01636 -5.47815,-0.263797 -0.70538,-0.217873 -0.978,-0.387849 -1.56593,-0.976378 -1.17089,-1.172058 -1.15838,-1.069397 -1.10814,-9.0905328 0.0418,-6.679297 0.0449,-6.748121 0.33744,-7.622048 1.30205,-3.889422 4.28076,-5.805372 8.65394,-5.56632 2.53731,0.138696 4.46401,0.883013 5.9747,2.308122 1.10572,1.04308995 1.8837,2.280664 2.40457,3.825127 0.36794,1.090967 0.41039,1.380754 0.4799,3.275591 l 0.0763,2.07874 h 3.75831 c 3.57494,0 3.76702,-0.01193 3.93701,-0.244552 0.0983,-0.134503 0.17869,-0.409694 0.17869,-0.611536 0,-0.53118 -1.12486,-1.57974 -3.03433,-2.8285 -2.51134,-1.642381 -2.53845,-1.663172 -2.45438,-1.882253 0.0421,-0.109625 1.50282,-2.28933305 3.24612,-4.843797 2.00125,-2.932435 3.24581,-4.64448 3.37628,-4.64448 0.11363,0 0.49063,0.382677 0.83775,0.850394 1.35871,1.83072 2.1822,3.542988 2.72115,5.65796395 0.27631,1.084326 0.28379,1.284756 0.28379,7.60187805 0,4.6267758 -0.0436,6.6723798 -0.15199,7.1302048 -0.70589,2.981711 -2.51308,4.708371 -5.80089,5.542394 -1.07933,0.273795 -1.46091,0.303779 -3.86597,0.303779 -1.94187,0 -2.72401,0.04288 -2.87259,0.157481 -0.17798,0.137283 -0.211,0.642189 -0.2575,3.937008 -0.0482,3.418726 -0.0795,3.867667 -0.32704,4.702819 -0.81357,2.744449 -2.74297,4.984166 -5.34076,6.19976 -0.9235,0.432131 -2.5635,0.873264 -3.29318,0.885804 -0.40328,0.0069 -0.46051,0.03239 -0.26331,0.117128 0.16528,0.07102 -0.13815,0.108275 -0.88189,0.108275 -0.65537,0 -1.02977,-0.04071 -0.8872,-0.09647 z"/>\n'
                + '            <path d="m 203.74929,-9.7519198 c -1.9858,-1.9650922 -2.32374,-2.4064752 -2.12297,-2.7727922 0.25129,-0.458486 4.13407,-4.187838 4.36013,-4.187838 0.13441,0 1.11164,0.871384 2.29033,2.042264 1.58614,1.575642 2.05587,2.115693 2.05587,2.363637 0,0.45068 -3.95189,4.4129962 -4.40138,4.4129962 -0.22288,0 -0.80575,-0.496391 -2.18198,-1.858267 z"/>\n'
                + '            <path d="m 100.3484,36.074851 c 0.24284,-0.07777 0.15418,-0.103742 -0.387248,-0.113426 -0.98392,-0.0176 -2.89264,-0.35991 -4.08519,-0.732646 -3.828997,-1.196765 -6.303647,-3.783623 -7.297897,-7.628786 -0.74257,-2.871812 -0.67374,-7.047781 0.17506,-10.621675 0.4438,-1.868674 1.25751,-4.19791 1.51457,-4.335484 0.29729,-0.159103 3.778697,-0.16479 4.028827,-0.0066 0.15744,0.09958 0.16188,0.241804 0.0304,0.974448 -0.47069,2.62305 -0.55098,3.427141 -0.49452,4.952339 0.1027,2.774277 0.84871,3.990794 2.97781,4.855926 1.5083,0.612878 2.73693,0.74145 7.002728,0.732812 5.41415,-0.01096 8.44351,-0.356939 9.99799,-1.141845 0.86382,-0.436175 1.03787,-0.68377 0.72426,-1.030306 -0.21746,-0.2403 -0.41704,-0.253568 -4.40415,-0.292809 -4.06173,-0.03997 -4.19711,-0.04937 -4.93227,-0.342572 -0.55072,-0.21964 -0.98123,-0.526878 -1.58603,-1.131889 -0.69694,-0.697185 -0.89151,-0.992125 -1.2127,-1.838293 -0.97549,-2.569847 -0.85437,-4.796862 0.37207,-6.841041 0.55392,-0.923258 1.91117,-2.2744568 2.72916,-2.7169988 1.34336,-0.726764 0.98988,-0.707995 13.28905,-0.705608 l 11.32383,0.0022 0.5585,-0.270365 c 0.33833,-0.163785 0.69179,-0.471578 0.89664,-0.780784 0.32869,-0.496147 0.33926,-0.570499 0.37829,-2.659422 0.0235,-1.258995 0.0951,-2.21525 0.17291,-2.308965 0.18843,-0.227045 4.67494,-0.229334 4.86305,-0.0025 0.0753,0.09075 0.14852,1.091708 0.17291,2.362204 0.0375,1.951069 0.0721,2.255407 0.30111,2.645241 0.52836,0.89943 1.44774,1.219843 2.38112,0.82985 0.80618,-0.336839 0.88029,-0.595401 0.95064,-3.316157 0.0512,-1.979933 0.0984,-2.458636 0.25197,-2.555531 0.28963,-0.182729 4.70273,-0.157366 4.88819,0.02809 0.10579,0.105789 0.15118,0.797568 0.15118,2.304014 0,1.982022 0.0225,2.197434 0.28347,2.714961 0.66899,1.326649 2.39423,1.327837 3.16845,0.0022 0.2214,-0.379088 0.25953,-0.716866 0.30571,-2.708233 0.0347,-1.495129 0.10146,-2.30686 0.19481,-2.367686 0.0781,-0.05091 1.17471,-0.09343 2.43683,-0.09449 2.14092,-0.0018 2.30352,0.01441 2.42519,0.241757 0.0739,0.138117 0.13042,1.095416 0.13042,2.209744 0,2.159505 0.12726,2.649309 0.83244,3.204006 0.64569,0.507894 1.00153,0.530926 7.58821,0.491123 l 6.34191,-0.03832 0.24077,-0.297421 c 0.13242,-0.163583 0.24077,-0.405794 0.24077,-0.538249 0,-0.572581 -1.79823,-2.100805 -4.26816,-3.627308 -1.07572,-0.664829 -1.28886,-0.847342 -1.24675,-1.067602 0.0753,-0.39405 6.38307,-9.524533 6.57997,-9.524533 0.38575,0 1.77902,1.978744 2.57997,3.66412 0.27714,0.583159 0.66043,1.570526 0.85175,2.194148 l 0.34787,1.13385795 0.0404,6.82062405 c 0.0441,7.4460908 0.0248,7.7045348 -0.68603,9.2186578 -0.52093,1.109565 -1.87079,2.387254 -3.19113,3.020507 -1.99589,0.957256 -1.92699,0.948734 -8.10022,1.001809 -4.84256,0.04163 -5.60481,0.02207 -6.23084,-0.159925 -1.05909,-0.307883 -1.87754,-0.75584 -2.89532,-1.584661 -0.50129,-0.408214 -0.96659,-0.742209 -1.034,-0.742209 -0.0674,0 -0.2809,0.202059 -0.47441,0.449018 -1.0119,1.29144 -2.68513,2.070667 -4.44631,2.070667 -1.67669,0 -2.94255,-0.527764 -4.02925,-1.679872 -0.2396,-0.254024 -0.52574,-0.46186 -0.63586,-0.46186 -0.11012,0 -0.50013,0.289082 -0.86671,0.642406 -0.99781,0.96176 -2.06492,1.414987 -3.47605,1.47637 -0.81159,0.0353 -1.33927,-0.01053 -1.85656,-0.161279 -0.90506,-0.263741 -2.09812,-1.051544 -2.69429,-1.779102 -0.25074,-0.305992 -0.51087,-0.556348 -0.5781,-0.556348 -0.0672,0 -0.41798,0.252686 -0.77948,0.561523 -0.92044,0.786355 -2.01616,1.420612 -2.95575,1.710928 -0.70414,0.217566 -1.18797,0.248353 -3.99427,0.254169 -2.19776,0.0045 -3.35595,-0.04218 -3.71558,-0.149929 -0.67683,-0.202783 -1.58757,-1.028692 -2.24202,-2.033192 -1.18782,-1.823123 -1.83309,-1.970018 -8.68628,-1.977435 -2.94721,-0.0032 -3.62943,0.0293 -3.93518,0.187409 -0.50148,0.259327 -0.61764,0.75439 -0.2608,1.111533 0.26597,0.266194 0.37189,0.273527 4.96141,0.343409 4.89609,0.07455 5.0815,0.09533 6.08183,0.681558 1.34168,0.786279 1.81843,2.206817 1.56775,4.671285 -0.49423,4.858637 -3.14888,8.503772 -7.93279,10.892618 -2.19613,1.096637 -5.39717,1.933226 -8.05348,2.104769 -0.91767,0.05926 -1.21755,0.113025 -0.95791,0.171742 0.20787,0.04701 -0.3874,0.08653 -1.32284,0.08782 -1.02639,0.0014 -1.5759,-0.03765 -1.38582,-0.09852 z"/>\n'
                + '            <path d="m 39.561,36.074851 c 0.196498,-0.08444 0.137053,-0.110223 -0.270024,-0.117128 -0.878069,-0.01489 -3.301865,-0.700705 -4.882647,-1.381536 -1.720324,-0.740931 -3.203102,-1.558066 -5.178038,-2.853536 -1.592131,-1.044365 -1.936344,-1.367187 -1.758465,-1.649183 0.06639,-0.105247 1.027784,-0.574574 2.136436,-1.042947 12.177034,-5.144448 18.859825,-9.326117 18.859825,-11.801291 0,-0.558188 -0.549181,-1.528033 -1.480709,-2.614909 -0.900983,-1.051235 -3.89252,-3.967055 -5.190529,-5.0591548 -0.494135,-0.415748 -0.934587,-0.857354 -0.978781,-0.981347 -0.08838,-0.247963 -0.117358,-0.203522 3.656192,-5.606974 1.499368,-2.14698605 2.471666,-3.42742705 2.602604,-3.42742705 0.122151,0 0.902532,0.903251 1.877606,2.17322905 3.155156,4.109414 4.301931,5.28963 5.862115,6.03306 l 0.767395,0.365666 2.760164,-0.03401 2.760164,-0.03401 0.07205,-1.700787 c 0.128273,-3.028041 0.871637,-4.839305 2.844351,-6.93048605 1.817624,-1.92677695 4.064691,-3.07945295 6.883658,-3.53110395 1.16436,-0.186553 3.088332,-0.0963 4.184194,0.196272 2.059613,0.549878 4.059062,2.001551 5.235122,3.80088595 0.663394,1.014973 1.280155,2.57100205 1.30177,3.28423805 l 0.01429,0.471532 -6.866142,0.06299 c -6.80195,0.0624 -6.870309,0.06558 -7.311885,0.340231 -1.318238,0.819907 -1.333966,2.799229 -0.02935,3.693429 l 0.456364,0.312796 7.064482,0.06299 7.064482,0.06299 0.03946,0.277372 c 0.03203,0.225118 -1.973388,10.6374198 -2.197122,11.4076678 -0.06043,0.208033 -0.758689,0.220472 -12.375539,0.220472 -13.521181,0 -12.982355,0.02844 -14.549607,-0.767978 -0.410842,-0.208776 -0.815996,-0.35311 -0.900341,-0.320744 -0.103386,0.03967 -0.182308,0.606369 -0.242209,1.73914 -0.425706,8.050536 -2.60916,12.66336 -6.837167,14.444384 -0.856139,0.360644 -2.600941,0.774914 -3.315428,0.787187 -0.432953,0.0074 -0.507384,0.03532 -0.31496,0.118011 0.165273,0.07102 -0.138158,0.108275 -0.88189,0.108275 -0.743732,0 -1.047164,-0.03725 -0.88189,-0.108275 z"/>\n'
                + '            <path d="m -5.6673473,33.799527 c -4.7498177,-0.638982 -7.9853857,-2.897952 -9.5072777,-6.637675 -0.494754,-1.215754 -0.87539,-2.805101 -0.971618,-4.057005 -0.05352,-0.6963 -0.115538,-0.98118 -0.178529,-0.820108 -0.05309,0.135743 -0.09485,-0.660281 -0.09282,-1.768943 0.0022,-1.192975 0.04488,-1.88719 0.104571,-1.700787 0.08147,0.254383 0.103284,0.196917 0.113426,-0.298792 0.01671,-0.816635 0.350724,-3.041711 0.649522,-4.326861 0.291441,-1.253512 1.106232,-3.817623 1.282433,-4.035765 0.09112,-0.112812 0.642095,-0.1574798 1.942503,-0.1574798 1.502038,0 1.827887,0.0328 1.888238,0.1900738 0.04012,0.10454 -0.04509,0.657296 -0.189346,1.228346 -0.626807,2.481263 -0.688189,5.031557 -0.154473,6.418006 0.724589,1.882285 2.6333617,2.998518 6.1285867,3.583942 1.987152,0.332832 7.826917,0.336843 9.3590331,0.0064 2.747956,-0.592622 4.078862,-1.553663 4.259098,-3.075469 0.1408,-1.188834 -0.146924,-1.714296 -2.079608,-3.797919 -1.87206,-2.018265 -3.6362361,-3.964378 -4.2744521,-4.7152708 -0.29993,-0.35288 -0.404665,-0.598488 -0.402928,-0.944882 0.0021,-0.414888 0.140258,-0.618321 1.21643,-1.790891 0.6677451,-0.727559 2.1757091,-2.44252 3.3510281,-3.811024 1.17532,-1.368504 2.212223,-2.48818905 2.304231,-2.48818905 0.09201,0 1.1483432,1.25742405 2.3474132,2.79427605 1.199069,1.53685 2.448277,3.088433 2.776017,3.447962 1.041398,1.142405 2.196201,1.433266 3.219573,0.810915 0.727125,-0.442189 0.830317,-0.822746 0.904773,-3.336617 l 0.06716,-2.267717 h 2.519686 2.519685 l 0.06299,2.214312 c 0.06091,2.141111 0.07417,2.231191 0.401136,2.724896 0.552216,0.833822 1.153774,1.046105 2.945726,1.039515 0.935011,-0.0034 1.685326,-0.07037 1.984313,-0.176998 1.83049,-0.652835 1.187312,-1.826161 -2.77566,-5.06353 -1.331392,-1.087621 -1.541819,-1.284988 -1.545712,-1.44978 -0.001,-0.04492 1.318047,-1.88743605 2.931351,-4.094488 2.04973,-2.804099 3.013858,-4.024485 3.200791,-4.051536 0.209346,-0.03029 0.537163,0.294014 1.507665,1.491524 0.682085,0.841629 1.282695,1.643573 1.33469,1.782098 0.05199,0.138523 0.325855,1.160175 0.608582,2.270337 l 0.514047,2.01847295 -0.01466,6.44264105 c -0.01625,7.1408358 -0.03342,7.3263748 -0.831874,8.9864238 -0.833696,1.733325 -2.668721,3.161973 -4.565811,3.554683 -2.23314,0.462274 -5.140543,-0.320912 -6.829943,-1.839827 -0.331348,-0.29791 -0.671585,-0.541656 -0.756079,-0.541656 -0.08449,0 -0.487403,0.309017 -0.89535,0.686705 -1.382623,1.280064 -3.230566,1.912062 -5.213214,1.782923 -0.623622,-0.04062 -1.372289,-0.10838 -1.663704,-0.150581 -0.611527,-0.08856 -0.599281,-0.11248 -0.730259,1.426662 -0.181259,2.130007 -1.101944,4.833758 -2.199432,6.459016 -1.2908052,1.911536 -3.5545872,3.797082 -5.5621902,4.63285 -1.246368,0.518864 -2.9240021,0.998781 -4.3288481,1.238342 -1.36153,0.232175 -5.442367,0.335064 -6.680922,0.168444 z"/>\n'
                + '            <path d="m 13.608244,0.56310315 c -0.207874,-0.129368 -1.185827,-1.05832 -2.173229,-2.06433695 -1.255522,-1.279193 -1.7952752,-1.915939 -1.7952752,-2.117885 0,-0.436505 3.9690922,-4.400518 4.4061572,-4.400518 0.245703,0 0.737195,0.416364 2.082032,1.76378 1.106397,1.108519 1.855267,1.763779 2.015748,1.763779 0.160481,0 0.909351,-0.65526 2.015748,-1.763779 1.46794,-1.470754 1.822106,-1.76378 2.131807,-1.76378 0.311569,0 0.692397,0.320994 2.363893,1.992489 1.679412,1.679413 1.992489,2.051365 1.992489,2.367185 0,0.316861 -0.317314,0.689907 -2.055876,2.416958 -1.175126,1.16734495 -2.156075,2.04226595 -2.289761,2.04226595 -0.132434,0 -1.032621,-0.792367 -2.075343,-1.82677195 -1.012805,-1.004724 -1.924964,-1.826772 -2.02702,-1.826772 -0.102056,0 -0.921746,0.740924 -1.821535,1.646497 -1.356001,1.36472095 -2.112565,2.00958895 -2.35413,2.00657595 -0.02076,-2.52e-4 -0.207831,-0.106319 -0.415705,-0.235687 z"/>\n'
                + '            <path d="m 15.781472,-7.4014328 c -1.54783,-1.586727 -1.984252,-2.107334 -1.984252,-2.367007 0,-0.2623732 0.420334,-0.7502792 1.984252,-2.3032402 1.091339,-1.083692 2.118267,-2.010157 2.282061,-2.05881 0.261198,-0.07759 0.559348,0.173076 2.425197,2.038926 1.285725,1.285725 2.127388,2.2237752 2.127388,2.3710172 0,0.146886 -0.814627,1.058256 -2.051475,2.295104 -1.719434,1.719435 -2.111963,2.052013 -2.425197,2.054801 -0.318641,0.0028 -0.666168,-0.29647 -2.357974,-2.030791 z"/>\n'
                + '        </svg>'
                + '       <div class="loadingText"><div class="arshLoadingAnimation center"><span></span></div></div>\n'
                + '</div>';

			Helper._('#container').innerHTML = content;
			this._setRandomColor();

			const hi_jRun = new Vivus(
				'jafarRezaeiAnimate',
				{
					type: 'oneByOne',
					duration: 20,
					start: 'autostart',
					dashGap: 40,
					forceRender: false
				},
				obj => {
					Timeout.request(() => {
						obj.el.classList.add('finished');

						// load bundle of javascript pack here then do the job
						ArshLoader.animationLoading = true;
						ArshLoader.afterLoad();
					}, 500);
				}
			);

			const animationHolder = document.getElementById('jafarRezaeiAnimate');
			animationHolder.addEventListener('click', () => {
				ArshLoader._setRandomColor();
				animationHolder.classList.remove('finished');
				hi_jRun.reset().play();
			});
		} else {
			content
                += '<div class="logoLoading">تیم برنامه نویسی عرش</div>'
                + '<div class="loadingText"><div class="arshLoadingAnimation center"><span></span></div></div>\n'
                + '</div>';

			Helper._('#container').innerHTML = content;

			// load bundle of javascript pack here then do the job
			ArshLoader.animationLoading = true;
			ArshLoader.afterLoad();
		}

		// play loading sound
		Sound.playByKey('loading', this.soundPlay);


		// register service worker
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker
					.register('serviceWorker.js', { scope: '/' })
					.then(
						registration => {
							// Registration was successful
							console.log(
								'ServiceWorker registration successful with scope: ',
								registration.scope
							);
						},
						err => {
							// registration failed :(
							console.log(
								'ServiceWorker registration failed: ',
								err
							);
						}
					);

				navigator.serviceWorker.ready.then(() => {
					console.log('Service Worker Ready');
				});
			});
		}
	}
}

if(typeof in_browser !== "undefined") {
	ArshLoader.build();
}
