/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Position } from "../entities/position";
import { AppDataSource } from "../data-source";
import { Between, MoreThan } from "typeorm";

export class PositionDao {
  private repository = AppDataSource.getRepository(Position);

  constructor() {}

  async all() {
    try {
      return this.repository.find();
    } catch (error: any) {
      throw new Error("There was an error trying to execute PositionDao.all()");
    }
  }

  async lastPosition() {
    return this.repository.find({ order: { id: "DESC" }, take: 1 });
  }

  async allAfterId(id: number) {
    try {
      return this.repository.find({ where: { id: MoreThan(id) } });
    } catch (error: any) {
      throw new Error("There was an error trying to execute PositionDao.all()");
    }
  }

  async allBetweenDates(startDate: Date, endDate: Date) {
    try {
      return this.repository.find({
        where: { timestamp: Between(startDate, endDate) },
      });
    } catch (error: any) {
      throw new Error("There was an error trying to execute PositionDao.all()");
    }
  }

  async getPositionsByOperationId(operationId: string) {
    try {
      return this.repository.find({
        where: { operation_id: operationId },
        order: { timestamp: "ASC" },
      });
    } catch (error: any) {
      throw new Error(
        "There was an error trying to execute PositionDao.getPositionsByOperationId()"
      );
    }
  }

  async getPositionsByOperationIdWithDates(
    operationId: string,
    startDate: Date,
    endDate: Date
  ) {
    try {
      return this.repository.find({
        where: {
          operation_id: operationId,
          timestamp: Between(startDate, endDate),
        },
        order: { timestamp: "ASC" },
      });
    } catch (error: any) {
      throw new Error(
        "There was an error trying to execute PositionDao.getPositionsByOperationId()"
      );
    }
  }
  async one(id: number): Promise<Position> {
    try {
      return this.repository.findOneByOrFail({ id });
    } catch (error: any) {
      throw new Error(`There is no position with the "id" received (id=${id})`);
    }
  }

  async save(entity: Position) {
    try {
      return this.repository.save(entity);
    } catch (error: any) {
      console.log(error);
      throw new Error(
        "There was an error trying to execute PositionDao.save(entity)"
      );
    }
  }

  async savePositionsArray(entities: Position[]) {
    return this.repository.save(entities);
  }
}
