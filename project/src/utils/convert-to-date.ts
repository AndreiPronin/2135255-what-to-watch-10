import { DateOption } from '../enums/enum';

function ConvertToDate(DateString:string){
  return(
    new Date(DateString).toLocaleString(DateOption.location,{ year: DateOption.year, month: DateOption.month, day: DateOption.day })
  );
}
export default ConvertToDate;

