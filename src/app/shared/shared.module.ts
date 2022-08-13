import { CheckboxModule } from 'primeng/checkbox';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { ListboxModule } from 'primeng/listbox';
import { PaginatorModule } from 'primeng/paginator';
import { TreeModule } from 'primeng/tree';
import { SkeletonModule } from 'primeng/skeleton';
import { ChipsModule } from 'primeng/chips';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import {StepsModule} from 'primeng/steps';
import { ChipModule } from 'primeng/chip';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
    SidebarModule,
    ProgressSpinnerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
    SidebarModule,
    ProgressSpinnerModule
  ],
})
export class sharedModule {}
