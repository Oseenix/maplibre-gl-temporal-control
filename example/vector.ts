import maplibregl, {
	FillLayerSpecification,
	StyleSpecification,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { TemporalControl, ColorBar } from '../src';

const temporalLayerNames = [
	'201901',
	'201902',
	'201903',
	'201904',
	'201905',
	'201906',
	'201907',
	'201908',
	'201909',
	'201910',
	'201911',
	'201912',
	'202001',
	'202002',
	'202003',
	'202004',
	'202005',
	'202006',
	'202007',
	'202008',
	'202009',
	'202010',
	'202011',
	'202012',
];

const getPaint = (layerName: string) => {
	const targetData = layerName + 'd1t0';
	return {
		'fill-color': [
			'interpolate',
			['linear'],
			['get', targetData],
			0,
			'#ffffff',
			100,
			'#0000ff',
			5000,
			'#00ff00',
			10000,
			'#ffff00',
			30000,
			'#ff0000',
			100000,
			'#990000',
		],
		'fill-opacity': [
			'interpolate',
			['linear'],
			['get', targetData],
			0,
			0,
			100,
			0.1,
			5000,
			0.2,
			10000,
			0.3,
			30000,
			0.4,
			100000,
			0.4,
		],
	};
};

const temporalLayers = temporalLayerNames.map(
	(layerName: string): FillLayerSpecification => {
		return {
			id: layerName,
			type: 'fill',
			source: 'mesh',
			'source-layer': 'meshesgeojsonl',
			paint: getPaint(layerName) as any,
		};
	},
);

const mapStyle: StyleSpecification = {
	version: 8,
	sources: {
		OSM: {
			type: 'raster',
			tiles: [
				'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
			],
			tileSize: 256,
			attribution:
				'<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>',
		},
		mesh: {
			type: 'vector',
			tiles: [
				'https://kanahiro.github.io/temporal-pop-mesh/meshes/{z}/{x}/{y}.pbf',
			],
			attribution:
				"<a href='https://www.geospatial.jp/ckan/dataset/mlit-1km-fromto' target='_blank'>全国の人流オープンデータ(平日昼間人口)</a> | <a href='https://twitter.com/kanahiro_iguchi' target='_blank'>@kanahiro_iguchi</a>",
			minzoom: 9,
			maxzoom: 9,
		},
	},
	layers: [
		{
			id: 'gsi',
			type: 'raster',
			source: 'OSM',
			minzoom: 0,
			maxzoom: 17,
		},
		...temporalLayers,
	],
};

const map = new maplibregl.Map({
	container: 'map',
	style: mapStyle,
	center: [139.7, 35.7],
	zoom: 10,
	minZoom: 4,
	maxZoom: 12,
});

const temporalFrames = temporalLayers.map((layer) => ({
	layers: [layer],
	title: layer.id,
}));

const temporalControl = new TemporalControl(temporalFrames, {
	interval: 1000,
	performance: true,
});

map.addControl(temporalControl);

const windColors = {
  'fill-opacity': 1.0,
  'fill-color': [
    'step',
    ['get', 'speed'],
    '#ceffff',
    0.1250, '#9dfffe',
    0.1875, '#9BCDFD',
    0.2500, '#CEFECE',
    0.3125, '#FFFECE',
    0.3750, '#FECC9D',
    0.4375, '#FD9D70',
    0.5000, '#FD673D',
    0.5625, '#FC361D',
    0.6250, '#97040B',
    0.6875, '#ff99ff',
    0.7500, '#ff66ff',
    0.8125, '#cc02ff',
    0.8750, '#9900cc',
  ],
};

const colorbar = new ColorBar(windColors, {
	title: "Wind Speed",
  unit: "m",
  position: "top-left",
});

map.addControl(colorbar);

