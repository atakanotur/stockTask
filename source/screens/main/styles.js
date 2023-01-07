import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  banner: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bannerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerButtons: {},
  bannerButtonsText: {},
  products: {
    flex: 1,
    margin: 20,
  },
  productsRenderItemContainer: {
    borderWidth: 1,
    padding: 5,
    margin: 10,
    borderRadius: 10,
  },
  productName: {
    alignItems: 'center',
    padding: 5,
  },
  productInfos: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  addProductModalMain: {
    flex: 0.4,
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  addProductModalBannerText: {
    fontSize: 20,
  },
  addProductModalInputs: {
    justifyContent: 'center',
  },
  addProductModalInput: {
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    padding: 5,
  },
  addProductModalInputText: {},
  addProductButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.green,
  },
  addProductButtonText: {
    color: colors.white,
  },
  productOptionsModalMain: {
    flex: 0.4,
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  productOptionsModalInputs: {
    justifyContent: 'center',
  },
  productOptionsModalInput: {
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    padding: 5,
  },
  productOptionsButtons: {
    flexDirection: 'row',
  },
  productOptionsDeleteButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.red,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productOptionsEditButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.green,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productOptionsButtonText: {
    color: colors.white,
  },
});
