import { BeetrackDispatch } from "./beetrackDispatch.type";

export interface BeetrackRoute {
  id: number;
  dispatch_date: string;
  truck_identifier: string;
  truck: BeetrackTruck;
  driver_identifier: string;
  driver_name: string;
  driver_app_version: string;
  dispatches: BeetrackDispatch[];
  start_time: string; // Ex. "08:44:43";
  end_time: string; // Ex: "10:57:17";
  started_at: string; // Ex. "2015-03-30T08:44:43.000-03:00";
  ended_at: string; //Ex "2015-03-30T10:57:17.000-03:00";
}

interface BeetrackTruck {
  identifier: string;
  vehicle_type: number;
  groups: BeetrackGroup[];
}

interface BeetrackGroup {
  category: string;
  name: string;
}