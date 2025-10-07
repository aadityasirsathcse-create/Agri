
import { CFProduct } from '../../../../App';

export interface QRTrackerState {
  products: CFProduct[];
  salesError: string;
}

const initialState: QRTrackerState = {
  products: [
    { id: '1', name: 'Product 1', batch: '003282919', size: '1 Ltr.', shippers: 5, scanned: 0 },
    { id: '2', name: 'Product 2', batch: '003282919', size: '1 Ltr.', shippers: 5, scanned: 0 },
    { id: '3', name: 'Product 3', batch: '003282919', size: '1 Ltr.', shippers: 5, scanned: 0 },
    { id: '4', name: 'Product 4', batch: '003282919', size: '1 Ltr.', shippers: 5, scanned: 0 },
  ],
  salesError: '',
};

const qrTrackerReducer = (state = initialState, action: any): QRTrackerState => {
  switch (action.type) {
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'SET_SALES_ERROR':
      return {
        ...state,
        salesError: action.payload,
      };
    default:
      return state;
  }
};

export default qrTrackerReducer;
