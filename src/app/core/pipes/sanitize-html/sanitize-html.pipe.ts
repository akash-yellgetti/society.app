import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as Mustache from 'mustache';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   *
   * @param- v
   */
  transform(template: string, data: any): SafeHtml {
    data['item'] = JSON.stringify(data);
    const html: any = Mustache.render(template, data);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}