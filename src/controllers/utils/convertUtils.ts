import { stringToDate } from "../../utils/parseUtils";
import AutomaticCoordinatorProcedure from "../../models/AutomaticCoordinatorProcedure";
import { Coordination, CoordinationState } from "../../models/Coordination";
import {
  Coordinator,
  CoordinatorType,
  Liaison,
} from "../../models/Coordinator";
import { CoordinatorProcedure } from "../../models/CoordinatorProcedure";
import {
  FlightCategory,
  FlightRequest,
  FlightRequestState,
} from "../../models/FlightRequest";
import { FlightRequestPayment } from "../../models/FlightRequestPayment";
import { FlySafeInsuranceSimulation } from "../../models/FlySafeInsuranceSimulation";
import ManualCoordinatorProcedure from "../../models/ManualCoordinatorProcedure";
import OperationVolume from "../../models/OperationVolume";
import { BasicType, validateObjectKeys } from "../../utils/validationUtils";
import { Polygon, Position } from "geojson";
import { FilterAndPaginatorProps } from "../../utils/FilterAndPaginatorProps";
import { GeographicalZone } from "../../models/GeographicalZone";
import { User } from "../../models/User";
import { InvalidDataError } from "../../errors/InvalidDataError";

export const convertAnyToAutomaticCoordinatorProcedure = (
  value: any
): AutomaticCoordinatorProcedure => {
  const validInput = validateObjectKeys(
    value,
    [],
    [
      { name: "id", type: BasicType.string },
      { name: "email", type: BasicType.string },
      { name: "template_html", type: BasicType.string },
    ]
  );
  if (validInput !== "") throw new InvalidDataError(validInput);
  const id = value.id;
  const email = value.email;
  const template_html = value.template_html;
  return new AutomaticCoordinatorProcedure(id, email, template_html);
};

// lazyConvert means that in the case of the subentities, we only expect the id
export const convertAnyToCoordination = (
  value: any,
  lazyConvert: boolean
): Coordination => {
  const validInput = validateObjectKeys(
    value,
    [
      { name: "state", type: BasicType.string },
      { name: "limit_date", type: BasicType.string },
      { name: "coordinator", type: BasicType.Object },
      { name: "flightRequest", type: BasicType.Object },
    ],
    [
      { name: "id", type: BasicType.string },
      { name: "reference", type: BasicType.string },
      { name: "last_state_change_reason", type: BasicType.string },
    ]
  );
  if (validInput !== "") throw new InvalidDataError(validInput);

  const state = convertStringToCoordinationState(value.state);
  let limit_date = stringToDate(value.limit_date, "yyyy-MM-dd'T'HH:mm:ss.SSSZ");
  if (limit_date.toString() === "Invalid Date") {
    throw new InvalidDataError(
      `Invalid limit_date (limit_date=${value.limit_date})`
    );
  }
  let coordinator = new Coordinator();
  coordinator.id = value.coordinator.id;
  let flightRequest = new FlightRequest(
    "",
    [],
    [],
    false,
    new User(),
    new User(),
    FlightRequestState.CANCELLED,
    FlightCategory.OPEN
  );
  flightRequest.id = value.flightRequest.id;
  const id = value.id;
  const reference = value.reference;
  const last_state_change_reason = value.last_state_change_reason;
  if (!lazyConvert) {
    coordinator = convertAnyToCoordinator(value.coordinator);
    flightRequest = convertAnyToFlightRequest(value.flightRequest);
  }
  return new Coordination(
    state,
    limit_date,
    coordinator,
    flightRequest,
    id,
    reference,
    last_state_change_reason
  );
};

