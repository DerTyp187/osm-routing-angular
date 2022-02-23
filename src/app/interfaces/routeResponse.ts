
interface ResponseNode{
  lat: number;
  lon: number;
}

export interface RouteResponse{
  nodes: Array<ResponseNode>;
}
