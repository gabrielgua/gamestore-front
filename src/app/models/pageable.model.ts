import { PageInfo } from "./page.info";

export class PageableModel<Jogo> {
    pageInfo!: PageInfo;
    content: Jogo[] = [];
}