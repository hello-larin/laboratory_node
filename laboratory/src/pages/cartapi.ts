import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '../Routes';
import { api } from '../api';
import { clearCart } from '../slices/AuthSlice';
// Thunk to update procurement
export const updateProcurement = (procurementId, address, phone) => async (dispatch) => {
    const { request } = await api.procurements.procurementsUpdate(procurementId, { address, phone });
    if (request.status === 200) {
        dispatch(fetchProcurementData(procurementId));
        dispatch(submitProcurement(procurementId));
    }
};

// Thunk to submit procurement
export const submitProcurement = (procurementId) => async (dispatch) => {
    const { request } = await api.procurements.procurementsSubmitCreate(procurementId);
    if (request.status === 200) {
        dispatch(clearCart());
        return true;
    }
};

// Thunk to update item amount
export const updateItemAmount = (itemId, amount) => async (dispatch) => {
    const { request } = await api.item.itemUpdate(itemId, { amount });
    if (request.status === 200) {
        dispatch(fetchProcurementData(procurementId));
    }
};

// Thunk to fetch procurement data
export const fetchProcurementData = (procurementId) => async (dispatch) => {
    const { request } = await api.procurements.procurementsRead(procurementId);
    if (request.status === 200) {
        const data = JSON.parse(request.response);
        dispatch(setAddress(data.address));
        dispatch(setPhone(data.phone));
        return data;
    }
    return null;
};