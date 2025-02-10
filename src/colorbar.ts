
import type {
	IControl,
	Map,
	ControlPosition,
} from 'maplibre-gl';

import { expression } from "@maplibre/maplibre-gl-style-spec";
import type { Expression } from "@maplibre/maplibre-gl-style-spec";

type Options = {
  title: string;    // show title at the top of the color bar
  unit: string;     // show unit at the bottom of the color bar
	position?: ControlPosition;   // Optional position with a default top-left position
  width?: string;   // Optional width with a default 56px
  height?: string;  // Optional width with a default 272px
  max?: number;     // Optional max with a default 30
  decimal?: number; // Optional decimal with a default 1
};

interface ColorStep {
  speed: number;
  color: string;
}

export default class ColorBar implements IControl {
	private map: Map | undefined;
	private options: Options;

  private colorSteps: ColorStep[];
  private container: HTMLElement;
  private outContainer: HTMLElement;
  private titleDiv: HTMLElement;
  private unitDiv: HTMLElement;
  private legendItems: HTMLElement[] = [];

  propertySpec: Record<string, any>;

  constructor(propertySpec: any, options: Options) {
    if (!propertySpec) {
      this.propertySpec = {
        "fill-color": {
          default: [
            "step",
            ["get", "speed"],
            "#ff3f00", // Default color for speed < 0.10
            0.10, "#ff7e00",
            0.15, "#ffbe00",
            0.20, "#fffd00",
            0.25, "#c0ff00",
            0.30, "#81ff00",
            0.35, "#41ff00",
            0.40, "#02ff00",
            0.45, "#00ff3d",
            0.50, "#00ff7c",
            0.55, "#00ffbc",
            0.60, "#00fffb",
            0.65, "#00c2ff",
            0.70, "#0083ff",
            0.75, "#0043ff",
            0.80, "#0004ff",
            0.85, "#3b00ff",
            0.90, "#7a00ff",
            0.95, "#ba00ff",
            0.98, "#f900ff",
            1.00, "#f900ff",
          ],
          doc: "The color of each pixel of this layer",
          expression: {
            interpolated: true,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "fill-opacity": {
          type: "number",
          default: 0.5,
          minimum: 0,
          maximum: 1,
          transition: true,
          expression: {
            interpolated: true,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        }
      };
    } else {
      this.propertySpec = propertySpec;
    }

		this.options = {
	    position: "top-left",
      width: "56px",    // Default width
      height: "272px",  // Default width
      max: 30,          // Default max
      decimal: 1,          // Default max
      ...options,       // Override with user-provided options
    };

    this.colorSteps = this.getColorSteps();

    const { outContainer, innerContainer } = this.createContainer();
    this.outContainer = outContainer;
    this.container = innerContainer;
    this.titleDiv = this.createTitleDiv(this.options.title);
    this.unitDiv = this.createUnitDiv(this.options.unit);

    this.container.appendChild(this.titleDiv);
    this.container.appendChild(this.unitDiv);

  }

	private getWidth(): string {
		return this.options.width || "52px";
	}

	private getHeight(): string {
		return this.options.height || "272px";
	}

  private getHeightInPixels(): number {
    const heightExpression = this.getHeight();
    if (heightExpression.endsWith('px')) {
      return parseFloat(heightExpression);
    }

    if (heightExpression.endsWith('%')) {
      const parentHeight = this.outContainer.offsetHeight;
      const percentage = parseFloat(heightExpression) / 100;
      return parentHeight * percentage;
    }

    return 272;
  }

	private createContainer(): { outContainer: HTMLElement; innerContainer: HTMLElement } {
	  // Outer container
	  const outContainer = document.createElement("div");
	  outContainer.classList.add("maplibregl-ctrl");
	
	  // Outer container styles
	  outContainer.style.height = "100%"; // Fixed or dynamically adjustable height
	  outContainer.style.display = "flex";
	  outContainer.style.flexDirection = "column";
	  outContainer.style.alignItems = "center";
    outContainer.style.backgroundColor = "transparent"; 

	  // Inner container
    const group = this.options.position?.endsWith("left")
     ? "map-colorbar-left-group"
     : "map-colorbar-right-group";
	  const innerContainer = document.createElement("div");
	  innerContainer.classList.add(group);
	
	  // Inner container styles
	  innerContainer.style.width = this.getWidth();
	  innerContainer.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`;
	  innerContainer.style.backgroundColor = "rgba(0, 36, 71, 0.8)";
	  innerContainer.style.display = "flex";
	  innerContainer.style.flexDirection = "column";
		innerContainer.style.borderRadius = "10px";
	
	  // Add inner container to outer container
	  outContainer.appendChild(innerContainer);
	
	  // Return the inner container for further manipulation
	  return { outContainer, innerContainer };
	}

  private createTitleDiv(title: string): HTMLElement {
    const titleDiv = document.createElement("div");
    titleDiv.innerHTML = title;
    titleDiv.style.marginTop = "6px";
    titleDiv.style.marginBottom = "8px";
    titleDiv.style.display = "flex";
		titleDiv.style.justifyContent = "center"; 
		titleDiv.style.textAlign = "center";
    titleDiv.style.fontSize = "11px";
		titleDiv.style.lineHeight = "14px";
    titleDiv.style.color = "white";
	  titleDiv.style.width = this.getWidth();
    return titleDiv;
  }

  private createUnitDiv(unit: string): HTMLElement {
    const unitDiv = document.createElement("div");
    unitDiv.classList.add("map_colorbar_unit");
    unitDiv.innerHTML = `(${unit})`;
    unitDiv.style.marginTop = "8px";
	  unitDiv.style.width = this.getWidth(); // Fixed or dynamically adjustable width
    unitDiv.style.display = "flex";
		unitDiv.style.justifyContent = "center"; 
    unitDiv.style.color = "white";
    unitDiv.style.fontSize = "12px";
		unitDiv.style.textAlign = "center";
    return unitDiv;
  }

  private createColorBox(color: string): HTMLElement {
    const colorBox = document.createElement("div");
    colorBox.classList.add("map_colorbar_color_box");
    colorBox.style.width = "12px";
    colorBox.style.backgroundColor = color;
    return colorBox;
  }

  private createLabel(_step: ColorStep): HTMLElement {
    const label = document.createElement("div");
    label.classList.add("map_colorbar_label");
    label.style.marginLeft = "0px";
    label.style.marginRight = "2px";
    label.style.color = "white";
    label.style.fontSize = "10px";
    label.textContent = "";
    return label;
  }

  private initializeLegendItems(): void {
    this.colorSteps.forEach(({ speed, color }) => {
      const legendItem = document.createElement("div");
      legendItem.classList.add("map_colorbar_item");
      legendItem.style.display = "flex";
      legendItem.style.alignItems = "center";
      legendItem.style.marginBottom = "0px";
      legendItem.style.marginLeft = "10px";

      const colorBox = this.createColorBox(color);
      const label = this.createLabel({speed, color});

      legendItem.appendChild(colorBox);
      legendItem.appendChild(label);
      this.legendItems.push(legendItem);
      this.container.insertBefore(legendItem, this.unitDiv); // 插入 unitDiv 之前
    });
  }

  private calculateHeights(): { stepHeight: number; showInterval: number } {
    const h = this.getHeightInPixels();
    const containerHeight = (this.container.getBoundingClientRect().height
                               ? this.container.getBoundingClientRect().height
                               : h);
    const totalMargin = 6 + 8 + 8;
    const stepsHeight = (containerHeight - this.titleDiv.offsetHeight
                        - this.unitDiv.offsetHeight - totalMargin);

    const stepHeight = Math.max(Math.floor(stepsHeight / this.colorSteps.length), 5);
    const showInterval = Math.ceil(20 * this.colorSteps.length / stepsHeight);

    return { stepHeight, showInterval };
  }

  public update(): void {
    this.updateInnerContainerStyle(this.outContainer, this.container);
    const { stepHeight, showInterval } = this.calculateHeights();

    [...this.legendItems].reverse().forEach((legendItem, index) => {
      const colorBox = legendItem.querySelector(".map_colorbar_color_box") as HTMLElement;
      const label = legendItem.querySelector(".map_colorbar_label") as HTMLElement;

      legendItem.style.height = `${stepHeight}px`;
      colorBox.style.height = `${stepHeight}px`;
      let reverseIndex = this.colorSteps.length - 1 - index;

      if (
        index % showInterval !== 0
      ) {
        label.textContent = "";
      } else {
        label.textContent = `- ${this.colorSteps[reverseIndex]
                                  .speed.toFixed(this.options.decimal)}`;
      }
    });
  }

  onAdd(map: Map): HTMLElement {
    this.map = map;
		map.getContainer().appendChild(this.outContainer);

    this.initializeLegendItems();
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
    this.container.parentNode?.removeChild(this.container);
    this.outContainer.parentNode?.removeChild(this.outContainer);
		this.map = undefined;
  }

	refresh() {
	}

  getDefaultPosition(): ControlPosition {
    return this.options.position || 'top-left';
  };

	updateInnerContainerStyle(outContainer: HTMLElement, container: HTMLElement): void {
    if (!this.map) {
      return;
    }
    const parentContainer = this.map.getContainer();
	  const parentWidth = parentContainer.offsetWidth;
	  const parentHeight = parentContainer.offsetHeight;

    outContainer.style.height = `${parentHeight}px`;

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
	
	  // Update styles based on parent dimensions
	  if (parentWidth >= 480) {
	    marginTop = 15;
	    marginBottom = 15;
	    marginLeft = Math.max(15, defMarginLeft);
	    marginRight = Math.max(15, defMarginRight);
	  }

	  if (parentWidth >= 992 && parentHeight >= 992) {
	    marginTop = 40;
	    marginBottom = 40;
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
  
    container.style.alignItems = 'flex-start';
    container.style.display = 'flex'; // Ensures `align-items` works
	  container.style.height = `calc(min((100% - 29px), ${this.getHeight()}))`;
  }

  /**
   * Parses the "fill-color" property and extracts speed-to-color mappings.
   * @returns An array of speed thresholds and their corresponding colors.
   */
  getColorSteps(): ColorStep[] {
    const colorSpec = this.propertySpec["fill-color"];
    if (!colorSpec) {
      throw new Error("Missing 'fill-color' specification.");
    }
  
    const colorSteps = colorSpec.default || colorSpec;
    const stepType = colorSteps[0];
  
    if (stepType !== "step") {
      throw new Error("Only 'step' expressions are supported.");
    }
  
    const steps: ColorStep[] = [];
    const [, , defaultColor, ...pairs] = colorSteps;
  
    const maxSpeed: number = this.options?.max || 30;
  
    // Add default color for speed < first threshold
    steps.push({ speed: 0, color: defaultColor });
  
    // Extract speed thresholds and colors
    for (let i = 0; i < pairs.length; i += 2) {
      const speed = pairs[i] as number;
      const absSpeed = speed * maxSpeed;
      const color = pairs[i + 1] as string;
      steps.push({ speed: absSpeed, color });
    }
  
    // Sort steps by speed in ascending order
    return steps.sort((a, b) => b.speed - a.speed);
  }


  /**
   * Sets a property using a Mapbox style expression.
   * @param prop The property name.
   * @param value The Mapbox style expression.
   */
  setProperty(prop: string, value: Expression) {
    const spec = this.propertySpec[prop];
    if (!spec) {
      throw new Error(`Property "${prop}" is not defined in the specification.`);
    }

    const expr = expression.createPropertyExpression(value, spec);
    if (expr.result === "success") {
      switch (expr.value.kind) {
        case "camera":
        case "composite":
          // Example: handle zoom-dependent properties
          console.log(`Camera/composite expression set for property "${prop}"`);
          break;
        default:
          // Example: handle constant or other property types
          console.log(`Property "${prop}" set with value`, expr.value);
          break;
      }
    } else {
      throw new Error(`Invalid expression for property "${prop}": ${expr.value}`);
    }
  }
}