export const convertAnyToCoordinator = (value: any): Coordinator => {
  const validInput = validateObjectKeys(
    value,
    [],
    [
      { name: "id", type: BasicType.string },
      { name: "infrastructure", type: BasicType.string },
      { name: "liaison", type: BasicType.string },
      { name: "type", type: BasicType.string },
      { name: "coordinatorProcedure", type: BasicType.Object },
      { name: "telephone", type: BasicType.string },
      { name: "email", type: BasicType.string },
      { name: "minimun_coordination_days", type: BasicType.number },
      { name: "price", type: BasicType.number },
      { name: "discount_Multiple_Dates", type: BasicType.number },
      { name: "geographical_zone", type: BasicType.Object },
      { name: "manual_coordinator_procedure", type: BasicType.Object },
      { name: "automatic_coordinator_procedure", type: BasicType.Object },
    ]
  );
  if (validInput !== "") throw new InvalidDataError(validInput);

  const id = value.id;
  const infrastructure = value.infrastructure;
  const liaison =
    value.liaison === undefined || value.liaison === ""
      ? undefined
      : convertStringToLiaison(value.liaison);
  const type =
    value.type === undefined
      ? undefined
      : convertStringToCoordinatorType(value.type);
  const coordinatorProcedure =
    value.coordinatorProcedure === undefined
      ? undefined
      : convertAnyToCoordinatorProcedure(value.coordinatorProcedure);
  const telephone = value.telephone;
  const email = value.email;
  const minimun_coordination_days = value.minimun_coordination_days;
  const price = value.price;
  const discount_Multiple_Dates = value.discount_Multiple_Dates;
  const geographical_zone = value.geographical_zone;
  const manual_coordinator_procedure = value.manual_coordinator_procedure
    ? convertAnyToManualCoordinatorProcedure(value.manual_coordinator_procedure)
    : undefined;
  const automatic_coordinator_procedure = value.automatic_coordinator_procedure
    ? convertAnyToAutomaticCoordinatorProcedure(
        value.automatic_coordinator_procedure
      )
    : undefined;

  return new Coordinator(
    id,
    infrastructure,
    liaison,
    type,
    coordinatorProcedure,
    telephone,
    email,
    minimun_coordination_days,
    price,
    discount_Multiple_Dates,
    geographical_zone,
    manual_coordinator_procedure,
    automatic_coordinator_procedure
  );
};

export const convertAnyToCoordinatorProcedure = (
  value: any
): CoordinatorProcedure => {
  const validInput = validateObjectKeys(
    value,
    [],
    [{ name: "id", type: BasicType.string }]
  );
  if (validInput !== "") throw new InvalidDataError(validInput);
  const id = value.id;
  return new CoordinatorProcedure(id);
};

export const convertAnyToFlightRequest = (value: any): FlightRequest => {
  const validInput = validateObjectKeys(
    value,
    [
      { name: "name", type: BasicType.string },
      { name: "volumes", type: BasicType.Object },
      { name: "uavs", type: BasicType.Object },
      { name: "paid", type: BasicType.boolean },
      { name: "operator", type: BasicType.Object },
      { name: "creator", type: BasicType.Object },
      { name: "state", type: BasicType.string },
      { name: "flight_category", type: BasicType.string },
    ],
    [
      { name: "operation", type: BasicType.Object },
      { name: "coordination", type: BasicType.Object },
      { name: "flight_comments", type: BasicType.string },
      { name: "urban_flight", type: BasicType.boolean },
      { name: "parachute_model", type: BasicType.string },
      { name: "dji_blocked", type: BasicType.boolean },
      { name: "dji_controller_number", type: BasicType.string },
      { name: "dji_email", type: BasicType.string },
      { name: "id", type: BasicType.string },
      { name: "geographicalZones", type: BasicType.Object },
    ]
  );
  if (validInput !== "") throw new InvalidDataError(validInput);
  if (!Array.isArray(value.volumes))
    throw new InvalidDataError("invalid flight request volumes input");
  if (!Array.isArray(value.uavs))
    throw new InvalidDataError("invalid fr uavs input");

  const name = value.name;
  const volumes = (value.volumes as any[]).map((volume) =>
    convertAnyToOperationVolume(volume)
  );
  const uavs = value.uavs;
  const paid = value.paid;
  const operator = value.operator;
  const creator = value.creator;
  const state = convertStringToFlightRequestState(value.state);
  const flight_category = convertStringToFlightCategory(value.flight_category);
  let operation = undefined;
  if (value.operation !== undefined) {
    if (!Array.isArray(value.operation))
      throw new InvalidDataError("invalid flight request operation input");
    operation = [];
    for (let i = 0; i < value.operation.length; i++) {
      const op = value.operation[i];
      if (typeof op !== "string")
        throw new InvalidDataError("invalid flight request operation input");
      const recordOp: Record<string, any> = {};
      recordOp[op] = {};
      operation.push(recordOp);
    }
  }
  let coordination = undefined;
  if (value.coordination !== undefined) {
    if (!Array.isArray(value.coordination))
      throw new InvalidDataError(validInput);
    coordination = [];
    for (let i = 0; i < value.coordination.length; i++) {
      coordination.push(convertAnyToCoordination(value.coordination, true));
    }
  }
  const flight_comments = value.flight_comments;
  const urban_flight = value.urban_flight;
  const parachute_model = value.parachute_model;
  const dji_blocked = value.dji_blocked;
  const dji_controller_number = value.dji_controller_number;
  const dji_email = value.dji_email;
  const id = value.id;
  let geographicalZones = undefined;
  if (value.geographicalZones !== undefined) {
    if (!Array.isArray(value.geographicalZones))
      throw new InvalidDataError(validInput);
    geographicalZones = [];
    for (let i = 0; i < value.geographicalZones.length; i++) {
      const geographicalZone = value.geographicalZones[i];
      if (!(typeof geographicalZone === "object")) {
        throw new InvalidDataError(
          `All items in geographicalZones must be objects (index=${i})`
        );
      }
      geographicalZones.push(geographicalZone);
    }
  }
  return new FlightRequest(
    name,
    volumes,
    uavs,
    paid,
    operator,
    creator,
    state,
    flight_category,
    operation,
    coordination,
    flight_comments,
    urban_flight,
    parachute_model,
    dji_blocked,
    dji_controller_number,
    dji_email,
    id,
    geographicalZones
  );
};

