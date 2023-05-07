import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTitleBarComponent} from './page-title-bar/page-title-bar.component';
import {MatButtonModule} from '@angular/material/button';
import {SpeakOnHoverDirective} from "../speak-on-hover.directive";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {DbadminComponent} from "./dbadmin/dbadmin.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [PageTitleBarComponent, SpeakOnHoverDirective, DbadminComponent],
    imports: [CommonModule,
        HttpClientModule,
        MatButtonModule,
        MatSlideToggleModule, MatSelectModule, ReactiveFormsModule, MatInputModule, RouterModule],
  exports: [PageTitleBarComponent, SpeakOnHoverDirective],
})
export class ComponentsModule {
}
