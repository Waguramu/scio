import { Component } from '@angular/core';

@Component({
    selector: 'example-app',
    templateUrl: 'viewer.component.html'
})
export class ViewerComponent {
    pdfSrc: string = localStorage.getItem("file_src");
}