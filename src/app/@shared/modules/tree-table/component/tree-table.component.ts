import {Component, OnInit, Input, Output, ElementRef, EventEmitter, ViewChild} from '@angular/core';
import {Node, TreeTableNode, Options, SearchableNode} from '../models';
import {TreeService} from '../services/tree/tree.service';
import {MatTableDataSource} from '@angular/material/table';
import {ValidatorService} from '../services/validator/validator.service';
import {ConverterService} from '../services/converter/converter.service';
import {LanguageService} from '../../../../@core/modules/languiage/language.service';
import {defaultOptions} from '../default.options';
import {flatMap, defaults} from 'lodash-es';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent<T> implements OnInit {
  @Input() tree: Node<T> | Node<T>[];
  @Input() options: Options<T> = {};
  @Input() hiddenButton = false;
  @Output() nodeClicked: Subject<TreeTableNode<T>> = new Subject();
  @Output() addMenu: Subject<any> = new Subject();
  @Output() editMenu: Subject<any> = new Subject();
  @Output() delMenu: Subject<any> = new Subject();
  @Output() addArticle: Subject<any> = new Subject();
  @Output() viewArticles: Subject<any> = new Subject();
  @Output() titleClicked = new EventEmitter();
  private searchableTree: SearchableNode<T>[];
  private treeTable: TreeTableNode<T>[];
  autoColumns: string[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<TreeTableNode<T>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private treeService: TreeService,
    private validatorService: ValidatorService,
    private converterService: ConverterService,
    private languageSvc: LanguageService,
    elem: ElementRef) {
  }

  ngOnInit(): void {
    this.tree = Array.isArray(this.tree) ? this.tree : [this.tree];
    this.options = this.parseOptions(defaultOptions);
    const customOrderValidator = this.validatorService.validateCustomOrder(
      (this.tree[0] as unknown) as Node<{ [x: string]: {} }>,
      this.options.customColumnOrder
    );
    if (this.options.customColumnOrder && !customOrderValidator.valid) {
      throw new Error(`
        Properties ${customOrderValidator.xor.map(x => `'${x}'`).join(', ')} incorrect or missing in customColumnOrder`
      );
    }
    this.autoColumns = this.options.customColumnOrder
      ? this.options.customColumnOrder
      : this.extractNodeProps(this.tree[0]);
    this.displayedColumns = JSON.parse(JSON.stringify(this.autoColumns));
    this.displayedColumns.push('actions');
    this.searchableTree = this.tree.map(t => this.converterService.toSearchableTree(t));
    const treeTableTree = this.searchableTree.map(st => this.converterService.toTreeTableTree(st));
    this.treeTable = flatMap(treeTableTree, this.treeService.flatten);
    this.dataSource = new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
    this.dataSource.paginator = this.paginator;
  }

  extractNodeProps(tree: Node<T> & { value: { [k: string]: any } }): string[] {
    return Object.keys(tree.value).filter(x => typeof tree.value[x] !== 'object');
  }

  /*generateDataSource(): MatTableDataSource<TreeTableNode<T>> {
    return new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
  }*/

  formatIndentation(node: TreeTableNode<T>, step: number = 5): string {
    return '&nbsp;'.repeat(node.depth * step);
  }

  formatElevation(): string {
    return `mat-elevation-z${this.options.elevation}`;
  }

  translate(key: string, ...args: any[]): string {
    return this.languageSvc.translate(key);
  }

  onTitleClick(element): void {
    this.titleClicked.next(element);
  }

  onNodeClick(clickedNode): void {
    clickedNode.isExpanded = !clickedNode.isExpanded;
    this.treeTable.forEach(el => {
      el.isVisible = this.searchableTree.every(st => {
        return this.treeService.searchById(st, el.id).fold([], n => n.pathToRoot)
          .every(p => this.treeTable.find(x => x.id === p.id).isExpanded);
      });
    });
    this.dataSource = new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
    this.dataSource.paginator = this.paginator;
    this.nodeClicked.next(clickedNode);
  }

  handleToAddArticle(menu): void {
    this.addArticle.next(menu);
  }

  handleToAdd(menu): void {
    this.addMenu.next(menu);
  }

  handleToEdit(menu): void {
    this.editMenu.next(menu);
  }

  handleToViewArticles(menu): void {
    this.viewArticles.next(menu);
  }

  handleToDel(menu): void {
    this.delMenu.next(menu);
  }

  // Overrides default options with those specified by the user
  parseOptions(defaultOpts: Options<T>): Options<T> {
    return defaults(this.options, defaultOpts);
  }
}
