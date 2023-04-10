export interface BeetrackDispatch {
  id: number;
  dispatch_id: number;
  identifier: string;
  contact_name: string;
  contact_address: string;
  contact_phone: string;
  contact_id: string;
  contact_email: string;
  latitude: string;
  longitude: string;
  route_id: number;
  status: string;
  status_id: number;
  substatus?: any;
  substatus_code?: any;
  tags: BeetrackTag[];
  is_trunk: boolean;
  is_pickup: boolean;
  delivered_in_client: boolean;
  arrived_at: string;
  estimated_at: string;
  min_delivery_time: string;
  max_delivery_time: string;
  beecode: string;
  locked: boolean;
  end_type: number;
  number_of_retries: number;
  items: Item[];
  destination: Destination;
}

interface Destination {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
  original_quantity: number;
  delivered_quantity: number;
  code: string;
  extras: any[];
}

export interface BeetrackTag {
  name: string;
  value: string;
}