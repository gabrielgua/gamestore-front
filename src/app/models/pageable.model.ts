import { PageInfo } from "./page.info";

export class PageableModel<T> {
    pageInfo!: PageInfo;
    content: T[] = [];
}