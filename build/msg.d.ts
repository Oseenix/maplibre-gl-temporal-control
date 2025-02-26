import type { IControl, Map, ControlPosition } from 'maplibre-gl';
type Options = {
    msg?: string;
    position?: ControlPosition;
    width?: string;
    height?: string;
    innerHTML?: string;
    style?: Partial<CSSStyleDeclaration>;
};
export default class MsgCtl implements IControl {
    private map;
    private options;
    private container;
    private outContainer;
    constructor(options: Options);
    private getWidth;
    private getHeight;
    private createContainer;
    updateInnerContainerStyle(container: HTMLElement): void;
    update(): void;
    onAdd(map: Map): HTMLElement;
    onRemove(): void;
    refresh(): void;
    updateStyle(newStyle: Partial<CSSStyleDeclaration>): void;
    updateContent(newContent: string, isHTML?: boolean): void;
    getDefaultPosition(): ControlPosition;
}
export {};
