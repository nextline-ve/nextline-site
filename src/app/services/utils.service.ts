import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(msg: string, duration: number = 2000) {
    this.snackBar.open(msg, "O.K.", {
      duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  imageFileToURI(event) {
    return new Promise((resolve, reject) => {
      if (event.target.files && event.target.files.length) {
        const reader = new FileReader();
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result as string);
        };
      } else {
        reject("error");
      }
    });
  }

  formatErrors(err) {
    const keyWithError = [];
    for (const key in err.error) {
      if (Object.prototype.hasOwnProperty.call(err.error, key)) {
        if (err.error[key] != "") {
          keyWithError.push(`${err.error[key]} `);
        }
      }
    }
    const msg =
      keyWithError.length == 1
        ? `Error: ${keyWithError}`
        : `Errores: ${keyWithError.join(", ")}`;

    return JSON.stringify(msg);
  }

  calculatePaymentDay(dayDate) {
    // console.log("calculatePaymentDay",  dayDate);
    // const now = moment();
    // const year = now.get("year");
    // const month = now.get("month");
    // const day = now.get("day");
    // const currentMonth = dayDate >= day ? 2 : 1;

    // return moment(
    //   `${dayDate}-${month + currentMonth}-${year}`,
    //   "DD-MM-YYYY"
    // ).format("DD/MM/YYYY");
    return moment(
        dayDate,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY")
  }

  formatBillDate(date){
    return moment(
      date,
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
  }

  validateDaysForCommitment(dataFormatless, days){
    
    const date = moment(dataFormatless,"DD/MM/YYYY").format( "YYYY-MM-DD");
    const maximumDate = moment().add(days, 'days');
    const isBefore =  moment(date ).isSameOrBefore(maximumDate.format("YYYY-MM-DD"));
    
    return {isBefore, maxDate: maximumDate.format("DD/MM/YYYY")};
  }

}
