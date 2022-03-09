export interface SearchWay {
  id: number;
  name: string;
}

export interface SearchResponse {
  ways: Array<SearchWay>;
}
