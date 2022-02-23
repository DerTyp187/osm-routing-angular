/**
 * Nominatim JSON object to TypeScript interface
 */
export interface Nominatim {
    boundingbox?: Array<string>;
    category?: string;
    display_name?: string;
    icon?: string;
    importance?: number;
    lat?: string;
    licence?: string;
    lon?: string;
    osm_id?: number;
    osm_type?: string;
    place_id?: number;
    place_rank?: number;
    type?: string;
}
