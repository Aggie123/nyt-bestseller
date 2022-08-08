export interface BookList{
  status:string,
  copyright: string,
  results: BookData[],
  num_results:number,
  last_modified:string
}
export interface BookData{
  display_name:string,
  list_name:string,
  bestsellers_date:string,
  published_date:string,
  rank: number,
  rank_last_week:number,
  weeks_on_list	:number,
  asterisk	:number,
  dagger:number,
  amazon_product_url	:string,
  isbns: {isbn10:string,isbn13:string}[],
  book_details:BookDetail[],
  reviews:Review[],
}
interface BookDetail{
  title	:string,
  description: string,
  contributor: string,
  author: string,
  contributor_note: string,
  price:number,
  age_group: string,
  publisher: string,
  primary_isbn13: string,
  primary_isbn10: string,
}
interface Review{
  book_review_link	:string,
  first_chapter_link	:string,
  sunday_review_link	:string,
  article_chapter_link:string,
}

export enum LOADINGSTATE {
  INIT=0,
  FAIL=-1,
  SUCCESS=1,
}
export interface LoadingDataState {
  loading: boolean,
  error?: Error|null,
  data: BookList,
}

export enum SortOptions{
  RANK=1,
  TITLE=2,
  AUTHOR=3,
  ISNN=4,
}