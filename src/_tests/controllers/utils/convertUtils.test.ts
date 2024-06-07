import {
  convertAnyToAutomaticCoordinatorProcedure,
  convertAnyToCoordination,
  convertAnyToCoordinator,
  convertAnyToFlightRequest,
  convertAnyToFlightRequestPayment,
  convertAnyToFlySafeInsuranceSimulation,
  convertAnyToManualCoordinatorProcedure,
  convertAnyToOperationVolume,
  convertAnyToPolygon,
  convertAnyToPosition,
  convertStringToCoordinationState,
  convertStringToCoordinatorType,
  convertStringToFlightCategory,
  convertStringToFlightRequestState,
  convertStringToLiaison,
} from "../../../controllers/utils/convertUtils";
import AutomaticCoordinatorProcedure from "../../../models/AutomaticCoordinatorProcedure";
import { Coordination, CoordinationState } from "../../../models/Coordination";
import {
  Coordinator,
  CoordinatorType,
  Liaison,
} from "../../../models/Coordinator";
import { CoordinatorProcedure } from "../../../models/CoordinatorProcedure";
import {
  FlightCategory,
  FlightRequest,
  FlightRequestState,
} from "../../../models/FlightRequest";
import { FlightRequestPayment } from "../../../models/FlightRequestPayment";
import { FlySafeInsuranceSimulation } from "../../../models/FlySafeInsuranceSimulation";
import ManualCoordinatorProcedure from "../../../models/ManualCoordinatorProcedure";
import OperationVolume from "../../../models/OperationVolume";
import { stringToDate } from "../../../utils/parseUtils";

describe("convertAnyToAutomaticCoordinatorProcedure", () => {
  // test 1
  test("convertion succeded", () => {
    expect(
      convertAnyToAutomaticCoordinatorProcedure({
        id: "1111",
        email: "example@email.com",
        template_html: "<div></div>",
      })
    ).toEqual(
      new AutomaticCoordinatorProcedure(
        "1111",
        "example@email.com",
        "<div></div>"
      )
    );
  });
});

describe("convertAnyToCoordination", () => {
  // test 1
  test("convertion succeded", () => {
    const strLimitDate = "2022-12-04T10:00:00.000Z";
    const limitDate = stringToDate(strLimitDate, "yyyy-MM-dd'T'HH:mm:ss.SSSZ");
    const coordinator = new Coordinator(
      "coord-aaaa-bbbb",
      "an infrastructure",
      Liaison.CECAF,
      CoordinatorType.Parque_Natural,
      new CoordinatorProcedure("coord-proc-1111"),
      "099 000 111",
      "coordinator@email.com",
      5,
      250,
      10,
      "geo-1111-2222",
      new ManualCoordinatorProcedure(
        "manual-proc-3333",
        "some description",
        "https://pro.url.com",
        "https://temp.url.com"
      ),
      new AutomaticCoordinatorProcedure(
        "aut-proc-3333",
        "aut@email.com",
        "<h1>aut. procedure</h1>"
      )
    );
    const flightRequest = new FlightRequest(
      "",
      [
        new OperationVolume(
          "opvol-7777",
          0,
          stringToDate(
            "2022-12-04T08:00:00.000Z",
            "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
          ),
          stringToDate(
            "2022-12-04T11:00:00.000Z",
            "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
          ),
          0,
          120,
          {
            type: "Polygon",
            coordinates: [
              [
                [1, 2],
                [3, 4],
                [5, 6],
              ],
            ],
          },
          false
        ),
      ],
      [{ uvin: "111222333" }],
      false,
      { username: "aaaabbbbcccc" },
      { username: "aaaabbbbcccc" },
      FlightRequestState.REQUIRE_APPROVAL,
      FlightCategory.OPEN,
      [{ gufi: "1234-abcd" }],
      [],
      "some comments",
      false,
      "some model",
      false,
      "1234",
      "dji@email.com",
      "aaaa-bbbb-cccc-dddd",
      [{ "gggg-1234": {} }]
    );
    expect(
      convertAnyToCoordination({
        state: "APPROVED",
        limit_date: strLimitDate,
        coordinator: {
          id: "coord-aaaa-bbbb",
          infrastructure: "an infrastructure",
          liaison: "CECAF",
          type: "Parque_Natural",
          coordinatorProcedure: {
            id: "coord-proc-1111",
          },
          telephone: "099 000 111",
          email: "coordinator@email.com",
          minimun_coordination_days: 5,
          price: 250,
          discount_Multiple_Dates: 10,
          geographical_zone: "geo-1111-2222",
          manual_coordinator_procedure: {
            id: "manual-proc-3333",
            text_description: "some description",
            procedure_url: "https://pro.url.com",
            template_url: "https://temp.url.com",
          },
          automatic_coordinator_procedure: {
            id: "aut-proc-3333",
            email: "aut@email.com",
            template_html: "<h1>aut. procedure</h1>",
          },
        },
        flightRequest: {
          volumes: [
            {
              id: "opvol-7777",
              ordinal: 0,
              effective_time_begin: "2022-12-04T08:00:00.000Z",
              effective_time_end: "2022-12-04T11:00:00.000Z",
              min_altitude: 0,
              max_altitude: 120,
              operation_geography: {
                type: "Polygon",
                coordinates: [
                  [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                  ],
                ],
              },
              beyond_visual_line_of_sight: false,
            },
          ],
          uavs: ["111222333"],
          paid: false,
          operator: "aaaabbbbcccc",
          state: "REQUIRE_APPROVAL",
          flight_category: "OPEN",
          operation: ["1234-abcd"],
          coordination: [],
          flight_comments: "some comments",
          urban_flight: false,
          parachute_model: "some model",
          dji_blocked: false,
          dji_controller_number: "1234",
          dji_email: "dji@email.com",
          id: "aaaa-bbbb-cccc-dddd",
          geographicalZones: ["gggg-1234"],
        },
        id: "coordination-1111-2222",
        reference: "some reference",
        last_state_change_reason: "some reason",
      })
    ).toEqual(
      new Coordination(
        CoordinationState.APPROVED,
        limitDate,
        coordinator,
        flightRequest,
        "coordination-1111-2222",
        "some reference",
        "some reason"
      )
    );
  });
});

