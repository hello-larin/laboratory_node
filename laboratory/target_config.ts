const target_tauri = false

export const api_proxy_addr = "http://192.168.15.56:8000"
export const img_proxy_addr = "http://192.168.15.56:9000"
export const dest_api = (target_tauri) ? api_proxy_addr : "api"
export const dest_img =  (target_tauri) ?  img_proxy_addr : "img-proxy"
export const dest_root = (target_tauri) ? "" : "/lab1"