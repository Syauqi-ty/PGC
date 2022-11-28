/**
 * Function Routing
 * @param px prefix
 * @param rutearr route array
 * @returns formated array route
 */
export function RouteFormater(px: string, rutearr: any[]): any[] {
  let rute: any[] = [];
  rutearr.map((val) => {
    val.route.map((value) => {
      value.route = `${px}${val.px}${value.route}`;
    });
    rute = [...rute, ...val.route];
  });
  return rute;
}
