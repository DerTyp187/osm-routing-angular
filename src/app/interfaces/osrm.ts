interface OsrmWaypoint {
  hint?: string;
  distance?: number;
  location?: Array<number>;
  name?: string;
}

interface OsrmManeuver {
  type?: string;
  modifier?: string;
}

export interface OsrmStep {
  driving_side?: string;
  duration?: number;
  distance?: number;
  name?: string;
  maneuver?: OsrmManeuver;
}

interface OsrmLeg {
steps?: Array<OsrmStep>;
weight?: number;
distance?: number;
summary?: string;
duration?: number;
}

interface OsrmGeometry {
  type: GeometryType;
  coordinates?: Array<Array<number>>;
}

enum GeometryType {
  LINE_STRING = "LineString"
}

interface OsrmRoute {
  legs: Array<OsrmLeg>;
  geometry: OsrmGeometry;
}

export interface Osrm {
  code?: string;
  waypoints?: Array<OsrmWaypoint>;
  routes: Array<OsrmRoute>;
}
