import { Component } from "@angular/core";
import { color, colorAsHex } from "./color";
import { Experience } from "./experience/experience";

@Component({
	selector: "app-root",
	standalone: true,
	template: `
		<app-experience />
		<input type="color" [value]="colorAsHex()" (change)="onChange($event)" />
	`,
	imports: [Experience],
	styles: `
		:host input {
			position: absolute;
			top: 0;
			right: 0;
		}
	`,
})
export class AppComponent {
	protected readonly color = color;
	protected readonly colorAsHex = colorAsHex;

	onChange(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.color.set(input.value);
	}
}