export const convertAnyToFlightRequestPayment = (
  value: any
): FlightRequestPayment => {
  const validInput = validateObjectKeys(
    value,
    [{ name: "flightRequest", type: BasicType.Object }],
    [
      { name: "id", type: BasicType.string },
      { name: "sessionId", type: BasicType.string },
      { name: "user", type: BasicType.string },
      { name: "insurance", type: BasicType.Object },
      { name: "createDate", type: BasicType.string },
    ]
  );
  if (validInput !== "") throw new InvalidDataError(validInput);
  const flightRequest = convertAnyToFlightRequest(value.flightRequest);
  const id = value.id;
  const sessionId = value.sessionId;
  const user = value.user;
  let insurance: FlySafeInsuranceSimulation[] | undefined = undefined;
  if (value.insurance !== undefined) {
    if (!Array.isArray(value.insurance))
      throw new InvalidDataError("invalid payment insurance input");
    insurance = (value.insurance as any[]).map((i) =>
      convertAnyToFlySafeInsuranceSimulation(i)
    );
  }
  const createDate = value.createDate;
  return new FlightRequestPayment(
    flightRequest,
    id,
    sessionId,
    user,
    insurance,
    createDate
  );
};

export const convertAnyToFlySafeInsuranceSimulation = (
  value: any
): FlySafeInsuranceSimulation => {
  const validInput = validateObjectKeys(
    value,
    [],
    [
      { name: "id", type: BasicType.string },
      { name: "premium_total", type: BasicType.number },
      { name: "flysafe_simulation_response", type: BasicType.string },
      { name: "simulation_id", type: BasicType.number },
      { name: "vehicle", type: BasicType.string },
    ]
  );
  if (validInput !== "") throw new InvalidDataError(validInput);
  const id = value.id;
  const premium_total = value.premium_total;
  const flysafe_simulation_response = value.flysafe_simulation_response;
  const simulation_id = value.simulation_id;
  const vehicle = value.vehicle;
  return new FlySafeInsuranceSimulation(
    id,
    premium_total,
    flysafe_simulation_response,
    simulation_id,
    vehicle
  );
};

export const convertAnyToManualCoordinatorProcedure = (
  value: any
): ManualCoordinatorProcedure => {
  const validInput = validateObjectKeys(
    value,
    [],
    [
      { name: "id", type: BasicType.string },
      { name: "text_description", type: BasicType.string },
      { name: "procedure_url", type: BasicType.string },
      { name: "template_url", type: BasicType.string },
    ]
  );
  if (validInput !== "") throw new InvalidDataError(validInput);
  const id = value.id;
  const text_description = value.text_description;
  const procedure_url = value.procedure_url;
  const template_url = value.template_url;
  return new ManualCoordinatorProcedure(
    id,
    text_description,
    procedure_url,
    template_url
  );
};

export const convertAnyToOperationVolume = (value: any): OperationVolume => {
  const validInput = validateObjectKeys(
    value,
    [],
    [
      { name: "id", type: BasicType.string },
      { name: "ordinal", type: BasicType.number },
      { name: "effective_time_begin", type: BasicType.string },
      { name: "effective_time_end", type: BasicType.string },
      { name: "min_altitude", type: BasicType.number },
      { name: "max_altitude", type: BasicType.number },
      { name: "operation_geography", type: BasicType.Object },
      { name: "beyond_visual_line_of_sight", type: BasicType.boolean },
    ]
  );
  if (validInput !== "") throw new InvalidDataError(validInput);
  const id = value.id;
  const ordinal = value.ordinal;
  let effective_time_begin = undefined;
  if (value.effective_time_begin) {
    effective_time_begin = stringToDate(
      value.effective_time_begin,
      "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
    );
  }
  let effective_time_end = undefined;
  if (value.effective_time_end) {
    effective_time_end = stringToDate(
      value.effective_time_end,
      "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
    );
  }
  const min_altitude = value.min_altitude;
  const max_altitude = value.max_altitude;
  let operation_geography = undefined;
  if (value.operation_geography !== undefined) {
    operation_geography = convertAnyToPolygon(value.operation_geography);
  }
  const beyond_visual_line_of_sight = value.beyond_visual_line_of_sight;
  return new OperationVolume(
    id,
    ordinal,
    effective_time_begin,
    effective_time_end,
    min_altitude,
    max_altitude,
    operation_geography,
    beyond_visual_line_of_sight
  );
};

