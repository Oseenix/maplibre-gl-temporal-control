import type {
	IControl,
	Map,
	LayerSpecification,
	ControlPosition,
} from 'maplibre-gl';

import {
	playSvg,
	pauseSvg,
	reloadSvg,
	skipBackwardSvg,
	skipForwardSvg,
} from './icons';

const ACTIVE_BUTTON_COLOR = 'rgb(204, 204, 204)';

type ContainerOptions = {
	length: number;
	interval: number;
	onSliderValueChange: () => void;
};

const makeImg = (svg: string): HTMLImageElement => {
	const img = document.createElement('img');
	img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
	img.style.width = '24px';
	img.style.height = '24px';
	return img;
};

let timerId: number | undefined;

const makeContainer = ({
	length,
	interval,
	onSliderValueChange,
}: ContainerOptions) => {
	// outest div
	const container = document.createElement('div');
	container.classList.add('maplibregl-ctrl');
	container.classList.add('maplibregl-ctrl-group');
	container.style.width = 'calc(min((500% - 29px), 260px))';
	container.style.height = '84px';
	container.style.backgroundColor = 'rgba(0, 36, 71, 0.8)';
	container.style.textAlign = 'center';

	const titleDiv = document.createElement('div');
	titleDiv.innerHTML = '<br />';
	titleDiv.style.marginTop = '4px';
	container.appendChild(titleDiv);

	// temporal slider
	const slider = document.createElement('input');
	slider.type = 'range';
	slider.value = '0';
	slider.min = '0';
	slider.max = String(length - 1);
	slider.addEventListener('input', () => {
		onSliderValueChange();
	});
	slider.style.width = '80%';
	slider.style.margin = '4px 0';
	container.appendChild(slider);

	// buttons div
	// loop, prev, pause, play, next
	const buttonsDiv = document.createElement('div');
	buttonsDiv.style.display = 'flex';
	buttonsDiv.style.justifyContent = 'center';
	buttonsDiv.style.margin = '4px 0 0 0';

	// loop button
	const setLoopEnabled = (enabled: boolean) => {
		loopButton.style.backgroundColor = enabled ? ACTIVE_BUTTON_COLOR : '';
	};
	const isLoopEnabled = () =>
		loopButton.style.backgroundColor === ACTIVE_BUTTON_COLOR;
	const loopButton = document.createElement('button');
	loopButton.appendChild(makeImg(reloadSvg));
	loopButton.style.border = '0';
	loopButton.style.borderRadius = '0';
	loopButton.style.marginRight = '16px';
	loopButton.style.height = '24px';
	loopButton.style.borderRadius = '4px';
	loopButton.onclick = () => setLoopEnabled(!isLoopEnabled());
	buttonsDiv.appendChild(loopButton);

	const decrement = () => {
		slider.value = String(Math.max(0, Number(slider.value) - 1));
		onSliderValueChange();
		return Number(slider.min) < Number(slider.value);
	};
	const increment = () => {
		if (
			loopButton.style.backgroundColor !== '' &&
			Number(slider.value) == Number(slider.max)
		) {
			while (decrement()) {}
		} else {
			slider.value = String(
				Math.min(Number(slider.max), Number(slider.value) + 1),
			);
		}
		onSliderValueChange();
		return Number(slider.value) < Number(slider.max);
	};

	// prev button
	const prevButton = document.createElement('button');
	prevButton.appendChild(makeImg(skipBackwardSvg));
	prevButton.onclick = decrement;
	prevButton.style.border = '0';
	prevButton.style.height = '24px';
	prevButton.style.borderRadius = '4px';

	// pause button
	const pause = () => {
		if (timerId === undefined) return;
		clearInterval(timerId);
		timerId = undefined;
		pauseButton.onclick = null;
		playButton.style.backgroundColor = '';
	};
	const pauseButton = document.createElement('button');
	pauseButton.appendChild(makeImg(pauseSvg));
	pauseButton.style.border = '0';
	pauseButton.style.height = '24px';
	pauseButton.style.borderRadius = '4px';
	pauseButton.onclick = pause;

	// play button
	const isPlaying = () =>
		playButton.style.backgroundColor === ACTIVE_BUTTON_COLOR;
	const play = () => {
		if (isPlaying()) return;
		playButton.style.backgroundColor = ACTIVE_BUTTON_COLOR;
		timerId = setInterval(() => {
			increment();
		}, interval);
	};

	const playButton = document.createElement('button');
	playButton.appendChild(makeImg(playSvg));
	playButton.style.border = '0';
	playButton.style.height = '24px';
	playButton.style.borderRadius = '4px';
	playButton.onclick = play;

	// next button
	const nextButton = document.createElement('button');
	nextButton.appendChild(makeImg(skipForwardSvg));
	nextButton.style.border = '0';
	nextButton.style.height = '24px';
	nextButton.style.borderRadius = '4px';
	nextButton.onclick = increment;

	buttonsDiv.appendChild(prevButton);
	buttonsDiv.appendChild(pauseButton);
	buttonsDiv.appendChild(playButton);
	buttonsDiv.appendChild(nextButton);

	container.appendChild(buttonsDiv);

	return {
		container,
		titleDiv,
		slider,
		increment,
		decrement,
		isPlaying,
		play,
		pause,
		isLoopEnabled,
		setLoopEnabled,
	};
};