describe("convertAnyToCoordinator", () => {
  // test 1
  test("convertion succeded", () => {
    const coordinatorProcedure = new CoordinatorProcedure("aaaa-bbbb");
    const manual_coordinator_procedure = new ManualCoordinatorProcedure(
      "8888888",
      "a text description",
      "https://procedure.url.com",
      "https://template.url.com"
    );
    const automatic_coordinator_procedure = new AutomaticCoordinatorProcedure(
      "4567",
      "aut.coord.pro@email.com",
      "<h1>Automatic Coordinator Procedure</h1>"
    );
    expect(
      convertAnyToCoordinator({
        id: "11223344",
        infrastructure: "infrastructure example",
        liaison: "AENA",
        type: "Aerodromo",
        coordinatorProcedure: {
          id: "aaaa-bbbb",
        },
        telephone: "099 000 111",
        email: "coordinator@email.com",
        minimun_coordination_days: 10,
        price: 100,
        discount_Multiple_Dates: 5,
        geographical_zone: "aaaa-cccc-1111-3333",
        manual_coordinator_procedure: {
          id: "8888888",
          text_description: "a text description",
          procedure_url: "https://procedure.url.com",
          template_url: "https://template.url.com",
        },
        automatic_coordinator_procedure: {
          id: "4567",
          email: "aut.coord.pro@email.com",
          template_html: "<h1>Automatic Coordinator Procedure</h1>",
        },
      })
    ).toEqual(
      new Coordinator(
        "11223344",
        "infrastructure example",
        Liaison.AENA,
        CoordinatorType.Aerodromo,
        coordinatorProcedure,
        "099 000 111",
        "coordinator@email.com",
        10,
        100,
        5,
        "aaaa-cccc-1111-3333",
        manual_coordinator_procedure,
        automatic_coordinator_procedure
      )
    );
  });
});

describe("convertAnyToCoordinatorProcedure", () => {
  // test 1
  test("convertion succeded", () => {
    expect({ id: "11223344" }).toEqual(new CoordinatorProcedure("11223344"));
  });
});

