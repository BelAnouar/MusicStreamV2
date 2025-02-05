import {InjectionToken} from "@angular/core";
import {Config} from "./config.interface";


export const APP_SERVICE_CONFIG=new InjectionToken<Config>("app.config")

export const APP_CONFIG: Config={
  apiEndpoint:"http://localhost:8084/api"
}
