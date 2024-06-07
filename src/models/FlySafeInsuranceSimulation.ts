export class FlySafeInsuranceSimulation {
   id?: string;
   premium_total?: number;
   flysafe_simulation_response?: string;
   simulation_id?: number;
   vehicle?: string;

  constructor(
    id?: string,
    premium_total?: number,
    flysafe_simulation_response?: string,
    simulation_id?: number,
    vehicle?: string
  ) {
    this.id = id;
    this.premium_total = premium_total;
    this.flysafe_simulation_response = flysafe_simulation_response;
    this.simulation_id = simulation_id;
    this.vehicle = vehicle;
  }
}
