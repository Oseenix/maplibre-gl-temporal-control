import maplibregl, {
	FillLayerSpecification,
	StyleSpecification,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { TemporalControl, ColorBar, MsgCtl } from '../src';

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
    '#deffff',
    0.0625, '#94f6f9', // 2
    0.1250, '#4ee9f2', // 4
    0.1875, '#9BCDFD', // 6
    0.2500, '#CEFECE', // 8
    0.3125, '#FFFECE', // 10
    0.3750, '#FECC9D', // 12
    0.4375, '#FD9D70', // 14
    0.5000, '#FD673D', // 16
    0.5625, '#FC361D', // 18
    0.6250, '#97040B', // 20
    0.6875, '#ff99ff', // 22
    0.7500, '#ff66ff', // 24
    0.8125, '#cc02ff', // 26
    0.8750, '#9900cc', // 28
    0.9375, '#440066', // 30
    1.0000, '#330066', // 32
  ],
};

const waveColors = {
  'fill-opacity': 1.0,
  'fill-color': [
    'step',
    ['get', 'speed'],
    '#0e00cc',
    0.03125, '#0e66cc', // 0.5
    0.06250, '#0299ff', // 1.0
    0.09375, '#66ccff', // 1.5
    0.12500, '#66e6ff', // 2.0
    0.15625, '#aaffee', // 2.5
    0.18750, '#00ffcb', // 3.0
    0.21875, '#00e6b3', // 3.5
    0.25000, '#00cc88', // 4.0
    0.28125, '#a8ff04',
    0.31250, '#feff32',
    0.34375, '#9aff00',
    0.37500, '#508000',
    0.40625, '#ffcc65',
    0.43750, '#ff9966',
    0.46875, '#ff6602',
    0.50000, '#d45a4a',
    0.53125, '#f04020',
    0.56250, '#a83838',
    0.59375, '#ffccff',
    0.62500, '#ff99ff',
    0.65625, '#ff66ff',
    0.68750, '#cc02ff',
    0.71875, '#9900cc',
    0.75000, '#402060',
    0.78125, '#c0c0c0',
    0.81250, '#999999',
    0.84375, '#666666',
    0.87500, '#333333', // 1.000, 14
  ],
};

const colorbar = new ColorBar(windColors, {
	title: "Wind",
  unit: "m/s",
  max: 32,
  position: "top-left",
});

map.addControl(colorbar);

const msgShow = new MsgCtl({
  position: "bottom-right",
  innerHTML: '<strong>Local Model</strong>',
  style: {
    color: '#fff',
    fontSize: '14px',
    padding: '4px',
    display: 'flex',         // Enable Flexbox for centering
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',     // Center vertically
  }, 
});

map.addControl(msgShow);

