
import { SET_INVOICE_NUMBER, SET_SALES_ERROR, UPDATE_PRODUCT } from '../constants/qrTrackerTypes';
import { CFProduct } from '../../../../App'; // Adjust path as needed

export const setInvoiceNumber = (invoiceNumber: string) => ({
  type: SET_INVOICE_NUMBER,
  payload: invoiceNumber,
});

export const setSalesError = (error: string) => ({
  type: SET_SALES_ERROR,
  payload: error,
});

export const updateProduct = (product: CFProduct) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});
