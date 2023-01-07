import {StyleSheet} from 'react-native';

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
    fontWeight: 'bold'
  },
  bannerButtons: {},
  bannerButtonsText: {},
  productsRenderItemContainer: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  productName: {
    alignItems: 'center',
    padding: 5,
  },
  productInfos: {
    flexDirection: 'row',
    padding: 5,
  },
});
