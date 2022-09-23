import { toast } from "react-hot-toast";
import { HttpError } from "../api/RestAPI";

export class ErrorService {
  static ShowAttributeErrors(errors: HttpError) {
    Object.values(errors ?? []).map((_value: string) => toast.error(_value));
  }

  static ShowEveryError(errors: HttpError, message: string) {
    if (errors != null) this.ShowAttributeErrors(errors);
    else toast.error(message);
  }
}
