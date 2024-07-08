import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { extend, NgtCanvas } from "angular-three";
import {
	NgtsAccumulativeShadows,
	NgtsEnvironment,
	NgtsRandomizedLights,
} from "angular-three-soba/staging";
import * as THREE from "three";
import { CameraRig } from "./camera-rig";
import { Lightformers } from "./lightformers";
import { Porsche } from "./porsche";

extend(THREE);

@Component({
	standalone: true,
	template: `
		<ngt-spot-light
			[position]="[0, 15, 0]"
			[angle]="0.3"
			[penumbra]="1"
			[castShadow]="true"
			[intensity]="2 * Math.PI"
			[decay]="0"
		>
			<ngt-value [rawValue]="-0.0001" attach="shadow.bias" />
		</ngt-spot-light>
		<ngt-ambient-light [intensity]="0.5 * Math.PI" />

		<app-porsche
			[position]="[-0.5, -0.18, 0]"
			[rotation]="[0, Math.PI / 5, 0]"
			[scale]="1.6"
		/>

		<ngts-accumulative-shadows
			[options]="{
				position: [0, -1.16, 0],
				frames: 100,
				alphaTest: 0.9,
				scale: 10,
			}"
		>
			<ngts-randomized-lights
				[options]="{
					amount: 8,
					radius: 10,
					ambient: 0.5,
					position: [1, 5, -1],
					intensity: 1.5 * Math.PI,
				}"
			/>
		</ngts-accumulative-shadows>

		<ngts-environment
			[options]="{
				background: true,
				blur: 1,
				resolution: 256,
				frames: Infinity,
			}"
		>
			<ng-template>
				<app-lightformers />
			</ng-template>
		</ngts-environment>

		<app-camera-rig />
	`,

	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgtsAccumulativeShadows,
		NgtsRandomizedLights,
		Porsche,
		NgtsEnvironment,
		Lightformers,
		CameraRig,
	],
})
export class Scene {
	Math = Math;
	Infinity = Infinity;
}

@Component({
	selector: "app-experience",
	standalone: true,
	template: `
		<ngt-canvas
			[sceneGraph]="scene"
			[camera]="{ position: [5, 0, 15], fov: 30 }"
			[shadows]="true"
		/>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas],
	styles: `
		:host {
			display: block;
			height: 100vh;
		}
	`,
})
export class Experience {
	scene = Scene;
}
