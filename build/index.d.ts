import type { IControl, Map, LayerSpecification, ControlPosition } from 'maplibre-gl';
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
    private map;
    private options;
    private container;
    private containerTitle;
    private temporalSlider;
    private temporalFrames;
    next: () => boolean;
    prev: () => boolean;
    play: () => void;
    pause: () => void;
    isPlaying: () => boolean;
    isLoopEnabled: () => boolean;
    setLoopEnabled: (enabled: boolean) => void;
    goto: (index: number) => void;
    constructor(temporalFrames: TemporalFrame[], options?: Options);
    onAdd(map: Map): HTMLDivElement;
    onRemove(): void;
    getDefaultPosition(): ControlPosition;
    refresh(): void;
    private setVisible;
}
export {};
