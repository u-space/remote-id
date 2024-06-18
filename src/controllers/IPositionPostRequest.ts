/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface IPoint {
  latitude: number;
  longitude: number;
  altitude: number;
}

interface IOperationArea {
  radius: number;
  polygon: IPoint[];
  floor: number;
  ceiling: number;
  start_time: string;
  end_time: string;
}

export interface IPositionPostRequest {
  uas_id: string;
  operation_id?: string;
  ua_type: number;
  timestamp: string;
  operational_status: number;
  latitude: number;
  longitude: number;
  geodetic_altitude: number;
  horizontal_accuracy: number;
  vertical_accuracy: number;
  speed: number;
  direction: number;
  vertical_speed: number;
  authentication_data: string;
  operator_location: IPoint;
  operating_area: IOperationArea;
}
