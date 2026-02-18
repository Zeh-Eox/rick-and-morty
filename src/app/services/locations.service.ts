import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Location, LocationModel } from "../models/location.model";

@Injectable({
  providedIn: "root",
})
export class LocationsService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getLocations(page: number = 1) {
    return this.httpClient.get<LocationModel>(`${this.apiUrl}/location?page=${page}`);
  }

  getLocation(id: number) {
    return this.httpClient.get<Location>(`${this.apiUrl}/location/${id}`);
  }

  getLocationsByName(name: string) {
    return this.httpClient.get<LocationModel>(`${this.apiUrl}/location?name=${name}`);
  }

  getLocationsByType(type: string) {
    return this.httpClient.get<LocationModel>(`${this.apiUrl}/location?type=${type}`);
  }

  getLocationsByDimension(dimension: string) {
    return this.httpClient.get<LocationModel>(`${this.apiUrl}/location?dimension=${dimension}`);
  }
}