import type {
	IControl,
	Map,
	ControlPosition,
} from 'maplibre-gl';

// Define the options type for the MsgCtl control
type Options = {
  msg?: string; // Message to display at the top of the control, optional
  position?: ControlPosition; // Position of the control, defaults to 'top-left'
  width?: string; // Width of the control, defaults to '56px'
  height?: string; // Height of the control, defaults to '272px'
  innerHTML?: string; // Custom inner HTML content, optional
  style?: Partial<CSSStyleDeclaration>; // Custom styles to apply, optional
};

export default class MsgCtl implements IControl {
	private map: Map | undefined;
	private options: Options;

  private container: HTMLElement;
  private outContainer: HTMLElement;

  constructor(options: Options) {
		this.options = {
	    position: "top-left",
      width: "156px",    // Default width
      height: "24px",  // Default width
      ...options,       // Override with user-provided options
    };


    const { outContainer, innerContainer } = this.createContainer();
    this.outContainer = outContainer;
    this.container = innerContainer;

  }

	private getWidth(): string {
		return this.options.width || "152px";
	}

	private getHeight(): string {
		return this.options.height || "27px";
	}

  // Create the control's container elements
  private createContainer(): { outContainer: HTMLElement; innerContainer: HTMLElement } {
    // Create outer container with MapLibre control class
    const outContainer = document.createElement('div');
    outContainer.className = 'maplibregl-ctrl maplibregl-ctrl-msg';

    // Create inner container for content
    const innerContainer = document.createElement('div');

    // Apply default styles
    innerContainer.style.width = this.getWidth();
    innerContainer.style.height = this.getHeight();
	  innerContainer.style.backgroundColor = "rgba(0, 36, 71, 0.7)";
    innerContainer.style.padding = '5px 10px';
    innerContainer.style.borderRadius = '3px';
    innerContainer.style.fontFamily = 'Arial, sans-serif';
    innerContainer.style.fontSize = '14px';

    // Set content: use innerHTML if provided, otherwise fallback to msg
    if (this.options.innerHTML) {
      innerContainer.innerHTML = this.options.innerHTML;
    } else if (this.options.msg) {
      innerContainer.textContent = this.options.msg;
    }

    // Apply custom styles if provided, merging with defaults
    if (this.options.style) {
      Object.assign(innerContainer.style, this.options.style);
    }

    outContainer.appendChild(innerContainer);

    return { outContainer, innerContainer };
  }


	updateInnerContainerStyle(container: HTMLElement): void {
    if (!this.map) {
      return;
    }
    const parentContainer = this.map.getContainer();
	  const parentWidth = parentContainer.offsetWidth;
	  const parentHeight = parentContainer.offsetHeight;

	  // Default styles
	  let marginTop = 10;
	  let marginBottom = 10;
		let defMarginLeft = Math.max(
		  10,
		  parseFloat(
		    getComputedStyle(parentContainer)
					.getPropertyValue('env(safe-area-inset-left)') || '0'
		  )
		);
    let defMarginRight = Math.max(
		  10,
		  parseFloat(
		    getComputedStyle(parentContainer)
					.getPropertyValue('env(safe-area-inset-right)') || '0'
		  )
		);
		let marginLeft = defMarginLeft;
		let marginRight = defMarginRight;
	
	  if (parentWidth >= 480) {
	    marginTop = 15;
	    marginBottom = 15;
	    marginLeft = Math.max(15, defMarginLeft);
	    marginRight = Math.max(15, defMarginRight);
	  }

	  if (parentWidth >= 992 && parentHeight >= 992) {
	    marginLeft = Math.max(40, defMarginLeft);
	    marginRight = Math.max(40, defMarginRight);
    }

    if (this.options.position?.endsWith("left")) {
      container.style.marginLeft = `${marginLeft}px`;
      container.style.marginRight = `${defMarginRight}px`;
    } else {
      container.style.marginLeft = `${defMarginLeft}px`;
      container.style.marginRight = `${marginRight}px`;
		}

    // Apply styles to innerContainer
    container.style.marginTop = `${marginTop}px`;
    container.style.marginBottom = `${marginBottom}px`;
  }

  public update(): void {
    this.updateInnerContainerStyle(this.container);
  }

  onAdd(map: Map): HTMLElement {
    this.map = map;
		map.getContainer().appendChild(this.outContainer);
    this.update();

		this.map.once('styledata', () => {
			this.refresh();
		});

    this.map.on('resize', () => {
      this.update();
    });

		return this.outContainer;
  }

  onRemove(): void {
    if (this.map) {
      this.map.off('resize', this.update);
      this.map.off('styledata', this.refresh);
    }

    // this.container.parentNode?.removeChild(this.container);
    this.outContainer.parentNode?.removeChild(this.outContainer);
		this.map = undefined;
  }

	refresh() {
	}

  // Update the control's styles dynamically
  public updateStyle(newStyle: Partial<CSSStyleDeclaration>): void {
    if (this.container) {
      Object.assign(this.container.style, newStyle);
    }
  }

  // Update the control's content dynamically, with an option to specify if it's HTML
  public updateContent(newContent: string, isHTML: boolean = false): void {
    if (this.container) {
      if (isHTML) {
        // Use innerHTML for HTML content
        this.container.innerHTML = newContent;
      } else {
        // Use textContent for plain text to avoid HTML parsing
        this.container.textContent = newContent;
      }
    }
  }

  getDefaultPosition(): ControlPosition {
    return this.options.position || 'top-left';
  };
}

