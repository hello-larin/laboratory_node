export const ROUTES = {
  HOME: "/",
  EQUIPMENT: "/equipments",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Компания",
  EQUIPMENT: "Оборудование",
};