describe("convertAnyToFlightRequest", () => {
  // test 1
  test("convertion succeded", () => {
    const operationVolume = new OperationVolume(
      "1234",
      0,
      stringToDate("2022-12-01T06:00:00.000Z", "yyyy-MM-dd'T'HH:mm:ss.SSSZ"),
      stringToDate("2022-12-01T10:00:00.000Z", "yyyy-MM-dd'T'HH:mm:ss.SSSZ"),
      0,
      120,
      {
        type: "Polygon",
        coordinates: [
          [
            [-56, -34],
            [-56, -33],
            [-55, -34],
          ],
        ],
      },
      false
    );
    expect(
      convertAnyToFlightRequest({
        volumes: [
          {
            id: "1234",
            ordinal: 0,
            effective_time_begin: "2022-12-01T06:00:00.000Z",
            effective_time_end: "2022-12-01T10:00:00.000Z",
            min_altitude: 0,
            max_altitude: 120,
            operation_geography: {
              type: "Polygon",
              coordinates: [
                [
                  [-56, -34],
                  [-56, -33],
                  [-55, -34],
                ],
              ],
            },
            beyond_visual_line_of_sight: false,
          },
        ],
        uavs: ["111222333"],
        paid: false,
        operator: "aaaabbbbcccc",
        state: "REQUIRE_APPROVAL",
        flight_category: "OPEN",
        operation: ["1234-abcd"],
        coordination: [],
        flight_comments: "some comments",
        urban_flight: false,
        parachute_model: "some model",
        dji_blocked: false,
        dji_controller_number: "1234",
        dji_email: "dji@email.com",
        id: "aaaa-bbbb-cccc-dddd",
        geographicalZones: [
          /*{ id: "gggg-1234" }*/
        ],
      })
    ).toEqual(
      new FlightRequest(
        "",
        [operationVolume],
        [{ "111222333": {} }],
        false,
        { aaaabbbbcccc: {} },
        FlightRequestState.REQUIRE_APPROVAL,
        FlightCategory.OPEN,
        [{ "1234-abcd": {} }],
        [],
        "some comments",
        false,
        "some model",
        false,
        "1234",
        "dji@email.com",
        "aaaa-bbbb-cccc-dddd",
        [
          /*{ "gggg-1234": {} }*/
        ]
      )
    );
  });
});

describe("convertAnyToFlightRequestPayment", () => {
  // test 1
  test("convertion succeded", () => {
    const flightRequest = new FlightRequest(
      "",
      [
        new OperationVolume(
          "opvol-7777",
          0,
          stringToDate(
            "2022-12-04T08:00:00.000Z",
            "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
          ),
          stringToDate(
            "2022-12-04T11:00:00.000Z",
            "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
          ),
          0,
          120,
          {
            type: "Polygon",
            coordinates: [
              [
                [1, 2],
                [3, 4],
                [5, 6],
              ],
            ],
          },
          false
        ),
      ],
      [{ uvin: "111222333" }],
      false,
      { username: "aaaabbbbcccc" },
      { username: "aaaabbbbcccc" },
      FlightRequestState.REQUIRE_APPROVAL,
      FlightCategory.OPEN,
      [{ "1234-abcd": {} }],
      [],
      "some comments",
      false,
      "some model",
      false,
      "1234",
      "dji@email.com",
      "aaaa-bbbb-cccc-dddd",
      [{ "gggg-1234": {} }]
    );
    expect(
      convertAnyToFlightRequestPayment({
        flightRequest: {
          volumes: [
            {
              id: "opvol-7777",
              ordinal: 0,
              effective_time_begin: "2022-12-04T08:00:00.000Z",
              effective_time_end: "2022-12-04T11:00:00.000Z",
              min_altitude: 0,
              max_altitude: 120,
              operation_geography: {
                type: "Polygon",
                coordinates: [
                  [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                  ],
                ],
              },
              beyond_visual_line_of_sight: false,
            },
          ],
          uavs: ["111222333"],
          paid: false,
          operator: "aaaabbbbcccc",
          state: "REQUIRE_APPROVAL",
          flight_category: "OPEN",
          operation: ["1234-abcd"],
          coordination: [],
          flight_comments: "some comments",
          urban_flight: false,
          parachute_model: "some model",
          dji_blocked: false,
          dji_controller_number: "1234",
          dji_email: "dji@email.com",
          id: "aaaa-bbbb-cccc-dddd",
          geographicalZones: ["gggg-1234"],
        },
        id: "152637",
        sessionId: "aaaa-pppp-ssss",
        user: "admin",
        insurance: [
          {
            id: "111111",
            premium_total: 200,
            flysafe_simulation_response: "{}",
            simulation_id: 555555,
            vehicle: "some vehicle",
          },
        ],
        createDate: "2022-12-05",
      })
    ).toEqual(
      new FlightRequestPayment(
        flightRequest,
        "152637",
        "aaaa-pppp-ssss",
        "admin",
        [
          new FlySafeInsuranceSimulation(
            "111111",
            200,
            "{}",
            555555,
            "some vehicle"
          ),
        ],
        "2022-12-05"
      )
    );
  });
});

describe("convertAnyToFlySafeInsuranceSimulation", () => {
  // test 1
  test("convertion succeded", () => {
    expect(
      convertAnyToFlySafeInsuranceSimulation({
        id: "116699",
        premium_total: 100,
        flysafe_simulation_response: "{response: 200}",
        simulation_id: 1,
        vehicle: "some vehicle",
      })
    ).toEqual(
      new FlySafeInsuranceSimulation(
        "116699",
        100,
        "{response: 200}",
        1,
        "some vehicle"
      )
    );
  });
});

