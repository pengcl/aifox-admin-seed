import {Injectable, Injector, HostBinding} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ToastService} from '../../modules/toast';
import {SettingService} from '../../../pages/admin/setting/setting.service';
import {LanguageService} from '../../../@core/modules/languiage/language.service';
import {MenuService} from '../../../pages/admin/menu/menu.service';
import {TagService} from '../../../@core/services/tag.service';
import {ContentTypeService} from '../../../@core/services/contentType.service';
import {CustomTypeService} from '../customType/customType.service';
import {ChannelService} from '../../../@core/services/channel.service';
import {TemplateService} from '../../../@core/services/template.service';
import {CompanyService} from '../../../pages/admin/company/company.service';
import {RoleService} from '../../../pages/admin/user/role.service';
import {DocService} from '../../../@core/modules/apiDocumentaion/doc.service';
import {SortService} from '../../../@core/services/sort.service';
import {DialogService} from '../../modules/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {Observable, of, forkJoin} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {hump} from '../../../@core/utils/extend';
import {isObject, isArray, isNull} from 'lodash-es';

@Injectable()
export abstract class AppBaseComponent {
  @HostBinding('class') classes = 'ion-page';
  setting;
  lan;
  form: FormGroup;
  fb: FormBuilder;
  keys;
  route: ActivatedRoute;
  router: Router;
  location: LocationStrategy;
  dialogSvc: DialogService;
  toastSvc: ToastService;
  settingSvc: SettingService;
  languageSvc: LanguageService;
  menuSvc: MenuService;
  tagSvc: TagService;
  roleSvc: RoleService;
  contentTypeSvc: ContentTypeService;
  customTypeSvc: CustomTypeService;
  channelSvc: ChannelService;
  companySvc: CompanyService;
  templateSvc: TemplateService;
  docSvc: DocService;
  sortSvc: SortService;
  loading = false;
  selector: any = {};
  floatLabelType = 'always';

  protected constructor(injector: Injector) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.fb = injector.get(FormBuilder);
    this.location = injector.get(LocationStrategy);
    this.toastSvc = injector.get(ToastService);
    this.dialogSvc = injector.get(DialogService);
    this.settingSvc = injector.get(SettingService);
    this.languageSvc = injector.get(LanguageService);
    this.menuSvc = injector.get(MenuService);
    this.tagSvc = injector.get(TagService);
    this.roleSvc = injector.get(RoleService);
    this.contentTypeSvc = injector.get(ContentTypeService);
    this.customTypeSvc = injector.get(CustomTypeService);
    this.channelSvc = injector.get(ChannelService);
    this.companySvc = injector.get(CompanyService);
    this.templateSvc = injector.get(TemplateService);
    this.docSvc = injector.get(DocService);
    this.sortSvc = injector.get(SortService);
    this.setting = this.settingSvc.currentSettings;
    this.lan = this.setting.language.code;
  }

  getKeys(apiID, orderKeys): void {
    const dto = this.docSvc.inputDto(apiID);
    this.keys = this.sortSvc.sortKeys(dto, orderKeys);
    this.form = this.createFormGroup();
  }

  translate(key: string, ...args: any[]): string {
    return this.languageSvc.translate(key);
  }

  getSelections(relationKeys): Observable<any> {
    const keys = [];
    const requests = [];
    relationKeys.forEach(item => {
      if (item.attributes.type === 'relation') {
        keys.push(item.key);
        requests.push(this[hump(item.attributes.model || item.attributes.collection) + 'Svc'].items());
      }
      if (item.attributes.type === 'media') {
        this.selector[item.key] = [];
      }
    });
    return forkJoin(requests).pipe(mergeMap((selections: [][]) => {
      selections.forEach((selection, index) => {
        this.selector[keys[index]] = selection;
        selection.forEach((item: any) => {
          if (item.default) {
            if (this.form.get(keys[index]).invalid) {
              this.form.get(keys[index]).setValue(item.id);
            }
          }
        });
      });
      return of(this.selector);
    }));
  }

  createFormGroup(): FormGroup {
    const formGroup: FormGroup = new FormGroup({});
    this.keys.forEach(item => {
      formGroup.addControl(item.key,
        this.fb.control('', []));
      const control = formGroup.get(item.key);
      if (item.attributes.required) {
        control.setValidators(Validators.required);
      }
      if (item.attributes.minLength) {
        control.setValidators(Validators.minLength(item.attributes.minLength));
      }
      if (item.attributes.maxLength) {
        control.setValidators(Validators.maxLength(item.attributes.maxLength));
      }
      if (item.attributes.default || item.attributes.default === 0) {
        control.setValue(item.attributes.default);
      }
      if (item.attributes.type === 'email') {
        control.setValidators(Validators.email);
      }
    });
    return formGroup;
  }

  formatValues(res, formatKey): any {
    const value = {};
    for (const key in res) {
      if (isObject(res[key]) || isArray(res[key])) {
        if (isObject(res[key])) {
          value[key] = res[key][formatKey];
        }
        if (isArray(res[key])) {
          const ids = [];
          res[key].forEach(item => {
            ids.push(item[formatKey]);
          });
          value[key] = ids;
        }
      } else {
        value[key] = res[key];
      }
    }
    return value;
  }

  /*isGranted(permissionName: string): boolean {
    return this.permission.isGranted(permissionName);
  }*/

  /*isGrantedAny(...permissions: string[]): boolean {
    if (!permissions) {
      return false;
    }

    for (const permission of permissions) {
      if (this.isGranted(permission)) {
        return true;
      }
    }

    return false;
  }*/

  // t(dateTime: Date, format: string = 'YYYY-MM-DD HH:mm'): string {
  //   if (dateTime === undefined) {
  //     return '';
  //   }

  //   abp.clock.provider.normalize();

  //   const localDatetimeString = dateTime.local().format(format);
  //   return localDatetimeString;
  // }

  // d(momentTime: Moment, format: string = 'YYYY-MM-DD'): string {
  //   if (momentTime === undefined) {
  //     return '';
  //   }

  //   const localDatetimeString = momentTime.local().format(format);
  //   return localDatetimeString;
  // }

  toHTML(input): any {
    return new DOMParser().parseFromString(input, 'text/html').documentElement.textContent;
  }

  cdRefresh(): void {
    // wait checkbox
    // setTimeout(() => this.cdr.detectChanges());
  }
}


