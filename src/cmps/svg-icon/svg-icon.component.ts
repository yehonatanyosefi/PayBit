import { Component, Input, OnInit } from '@angular/core';
import { SvgService } from 'src/services/svg.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnInit {
  @Input() iconName: string = '';
  @Input() height: string = '20';
  @Input() width: string = '20';
  svgContent: SafeHtml | null = null;

  constructor(
    private svgService: SvgService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const svgString = this.svgService.getSvg(this.iconName);
    const sizedSvgString = this.applyDimensions(
      svgString,
      this.height,
      this.width
    );
    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(sizedSvgString);
  }

  private applyDimensions(
    svgString: string,
    height: string,
    width: string
  ): string {
    const parser = new DOMParser();
    const svgDocument = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = svgDocument.querySelector('svg');

    if (svgElement) {
      svgElement.setAttribute('height', height);
      svgElement.setAttribute('width', width);

      return svgElement.outerHTML;
    }

    return svgString;
  }
}

// usage in template:
//<div class="parent-of-svg-example">
//  other stuff...
//  <svg-icon iconName="dollar" height="50" width="50"></svg-icon>
//</div>

//style the class of it's parent element with the color you want it to have for example, or it will be the default text color:
//parent-of-svg-example {
//  color: black;
//}
