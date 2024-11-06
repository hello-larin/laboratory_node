import { EQUIPMNET_MOCK } from "./mock"

export interface Equipment {
    image: string
    name: string
    description: string
    price: number
    id: number
}

export interface EquipmentResult {
    procurement_id: number
	  procurement_count: number
    equipment: Equipment[]
}

export const getEquipment = async (): Promise<EquipmentResult> =>{
  return fetch(`http://localhost:3000/api/equipment/`, {
  })
      .then((response) => response.json())
}

export const getEquipmentByPrice = async (price = ''): Promise<EquipmentResult> =>{
    return fetch(`http://localhost:3000/api/equipment/?price=${price}`)
        .then((response) => response.json())
        .catch(()=> (EQUIPMNET_MOCK))
}

export const getEquipmentById = async (
  id: number | string
): Promise<EquipmentResult> => {
  return fetch(`http://localhost:3000/api/equipment/${id}/`).then(
    (response) => response.json()
  )
};