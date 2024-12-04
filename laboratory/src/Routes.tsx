export const ROUTES = {
  HOME: "/",
  EQUIPMENT: "/equipments",
  LOGIN: "/login",
  REGISTER: "/regiter",
  PROCUREMENT: "/procurements",
  PROFILE: "/profile",
  LOGOUT: "/logout",
  CART: "/current_procurement"
  
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Компания",
  EQUIPMENT: "Оборудование",
  LOGIN: "Авторизация",
  REGISTER: "Регистрация",
  PROCUREMENT: "Накладные",
  PROFILE: "Профиль",
  LOGOUT: "Выйти",
  CART: "Корзина"
};