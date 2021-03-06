import { Injectable } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
declare const google: any;

@Injectable({
  providedIn: "root",
})
export class GeoUtilsService {
  constructor(private mapsAPILoader: MapsAPILoader) { this.initMapsPlugin(); }

  initMapsPlugin(){
    this.mapsAPILoader.load().then(() => {
      const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(10.502456738546742, -66.85264314414663),
        new google.maps.LatLng(10.502456738546742, -66.85264314414663)
      );
    });
  }

  async askLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(
          "Es necesario que utilice google chrome en la versión  más actual para usar nuestro sistema."
        );
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (objPosition) => {
          resolve(objPosition.coords);
        },
        (objPositionError) => {
          switch (objPositionError.code) {
            case objPositionError.PERMISSION_DENIED:
              reject(
                "No se ha permitido el acceso a la geolocalización del usuario."
              );
              break;
            case objPositionError.POSITION_UNAVAILABLE:
              reject(
                "No se ha podido acceder a la información de su posición."
              );
              break;
            case objPositionError.TIMEOUT:
              reject("El servicio ha tardado demasiado tiempo en responder.");
              break;
            default:
              reject("Error desconocido.");
          }
        },
        {
          maximumAge: 75000,
          timeout: 15000,
        }
      );
    });
  }

  async getAddress(coords: any) {
    console.warn("getAddress", coords);
    
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: coords.latitude,
      lng: coords.longitude,
    };

    return new Promise((resolve, reject) => {
      geocoder.geocode(
        { location: latlng },
        (
          results: google.maps.GeocoderResult[],
          status: google.maps.GeocoderStatus
        ) => {
          if (status === "OK") {
            console.log("++ results", results);

            if (results[0]) {
              resolve(results[0]);
            } else {
              reject("Error al buscar tu direccion");
            }
          } else {
            reject("Error de google maps: " + status);
          }
        }
      );
    });
  }
}
