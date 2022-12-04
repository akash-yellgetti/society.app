import { AfterViewInit, OnInit, Component, ElementRef, ViewChild, Input } from "@angular/core";
import * as ace from "ace-builds";

@Component({
  selector: 'app-field-ace-editor',
  templateUrl: './field-ace-editor.component.html',
  styleUrls: ['./field-ace-editor.component.scss']
})
export class FieldAceEditorComponent implements OnInit, AfterViewInit {

  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  @ViewChild("output") private output: ElementRef<HTMLElement>;
  @Input() field: any;
  constructor() { }

  ngOnInit(): void {
    this.field.value = this.field.value || "";
  }
  
  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue(this.field.value);
    aceEditor.setTheme("ace/theme/monokai");
    aceEditor.session.setMode("ace/mode/html");
    aceEditor.on("change", () => this.editorChange(aceEditor));
  }

  editorChange = (aceEditor) => {
    const val = aceEditor.getValue();
    // console.log(val);
    this.field.value = val;

    this.output.nativeElement.innerHTML = val;
  }
}
