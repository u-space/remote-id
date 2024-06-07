export type FilterAndPaginatorProps = {
  orderBy?: string;
  order?: "asc" | "desc" | undefined;
  take?: number;
  skip?: number;
  filterBy?: string;
  filter?: string;
  polygon?: GeoJSON.Polygon;
};
