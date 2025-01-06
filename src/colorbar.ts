
import type {
	IControl,
	Map,
	ControlPosition,
} from 'maplibre-gl';

import { expression } from "@maplibre/maplibre-gl-style-spec";
import type { Expression } from "@maplibre/maplibre-gl-style-spec";

type Options = {
  title: string;
  unit: string;
	position?: ControlPosition;
  width?: string;  // Optional width with a default value
  max?: number;    // Optional max with a default value
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
      width: "62px", // Default width
      max: 30,       // Default max
      ...options,    // Override with user-provided options
    };

    this.colorSteps = this.getColorSteps();
    const { outContainer, innerContainer } = this.createContainer();
    this.outContainer = outContainer;
    this.container = innerContainer;
    this.titleDiv = this.createTitleDiv(this.options.title);
    this.unitDiv = this.createUnitDiv(this.options.unit);

    this.container.appendChild(this.titleDiv);
    this.container.appendChild(this.unitDiv);

    this.initializeLegendItems();
    this.update();
  }

	private getWidth(): string {
		return this.options.width || "62px";
	}

	private createContainer(): { outContainer: HTMLElement; innerContainer: HTMLElement } {
	  // Outer container
	  const outContainer = document.createElement("div");
	  outContainer.classList.add("maplibregl-ctrl");
	
	  // Outer container styles
	  outContainer.style.display = "flex";
	  outContainer.style.flexDirection = "column";
	  outContainer.style.alignItems = "center";
    outContainer.style.backgroundColor = "transparent"; 

	  // Inner container
	  const innerContainer = document.createElement("div");
	  innerContainer.classList.add("map-colorbar-group");
	
	  // Inner container styles
	  innerContainer.style.width = this.getWidth(); // Fixed or dynamically adjustable width
	  innerContainer.style.height = "calc(min((100% - 29px), 272px))"; // Fixed or dynamically adjustable height
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
    // colorBox.style.border = "0.5px solid rgba(255, 255, 255, 0.8)";
    return colorBox;
  }

  private createLabel(_step: ColorStep): HTMLElement {
    const label = document.createElement("div");
    label.classList.add("map_colorbar_label");
    label.style.marginLeft = "2px";
    label.style.marginRight = "1px";
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
    const containerHeight = this.container.getBoundingClientRect().height;
    const unitHeight = 32;
    const totalMargin = 4 * this.colorSteps.length;
    const stepsHeight = containerHeight - this.titleDiv.offsetHeight - unitHeight - totalMargin;

    const stepHeight = Math.max(Math.floor(stepsHeight / this.colorSteps.length), 10);
    const showInterval = Math.ceil(this.colorSteps.length / (stepsHeight / 30));

    return { stepHeight, showInterval };
  }

  public update(): void {
    // requestAnimationFrame(() => {
    const { stepHeight, showInterval } = this.calculateHeights();

    this.legendItems.forEach((legendItem, index) => {
      const colorBox = legendItem.querySelector(".map_colorbar_color_box") as HTMLElement;
      const label = legendItem.querySelector(".map_colorbar_label") as HTMLElement;

      legendItem.style.height = `${stepHeight}px`;
      colorBox.style.height = `${stepHeight}px`;

      if (
        index === 0 || 
        index === this.colorSteps.length - 1 || 
        index % showInterval === 0
      ) {
        label.textContent = `${this.colorSteps[index].speed.toFixed(2)}`;
      } else {
        label.textContent = "";
      }
    });
    // });
  }

  onAdd(map: Map): HTMLElement {
    this.map = map;
		map.getContainer().appendChild(this.outContainer);

		this.map.once('styledata', () => {
			this.refresh();
		});

		return this.outContainer;
  }

  onRemove(): void {
    this.container.parentNode?.removeChild(this.container);
    this.outContainer.parentNode?.removeChild(this.container);
		this.map = undefined;
  }

	refresh() {
	}

  getDefaultPosition(): ControlPosition {
    return "top-left";
  };

  /**
   * Parses the "fill-color" property and extracts speed-to-color mappings.
   * @returns An array of speed thresholds and their corresponding colors.
   */
  getColorSteps(): ColorStep[] {
    const colorSpec = this.propertySpec["fill-color"];
    const colorSteps = colorSpec.default;
    const stepType = colorSteps[0];
    if (stepType !== "step") {
      throw new Error("Only 'step' expressions are supported.");
    }

    const steps: ColorStep[] = [];
    const [, , defaultColor, ...pairs] = colorSteps;

    // Add default color for speed < first threshold
    steps.push({ speed: 0, color: defaultColor });

    const maxSpeed: number = this.options.max || 30;

    // Extract speed thresholds and colors
    for (let i = 0; i < pairs.length; i += 2) {
      const speed = pairs[i] as number;
      const absSpeed = speed * maxSpeed;
      const color = pairs[i + 1] as string;
      steps.push({ speed: absSpeed, color });
    }

    return steps.reverse();
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

