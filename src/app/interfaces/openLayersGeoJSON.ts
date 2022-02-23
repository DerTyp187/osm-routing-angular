interface OpenLayersGeometry {
    coordinates: Array<Array<number>>;
    type?: string;
}

interface OpenLayersProperties {
    ECO_NAME?: string;
    BIOME_NAME?: string;
    REALM?: string;
    NNH?: string;
    NNH_NAME?: string;
    COLOR?: string;
    COLOR_BIO?: string;
    COLOR_NNH?: string;
}

interface OpenLayersFeature {
    type: string;
    geometry: OpenLayersGeometry;
    id: number;
    properties: OpenLayersProperties;
}

export interface OpenLayersGeoJSON {
    type: string;
    features: Array<OpenLayersFeature>;
    geometry: OpenLayersGeometry;
    properties: OpenLayersProperties;
}
