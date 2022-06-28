export class DateUtil {

  public static formatUS(date?: Date): string | null {
    if (!date) {
      return null;
    }
    const diaString = ('0' + date.getDate()).slice(-2);
    const mesString = ('0' + (date.getMonth() + 1)).slice(-2);

    return `${date.getFullYear()}-${mesString}-${diaString}`;
  }
}

