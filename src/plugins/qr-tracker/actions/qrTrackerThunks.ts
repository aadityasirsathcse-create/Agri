
import { Dispatch } from 'redux';
import { setSalesError, updateProduct } from './qrTrackerActions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, CFProduct } from '../../../../App'; // Adjust this path as needed
import { QRTrackerState } from '../reducers/qrTrackerReducer';

type SalesNavigationProp = StackNavigationProp<RootStackParamList, 'CFSales'>;
type OrderDetailNavigationProp = StackNavigationProp<RootStackParamList, 'CFOrderDetail'>;
type ReportProductNavigationProp = StackNavigationProp<RootStackParamList, 'CFReportProduct'>;

export const reportSales = (invoiceNumber: string, navigation: SalesNavigationProp) => {
  return (dispatch: Dispatch) => {
    if (invoiceNumber.trim() === '') {
      dispatch(setSalesError('Please enter a valid SAP code or invoice number'));
    } else {
      dispatch(setSalesError(''));
      navigation.navigate('CFOrderDetail', {});
    }
  };
};

export const submitOrder = (navigation: OrderDetailNavigationProp) => {
  return () => {
    navigation.navigate('CFSuccess');
  };
};

export const reportProduct = (product: CFProduct, navigation: ReportProductNavigationProp) => {
    return (dispatch: Dispatch) => {
        dispatch(updateProduct(product));
        navigation.navigate('CFOrderDetail', { product });
    };
};

export const scan = (product: CFProduct, navigation: ReportProductNavigationProp) => {
    return () => {
        navigation.navigate('CFScan', { product });
    };
}

export const addScannedCode = (productId: string, scannedCode: string) => {
    return (dispatch: Dispatch, getState: () => { qrTracker: QRTrackerState }) => {
      const { qrTracker } = getState();
      const product = qrTracker.products.find(p => p.id === productId);
      if (product && product.scanned < product.shippers) {
        const updatedProduct = { ...product, scanned: product.scanned + 1 };
        dispatch(updateProduct(updatedProduct));
      }
    };
  };
  
  export const addBarcode = (productId: string, barcode: string) => {
      return (dispatch: Dispatch, getState: () => { qrTracker: QRTrackerState }) => {
        const { qrTracker } = getState();
        const product = qrTracker.products.find(p => p.id === productId);
        if (product && product.scanned < product.shippers) {
          const updatedProduct = { ...product, scanned: product.scanned + 1 };
          dispatch(updateProduct(updatedProduct));
        }
      };
    };
