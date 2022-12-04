import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FieldInputComponent } from './field-input/field-input.component';
import { FieldTextareaComponent } from './field-textarea/field-textarea.component';
import { FieldAutocompleteComponent } from './field-autocomplete/field-autocomplete.component';
import { FieldRadioComponent } from './field-radio/field-radio.component';
import { FieldCheckboxComponent } from './field-checkbox/field-checkbox.component';
import { FieldSelectComponent } from './field-select/field-select.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { FieldRoutingModule } from './field-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FieldDatetimeComponent } from './field-datetime/field-datetime.component';
import { FieldCkEditorComponent } from './field-ck-editor/field-ck-editor.component';
import { FieldSelectAjaxComponent } from './field-select-ajax/field-select-ajax.component';
import { FieldSelectSqlComponent } from './field-select-sql/field-select-sql.component';
import { FieldFileComponent } from './field-file/field-file.component';
import { FieldAceEditorComponent } from './field-ace-editor/field-ace-editor.component';
@NgModule({
  declarations: [FieldInputComponent, FieldTextareaComponent, FieldAutocompleteComponent, FieldRadioComponent, FieldCheckboxComponent, FieldSelectComponent, FieldBuilderComponent, FieldDatetimeComponent, FieldCkEditorComponent, FieldSelectAjaxComponent, FieldSelectSqlComponent, FieldFileComponent, FieldAceEditorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FieldRoutingModule,
    CKEditorModule
  ],
  exports: [FieldInputComponent, FieldTextareaComponent, FieldAutocompleteComponent, FieldRadioComponent, FieldCheckboxComponent, FieldSelectComponent, FieldBuilderComponent, FieldAceEditorComponent],
})
export class FieldModule { }