export abstract class AppItemBaseComponent extends AppBaseComponent {
  id = this.route.snapshot.params.id;

  protected constructor(injector: Injector) {
    super(injector);
  }

  init(apiID, orderKeys): any {
    this.getKeys(apiID, orderKeys);
    this.getSelections(this.keys).subscribe(res => {// 获取当前页面的所有选择项
      this.selector = res;
      if (this.selector[apiID]) {
        const array = [];
        this.selector.menu.forEach(item => {
          if (apiID === 'menu') {
            if (item.id.toString() !== this.id) {
              array.push(item);
            }
          }
          if (apiID === 'article' && item.content_type === 'list') {
            if (item.content_type === 'list') {
              array.push(item);
            }
          }
        });
        this.selector.menu = array;
      }
    });
    if (this.id !== '0' && this.id !== undefined) {
      this[hump(apiID) + 'Svc'].item(this.id).subscribe(res => {
        const values = this.formatValues(res, 'id');
        this.keys.forEach(key => {
          this.form.get(key.key).setValue(!isNull(values[key.key]) ? values[key.key] : '');
          if (key.attributes.type === 'media') {
            key.attributes.multiple ? this.selector[key.key] = res[key.key] : (this.selector[key.key] = res[key.key] ? [res[key.key]] : []);
          }
        });
      });
    }
    if (apiID === 'config') {
      this.settingSvc.get().subscribe(res => {
        const values = this.formatValues(res, 'id');
        this.keys.forEach(key => {
          this.form.get(key.key).setValue(!isNull(values[key.key]) ? values[key.key] : '');
          if (key.attributes.type === 'media') {
            key.attributes.multiple ? this.selector[key.key] = res[key.key] : (this.selector[key.key] = res[key.key] ? [res[key.key]] : []);
          }
        });
      });
    }
  }

  submit(service, callback?): void {
    if (this.form.valid) {
      const value = {};
      for (const key in this.form.value) {
        if (this.form.get(key).value !== '') {
          value[key] = this.form.get(key).value;
        } else {
          value[key] = null;
        }
      }
      const request = this.id === '0' || this.id === undefined ? service.create(value) : service.update(this.id, value);
      this.loading = true;
      this.toastSvc.loading('提交中...', 0);
      request.subscribe(res => {
        this.loading = false;
        this.toastSvc.hide();
        this.toastSvc.success('保存成功', 1000);
        if (callback) {
          callback(res);
        }
      });
    }
  }

  back(): void {
    this.location.back();
  }
}

export abstract class AppListBaseComponent extends AppBaseComponent {
  dataSource;
  selection = new SelectionModel<any>(true, []);

  protected constructor(injector: Injector) {
    super(injector);
    // this.page  = new PaginationBaseDto(AppConsts.grid.defaultPageSize);
  }

  formatList(res, key): any {
    const items = [];
    res.forEach(item => {
      const formatItem = this.formatValues(item, key);
      items.push(formatItem);
    });
    return items;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): any {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  // page: PaginationBaseDto = new PaginationBaseDto(AppConsts.grid.defaultPageSize);
}