export const convertStringToCoordinationState = (
  value: string
): CoordinationState => {
  if (value === "TODO") return CoordinationState.TODO;
  else if (value === "REQUESTED") return CoordinationState.REQUESTED;
  else if (value === "APPROVED") return CoordinationState.APPROVED;
  else if (value === "IN_NEED_OF_MODIFICATION")
    return CoordinationState.IN_NEED_OF_MODIFICATION;
  else if (value === "REJECTED") return CoordinationState.REJECTED;
  // else if (value === "SELF_MANAGED") return CoordinationState.SELF_MANAGED;
  throw new InvalidDataError(
    "Invalid coordination state (valid values = TODO, REQUESTED, APPROVED, IN_NEED_OF_MODIFICATION, REJECTED and SELF_MANAGED)"
  );
};

export const convertStringToCoordinatorType = (
  value: string
): CoordinatorType => {
  if (value === "Aeropuerto") return CoordinatorType.Aeropuerto;
  else if (value === "Aerodromo") return CoordinatorType.Aerodromo;
  else if (value === "Helipuerto") return CoordinatorType.Helipuerto;
  else if (value === "ZRVF") return CoordinatorType.ZRVF;
  else if (value === "Urbano") return CoordinatorType.Urbano;
  else if (value === "LED") return CoordinatorType.LED;
  else if (value === "LEP") return CoordinatorType.LEP;
  else if (value === "LER") return CoordinatorType.LER;
  else if (value === "TRA") return CoordinatorType.TRA;
  else if (value === "Miteco") return CoordinatorType.Miteco;
  else if (value === "Aro") return CoordinatorType.Aro;
  else if (value === "Puerto") return CoordinatorType.Puerto;
  else if (value === "Parque Natural") return CoordinatorType.Parque_Natural;
  else if (value === "TSA") return CoordinatorType.TSA;
  else if (value === "TBD") return CoordinatorType.TBD;
  throw new InvalidDataError("invalid coordinator type input");
};

export const convertStringToLiaison = (value: string): Liaison => {
  if (value === "ENAIRE") return Liaison.ENAIRE;
  else if (value === "FERRONATS") return Liaison.FERRONATS;
  else if (value === "SAERCO") return Liaison.SAERCO;
  else if (value === "AENA") return Liaison.AENA;
  else if (value === "MINISTERIO DE DEFENSA")
    return Liaison.MINISTERIO_DE_DEFENSA;
  else if (value === "EJERCITO DEL AIRE") return Liaison.EJERCITO_DEL_AIRE;
  else if (value === "SEM CATALUÑA") return Liaison.SEM_CATALUÑA;
  else if (value === "INSTALACIONES AERONAUTICAS DGT")
    return Liaison.INSTALACIONES_AERONAUTICAS_DGT;
  else if (value === "AIRTECH LEVANTE") return Liaison.AIRTECH_LEVANTE;
  else if (value === "MITECO") return Liaison.MITECO;
  else if (value === "ZONA NATURAL") return Liaison.ZONA_NATURAL;
  else if (value === "ECAO") return Liaison.ECAO;
  else if (value === "CAM CASTILLA Y LEON") return Liaison.CAM_CASTILLA_Y_LEON;
  else if (value === "CPM CASTILLA Y LEON") return Liaison.CPM_CASTILLA_Y_LEON;
  else if (value === "CECAF") return Liaison.CECAF;
  else if (value === "OTRO") return Liaison.OTRO;
  else if (value === "TBD") return Liaison.TBD;
  throw new InvalidDataError("invalid Liaison");
};

export const convertStringToFlightRequestState = (
  value: string
): FlightRequestState => {
  if (value === "REQUIRE_APPROVAL") return FlightRequestState.REQUIRE_APPROVAL;
  else if (value === "PENDING") return FlightRequestState.PENDING;
  else if (value === "COMPLETED") return FlightRequestState.COMPLETED;
  else if (value === "CANCELLED") return FlightRequestState.CANCELLED;
  else if (value === "REJECTED") return FlightRequestState.REJECTED;
  else if (value === "PREFLIGHT") return FlightRequestState.PREFLIGHT;
  throw new InvalidDataError(
    "Invalid 'Flight Request State' (REQUIRE_APPROVAL, PENDING, COMPLETED, CANCELLED, REJECTED, PREFLIGHT)"
  );
};

