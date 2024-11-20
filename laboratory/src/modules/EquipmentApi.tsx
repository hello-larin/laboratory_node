import { EQUIPMNET_MOCK } from "./mock"

export interface Equipment {
    image: string | null
    name: string
    description: string | null
    price: number
    id: number
}

export interface EquipmentResult {
    procurement_id: number
	  procurement_count: number
    equipment: Equipment[]
}

export const getEquipmentByPrice = async (price = ''): Promise<EquipmentResult> =>{
    return fetch(`http://localhost:3000/api/equipment/?price=${price}`)
        .then((response) => response.json())
        .catch(()=> (EQUIPMNET_MOCK))
}

export const getEquipmentById = async (
  id: number
): Promise<Equipment> => {
  return fetch(`http://localhost:3000/api/equipment/${id}/`)
  .then((response) => response.json())
  .catch(()=> (EQUIPMNET_MOCK.equipment.find(
    (eq) => eq.id === id
)))
};