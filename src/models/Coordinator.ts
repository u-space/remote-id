import AutomaticCoordinatorProcedure from "./AutomaticCoordinatorProcedure";
import { CoordinatorProcedure } from "./CoordinatorProcedure";
import { GeographicalZone } from "./GeographicalZone";
import ManualCoordinatorProcedure from "./ManualCoordinatorProcedure";

export enum CoordinatorType {
  Aeropuerto = "Aeropuerto",
  Aerodromo = "Aerodromo",
  Helipuerto = "Helipuerto",
  ZRVF = "ZRVF",
  Urbano = "Urbano",
  LED = "LED",
  LEP = "LEP",
  LER = "LER",
  TRA = "TRA",
  Miteco = "Miteco",
  Aro = "Aro",
  Puerto = "Puerto",
  Parque_Natural = "Parque Natural",
  TSA = "TSA",
  TBD = "TBD",
}

export enum Liaison {
  ENAIRE = "ENAIRE",
  FERRONATS = "FERRONATS",
  SAERCO = "SAERCO",
  AENA = "AENA",
  MINISTERIO_DE_DEFENSA = "MINISTERIO DE DEFENSA",
  EJERCITO_DEL_AIRE = "EJERCITO DEL AIRE",
  SEM_CATALUÑA = "SEM CATALUÑA",
  INSTALACIONES_AERONAUTICAS_DGT = "INSTALACIONES AERONAUTICAS DGT",
  AIRTECH_LEVANTE = "AIRTECH LEVANTE",
  MITECO = "MITECO",
  ZONA_NATURAL = "ZONA NATURAL",
  ECAO = "ECAO",
  CAM_CASTILLA_Y_LEON = "CAM CASTILLA Y LEON",
  CPM_CASTILLA_Y_LEON = "CPM CASTILLA Y LEON",
  CECAF = "CECAF",
  OTRO = "OTRO",
  TBD = "TBD",
}

export class Coordinator {
  id?: string;
  infrastructure?: string;
  liaison?: Liaison;
  type?: CoordinatorType;
  coordinatorProcedure?: CoordinatorProcedure;
  telephone?: string;
  email?: string;
  minimun_coordination_days?: number;
  price?: number;
  discount_Multiple_Dates?: number;
  geographical_zone?: GeographicalZone;
  manual_coordinator_procedure?: ManualCoordinatorProcedure;
  automatic_coordinator_procedure?: AutomaticCoordinatorProcedure;

  constructor(
    id?: string,
    infrastructure?: string,
    liaison?: Liaison,
    type?: CoordinatorType,
    coordinatorProcedure?: CoordinatorProcedure,
    telephone?: string,
    email?: string,
    minimun_coordination_days?: number,
    price?: number,
    discount_Multiple_Dates?: number,
    geographical_zone?: GeographicalZone,
    manual_coordinator_procedure?: ManualCoordinatorProcedure,
    automatic_coordinator_procedure?: AutomaticCoordinatorProcedure
  ) {
    this.id = id;
    this.infrastructure = infrastructure;
    this.liaison = liaison;
    this.type = type;
    this.coordinatorProcedure = coordinatorProcedure;
    this.telephone = telephone;
    this.email = email;
    this.minimun_coordination_days = minimun_coordination_days;
    this.price = price;
    this.discount_Multiple_Dates = discount_Multiple_Dates;
    this.geographical_zone = geographical_zone;
    this.manual_coordinator_procedure = manual_coordinator_procedure;
    this.automatic_coordinator_procedure = automatic_coordinator_procedure;
  }
}
