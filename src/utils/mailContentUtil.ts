// Licensed under the Business Software License©, Version 1.1 (the "License");
// you may not use this file except in compliance with the License.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.

import { FlightRequest } from "../models/FlightRequest";
import Configuration from "../utils/Configuration";
const mjml = require("mjml");

export function mjml2htmlCompleto(str: string, opt: any) {
  const optionsPreset = { ...opt };
  return mjml(str, optionsPreset);
}

/////////// LINK FUNCTIONS todo:llevar a un archivo aparte de links

export const getFlightRequestLink = (flightRequest: FlightRequest) => {
  return `${Configuration.FRONT_END_URL}/flightrequests/${flightRequest.id}`;
};

export const LOGO_LINK = `${Configuration.FRONT_END_URL}${Configuration.FRONT_END_ASSETS}platform.png`;
export const ORGANIZATION_LOGO_LINK = `${Configuration.FRONT_END_URL}${Configuration.FRONT_END_ASSETS}organization.png`;
////// GENERIC UTILS to use on all emails

/**
 *
 * @returns Return open email structure for mjml. Keep opened tags <mjml><mj-body>
 */

function initMailAndPutHeader() {
  return `<mjml>
  <mj-head>
    <mj-font name="Raleway" href="https://fonts.googleapis.com/css?family=Maven%20Pro" />
  </mj-head>
  <mj-body background-color="#ffffff">

    <!-- Header -->
    <mj-section background-color="#2d2c59">
      <mj-column>
        <mj-text font-style="bold" font-weight="900" width="360px" font-size="20px" color="#ffffff" align="center">
          <img style="max-height:100px" src="${LOGO_LINK}" alt="Net2Fly" />
        </mj-text>
        <mj-text font-style="bold" font-weight="900" width="360px" font-size="20px" color="#ffffff" align="center">
            Gestión de Operaciones con Drones
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#edecfc">
    <mj-column background-color="#ffffff" width="90%">
`;
}

/**
 *
 * @returns Return open email structure for mjml. Keep opened tags <mjml><mj-body>
 */

function endMailAndPutFooter() {
  return `
  ${paragraph("Si tienes cualquier consulta, escríbenos a soporte@net2fly.es")}
  ${paragraph("Un saludo,", "10px 10px 0px 10px")}
  ${paragraph("Equipo de Net2Fly.", "0px 10px 10px 10px")}
    </mj-column>
  </mj-section>
  <!-- Footer -->
  <mj-section background-color="#2d2c59">
    <mj-column>
      <mj-text  font-size="14px" color="#ffffff" align="right" padding-right="20px">
        <a href="https://cielum.eu"><img style="max-width:100px" src="${ORGANIZATION_LOGO_LINK}" alt="Organization" /> </a>
      </mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
`;
}

function title(text: string) {
  return `
  <mj-text font-style="bold" font-size="20px" color="#141414" align="center" padding="10px">
${text}
</mj-text>`;

  // return `
  // <mj-text font-family="\"Maven Pro\", Helvetica, Arial, Lucida, sans-serif" font-style="bold" font-size="24px" color="#141414" align="center" padding="10px">
  // ${text}
  // </mj-text>`
}

function paragraph(
  text: string,
  padding = "10px",
  fontSize = "18px",
  italic = false,
  color = "#141414"
) {
  // return `<mj-text font-family="\"Maven Pro\", Helvetica, Arial, Lucida, sans-serif"  font-size="18px" color="#141414" align="left" padding="10px">
  // ${text}
  // </mj-text>`
  return `<mj-text
	${italic ? 'font-style= "italic"' : ""}
	font-size=${'"' + `${fontSize}` + '"'} color=${color} align="left" padding=${
    '"' + `${padding}` + '"'
  }>
  ${text}
  </mj-text>`;
}

// /**
//  * Generate an email from a mjml body specification. Put the body on a mjml column and put header and footer
//  * @param body
//  * @returns
//  */
function generateBaseMail(body: string) {
  const initMail = initMailAndPutHeader();
  const endMail = endMailAndPutFooter();
  let email;
  try {
    email = mjml2htmlCompleto(`${initMail}${body}${endMail}`, {
      validationLevel: "soft",
    });
    email = email.html;
    // console.log(`*******************************************`)
    // console.log(email)
    // console.log(`*******************************************`)
  } catch (error) {
    email = `<b>${error}</b>`;
  }
  return email;
}

// //// ENTITY EMAILS