export const convertStringToFlightCategory = (
  value: string
): FlightCategory => {
  if (value === "OPEN") return FlightCategory.OPEN;
  else if (value === "STS_01") return FlightCategory.STS_01;
  else if (value === "STS_02") return FlightCategory.STS_02;
  else if (value === "A2") return FlightCategory.A2;
  else if (value === "A3") return FlightCategory.A3;
  throw new InvalidDataError(
    "Invalid 'Flight Category' (OPEN, STS_01, STS_02, A2, A3)"
  );
};

export const convertAnyToPolygon = (value: any): Polygon => {
  const validInput = validateObjectKeys(
    value,
    [
      { name: "type", type: BasicType.string },
      { name: "coordinates", type: BasicType.Object },
    ],
    []
  );
  if (validInput !== "")
    throw new InvalidDataError(`invalid Polygon input (${validInput})`);
  if (value.type !== "Polygon")
    throw new InvalidDataError("invalid polygon input");
  if (!Array.isArray(value.coordinates))
    throw new InvalidDataError("invalid Polygon input");
  const coordinates: Position[][] = [];
  for (let i = 0; i < value.coordinates.length; i++) {
    const coordinatesI: Position[] = [];
    if (!Array.isArray(value.coordinates[i]))
      throw new InvalidDataError("invalid Polygon input");
    for (let j = 0; j < value.coordinates[i].length; j++) {
      coordinatesI.push(convertAnyToPosition(value.coordinates[i][j]));
    }
    coordinates.push(coordinatesI);
  }
  return {
    type: "Polygon",
    coordinates,
  };
};

export const convertAnyToPosition = (value: any): Position => {
  if (!Array.isArray(value))
    throw new InvalidDataError("invalid Position input");
  if (value.length < 2 || value.length > 3)
    throw new InvalidDataError("invalid Position input");
  const result: number[] = [];
  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] !== "number")
      throw new InvalidDataError("invalid Position input");
    result.push(value[i]);
  }
  return result;
};

export const getPaginationParametersFromRequestQuery = (
  requestQuery: any
): FilterAndPaginatorProps => {
  const { take, skip, filterBy, filter, orderBy, order, polygon } =
    requestQuery;
  let takeNumber = undefined;
  let geojsonPolygon: Polygon | undefined = undefined;
  if (polygon) {
    const polygonArray = JSON.parse(polygon);
    if (polygonArray.constructor.name !== "Array") {
      throw new InvalidDataError("The polygon must be an array");
    }
    if (polygonArray.length < 4) {
      throw new InvalidDataError("The polygon must have at least 4 points");
    }
    if (
      polygonArray[0][0] !== polygonArray[polygonArray.length - 1][0] ||
      polygonArray[0][1] !== polygonArray[polygonArray.length - 1][1]
    ) {
      throw new InvalidDataError(
        "The first and the last point must be the same"
      );
    }
    geojsonPolygon = {
      type: "Polygon",
      coordinates: [polygonArray],
    };
  }
  if (take) {
    takeNumber = Number(take);
  }
  if (Number.isNaN(takeNumber))
    throw new InvalidDataError(
      `The "take" parameter has to be a number (take=${take})`
    );
  let skipNumber = undefined;
  if (skip) {
    skipNumber = Number(skip);
  }
  if (Number.isNaN(skipNumber))
    throw new InvalidDataError(
      `The "skip" parameter has to be a number (skip=${skip})`
    );
  return {
    take: takeNumber,
    skip: skipNumber,
    filterBy,
    filter,
    orderBy,
    order,
    polygon: geojsonPolygon,
  };
};

export const convertAnyToGeographicalZone = (value: any): GeographicalZone => {
  const validInput = validateObjectKeys(
    value,
    [
      { name: "geography", type: BasicType.Object },
      { name: "layer_id", type: BasicType.string },
      { name: "object_id", type: BasicType.string },
    ],
    [
      { name: "id", type: BasicType.string },
      { name: "coordinator", type: BasicType.Object },
      { name: "name", type: BasicType.string },
      { name: "gfid", type: BasicType.string },
      { name: "last_update", type: BasicType.string },
    ]
  );
  if (validInput !== "") throw new Error(validInput);
  return new GeographicalZone(
    value.id,
    value.name,
    value.geography,
    value.layer_id,
    value.object_id,
    value.gfid,
    value.last_update,
    value.coordinator
  );
};
