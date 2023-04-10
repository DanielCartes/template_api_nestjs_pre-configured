export interface UpdateBeetrackRouteBody {
  route_id: number;
  dispatches: Dispatch[];
}

interface Dispatch {
  identifier: string;
  contact_address: string;
  status: number;
  latitude: number;
  longitude: number;
  tags: Tag[];
  groups: Group[]
}

interface Tag {
  name: string;
  value: string
}

interface Group {
  category?: string;
  name: string;
}