export function buildFlightRequestMail(flightRequest: FlightRequest) {
  const labelsAndFields = [];
  labelsAndFields.push(["Id de la solicitud", flightRequest.id]);
  labelsAndFields.push([
    "Fechas de ejecución",
    flightRequest.volumes
      .map((vol: any) => new Date(vol.effective_time_begin).toLocaleString())
      .join(" // "),
  ]);
  labelsAndFields.push([
    "Coordenadas",
    flightRequest.volumes[0]
      .operation_geography!.coordinates.map((coordinate: any) =>
        getDMS(coordinate)
      )
      .join(", "),
  ]);
  const mjmlBody = `
  ${title("Solicitud de coordinacion creada")}
  ${paragraph(
    "Se ha creado la solicitud de coordinacion con los siguientes datos:"
  )}
  <mj-table border="solid 1px" padding="10px" mj-class="celdita">
  ${labelsAndFields
    .map(([label, field]) => {
      return `<tr>
      <td style="padding: 0 0px 0 5px;border:solid 1px;width:40%">${label}</td>
      <td style="padding: 0 0px 0 5px;border:solid 1px">${
        field == "null" ? "" : field
      }</td>
    </tr>`;
    })
    .join("")}
  </mj-table>

  ${paragraph("La solicitud incluye los siguientes UAVs:")}
  ${flightRequest.uavs
    .map((uav) => {
      return `
    <mj-table border="solid 1px" padding="10px" mj-class="celdita">
      <tr>
        <td style="padding: 0 0px 0 5px;border:solid 1px;width:40%">UVIN</td>
        <td style="padding: 0 0px 0 5px;border:solid 1px">${
          uav.uvin == "null" ? "" : uav.uvin
        }</td>
      </tr>
      <tr>
        <td style="padding: 0 0px 0 5px;border:solid 1px;width:40%">Nombre</td>
        <td style="padding: 0 0px 0 5px;border:solid 1px">${
          uav.vehicleName == "null" ? "" : uav.vehicleName
        }</td>
      </tr>
      <tr>
        <td style="padding: 0 0px 0 5px;border:solid 1px;width:40%">Fabricante</td>
        <td style="padding: 0 0px 0 5px;border:solid 1px">${
          uav.manufacturer == "null" ? "" : uav.manufacturer
        }</td>
      </tr>
      <tr>
        <td style="padding: 0 0px 0 5px;border:solid 1px;width:40%">Modelo</td>
        <td style="padding: 0 0px 0 5px;border:solid 1px">${
          uav.model == "null" ? "" : uav.model
        }</td>
      </tr>
    </mj-table>

    `;
    })
    .join("")}

  ${paragraph("La siguientes son las fechas para cada vuelo:")}

  ${flightRequest.volumes
    .map((flightRequest: any) => {
      return `
    <mj-table border="solid 1px" padding="10px" mj-class="celdita">
      <tr>
        <td style="padding: 0 0px 0 5px;border:solid 1px;width:40%">Inicio</td>
        <td style="padding: 0 0px 0 5px;border:solid 1px">${
          flightRequest.effective_time_begin == "null"
            ? ""
            : new Date(flightRequest.effective_time_begin).toLocaleString()
        }</td>
      </tr>
      <tr>
        <td style="padding: 0 0px 0 5px;border:solid 1px;width:40%">Fin</td>
        <td style="padding: 0 0px 0 5px;border:solid 1px">${
          flightRequest.effective_time_end == "null"
            ? ""
            : new Date(flightRequest.effective_time_end).toLocaleString()
        }</td>
      </tr>
    </mj-table>
    `;
    })
    .join("")}

  ${paragraph(
    `Para ver mas información ingrese a ${getFlightRequestLink(flightRequest)}`,
    "10px",
    "14px"
  )}

    `;
  const email = generateBaseMail(mjmlBody);
  return email;
}

// This function takes a list of lat,long coordinates and return a list of DMS coordinates
export function getDMS(coordinates: any) {
  return coordinates.map((coord: any) => {
    const lat = coord[1];
    const long = coord[0];
    const latDMS = getDMSFromDecimal(lat);
    const longDMS = getDMSFromDecimal(long);
    return `${latDMS} ${longDMS}`;
  });
}

export function getDMSFromDecimal(decimal: any) {
  const unsignedDecimal = Math.abs(decimal);
  const fractionalDegrees = unsignedDecimal;
  const degrees = Math.trunc(fractionalDegrees);
  const fractionalMinutes = (fractionalDegrees - degrees) * 60;
  const minutes = Math.trunc(fractionalMinutes);
  const fractionalSeconds = (fractionalMinutes - minutes) * 60;
  const DIGITS_AFTER_SECONDS = 3;
  const factor = 10 ** DIGITS_AFTER_SECONDS;
  const seconds = Math.round(fractionalSeconds * factor) / factor;
  return `${decimal < 0 ? "-" : ""}${degrees}°${minutes}'${seconds}"`;
}
