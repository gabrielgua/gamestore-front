import { PageInfo } from "./page.info";

export interface PageableModel<T> {
    pageInfo: PageInfo,
    content: T[],
}