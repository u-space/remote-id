import { Polygon } from "geojson";

export enum Role {
  ADMIN = "ADMIN",
  PILOT = "PILOT",
  MONITOR = "MONITOR",
}

export enum Language {
  ES = "ES",
  EN = "EN",
}

export class Settings {
  language?: Language;
  constructor(language: Language) {
    this.language = language;
  }
}

export class User {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  verification_token?: string;
  verified?: boolean;
  role?: Role;
  VolumesOfInterest?: Polygon;
  settings?: Settings;
  extra_fields?: Record<string, any>;

  constructor(
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    verification_token?: string,
    verified?: boolean,
    role?: Role,
    VolumesOfInterest?: Polygon,
    settings?: Settings,
    extra_fields?: Record<string, any>
  ) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.verification_token = verification_token;
    this.verified = verified;
    this.role = role;
    this.VolumesOfInterest = VolumesOfInterest;
    this.settings = settings;
    this.extra_fields = extra_fields;
  }
}