describe("convertAnyToManualCoordinatorProcedure", () => {
  // test 1
  test("convertion succeded", () => {
    expect(
      convertAnyToManualCoordinatorProcedure({
        id: "aaaa-cccc",
        text_description: "some description",
        procedure_url: "https://procedure.url.com",
        template_url: "https://template.url.com",
      })
    ).toEqual(
      new ManualCoordinatorProcedure(
        "aaaa-cccc",
        "some description",
        "https://procedure.url.com",
        "https://template.url.com"
      )
    );
  });
});

describe("convertAnyToOperationVolume", () => {
  // test 1
  test("convertion succeded", () => {
    expect(
      convertAnyToOperationVolume({
        id: "1234",
        ordinal: 0,
        effective_time_begin: "2022-12-01T06:00:00.000Z",
        effective_time_end: "2022-12-01T10:00:00.000Z",
        min_altitude: 0,
        max_altitude: 120,
        operation_geography: {
          type: "Polygon",
          coordinates: [
            [
              [-56, -34],
              [-56, -33],
              [-55, -34],
            ],
          ],
        },
        beyond_visual_line_of_sight: false,
      })
    ).toEqual(
      new OperationVolume(
        "1234",
        0,
        new Date("2022-12-01T06:00:00.000Z"),
        new Date("2022-12-01T10:00:00.000Z"),
        0,
        120,
        {
          type: "Polygon",
          coordinates: [
            [
              [-56, -34],
              [-56, -33],
              [-55, -34],
            ],
          ],
        },
        false
      )
    );
  });
});

describe("convertAnyToPolygon", () => {
  test("any can not be 'undefined'", () => {
    expect(() => convertAnyToPolygon(undefined)).toThrowError();
  });

  test("type must be 'Polygon'", () => {
    expect(() =>
      convertAnyToPolygon({
        type: "Point",
        coordinates: [[[1, 2]]],
      })
    ).toThrowError();
  });

  test("convertion succeded", () => {
    expect(
      convertAnyToPolygon({
        type: "Polygon",
        coordinates: [[]],
      })
    ).toEqual({
      type: "Polygon",
      coordinates: [[]],
    });

    expect(
      convertAnyToPolygon({
        type: "Polygon",
        coordinates: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
      })
    ).toEqual({
      type: "Polygon",
      coordinates: [
        [
          [1, 2],
          [3, 4],
        ],
      ],
    });
  });
});

describe("convertAnyToPosition", () => {
  test("position must be an array", () => {
    expect(() =>
      convertAnyToPosition({ latitude: 1, longitude: 2 })
    ).toThrowError();
    expect(() => convertAnyToPosition(undefined)).toThrowError();
  });

  test("position must be an array of number", () => {
    expect(() => convertAnyToPosition(["1", "2"])).toThrowError();
  });

  test("position must be an array of 2 or 3 numbers", () => {
    expect(() => convertAnyToPosition([])).toThrowError();
    expect(() => convertAnyToPosition([1])).toThrowError();
    expect(() => convertAnyToPosition([1, 2, 3, 4])).toThrowError();
  });

  test("convertion succeded", () => {
    expect(convertAnyToPosition([1, 2])).toEqual([1, 2]);
    expect(convertAnyToPosition([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe("convertStringToLiaison", () => {
  test("we test all the posibilities", () => {
    const keys = Object.keys(Liaison);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      expect(convertStringToLiaison(key)).toEqual(
        Liaison[key as keyof typeof Liaison]
      );
    }
  });
});

describe("convertStringToCoordinationState", () => {
  test("we test all the posibilities", () => {
    const keys = Object.keys(CoordinationState);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      expect(convertStringToCoordinationState(key)).toEqual(
        CoordinationState[key as keyof typeof CoordinationState]
      );
    }
  });
});

describe("convertStringToCoordinatorType", () => {
  test("we test all the posibilities", () => {
    const keys = Object.keys(CoordinatorType);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      expect(convertStringToCoordinatorType(key)).toEqual(
        CoordinatorType[key as keyof typeof CoordinatorType]
      );
    }
  });
});

describe("convertStringToFlightRequestState", () => {
  test("we test all the posibilities", () => {
    const keys = Object.keys(FlightRequestState);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      expect(convertStringToFlightRequestState(key)).toEqual(
        FlightRequestState[key as keyof typeof FlightRequestState]
      );
    }
  });
});

describe("convertStringToFlightCategory", () => {
  test("we test all the posibilities", () => {
    const keys = Object.keys(FlightCategory);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      expect(convertStringToFlightCategory(key)).toEqual(
        FlightCategory[key as keyof typeof FlightCategory]
      );
    }
  });
});
