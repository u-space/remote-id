/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Point, Polygon } from "geojson";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 50 })
  operator_username?: string;

  @Column({ type: "uuid" })
  uas_id?: string;

  @Column({ type: "int" })
  ua_type?: number;

  @Column({ type: "timestamp" })
  timestamp?: Date;

  @Column({ type: "int" })
  operational_status?: number;

  @Column("geometry")
  position?: Point;

  @Column({ type: "float" })
  geodetic_altitude?: number;

  @Column({ type: "int" })
  horizontal_accuracy?: number;

  @Column({ type: "int" })
  vertical_accuracy?: number;

  @Column({ type: "float" })
  speed?: number;

  @Column({ type: "int" })
  direction?: number;

  @Column({ type: "float" })
  vertical_speed?: number;

  @Column("geometry")
  operator_location?: Point;

  @Column({ type: "int" })
  operating_area_radius?: number;

  @Column("geometry")
  operating_area_polygon?: Polygon;

  @Column({ type: "int" })
  operating_area_floor?: number;

  @Column({ type: "int" })
  operating_area_ceiling?: number;

  @Column({ type: "timestamp" })
  operating_area_start_time?: Date;

  @Column({ type: "timestamp" })
  operating_area_end_time?: Date;
}
