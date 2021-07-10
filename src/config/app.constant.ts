import { environment } from "src/environments/environment.prod";



export class AppConstants {
  /*
  *Base URL is not used anywhere so dont change it and dont delete it
  */
  public static get baseURL(): string {
    return environment.ICUST_URL;

  }

}