type TemporalFrame = {
	title: string;
	layers: LayerSpecification[];
};

type Options = {
	position?: ControlPosition;
	interval?: number;
	performance?: boolean;
};

export default class TemporalControl implements IControl {
	private map: Map | undefined;
	private options: Options;

	private container: HTMLDivElement;
	private containerTitle!: HTMLDivElement;
	private temporalSlider!: HTMLInputElement;
	private temporalFrames: TemporalFrame[];

	next: () => boolean;
	prev: () => boolean;
	play: () => void;
	pause: () => void;
	isPlaying: () => boolean;
	isLoopEnabled: () => boolean;
	setLoopEnabled: (enabled: boolean) => void;
	goto: (index: number) => void;

	constructor(temporalFrames: TemporalFrame[], options: Options = {}) {
		this.temporalFrames = temporalFrames;
		this.options = options;

		const containerOptions: ContainerOptions = {
			length: this.temporalFrames.length,
			interval: this.options.interval || 500,
			onSliderValueChange: () => this.refresh(),
		};

		const {
			container,
			titleDiv,
			slider,
			increment,
			decrement,
			play,
			pause,
			isPlaying,
			isLoopEnabled,
			setLoopEnabled,
		} = makeContainer(containerOptions);

		this.container = container;
		this.containerTitle = titleDiv;
		this.temporalSlider = slider;
		this.next = increment;
		this.prev = decrement;
		this.play = play;
		this.pause = pause;
		this.isPlaying = isPlaying;
		this.isLoopEnabled = isLoopEnabled;
		this.setLoopEnabled = setLoopEnabled;
		this.goto = (idx: number) => {
			slider.value = String(
				Math.min(this.temporalFrames.length - 1, Math.max(0, idx)),
			);
			this.refresh();
		};
	}

	onAdd(map: Map) {
		this.map = map;
		map.getContainer().appendChild(this.container);

		this.map.once('styledata', () => {
			this.refresh();
		});

		return this.container;
	}

	onRemove() {
		this.container.parentNode?.removeChild(this.container);
		this.map = undefined;
	}

	getDefaultPosition(): ControlPosition {
		return 'bottom-left';
	}

	refresh() {
		const sliderValue = Number(this.temporalSlider.value);
		this.containerTitle.innerHTML = this.temporalFrames[sliderValue].title;
		const visibleLayerIds = this.temporalFrames[sliderValue].layers.map(
			(layer) => layer.id,
		);
		this.temporalFrames.forEach((temporalFrame) => {
			temporalFrame.layers.forEach((layer) =>
				this.setVisible(layer, visibleLayerIds.includes(layer.id)),
			);
		});
	}

	private setVisible(layer: LayerSpecification, isVisible = true) {
		if (
			layer.type === 'raster' ||
			layer.type === 'fill' ||
			layer.type === 'circle' ||
			layer.type === 'line'
		) {
			if (layer.type === 'raster') {
				// when raster, set opacity as visibility for background loading
				this.map?.setPaintProperty(
					layer.id,
					`${layer.type}-opacity-transition`,
					{
						// set disable fade-in transition
						duration: 0,
					},
				);
			}
			let opacity;
			if (isVisible) {
				// @ts-ignore
				opacity = layer.paint?.[`${layer.type}-opacity`] || 1;
			} else {
				opacity = this.options.performance ? 0.000000000000000000001 : 0;
			}

			this.map?.setPaintProperty(layer.id, `${layer.type}-opacity`, opacity);
		} else {
			this.map?.setLayoutProperty(
				layer.id,
				'visibility',
				isVisible ? 'visible' : 'none',
			);
		}
	}
}

