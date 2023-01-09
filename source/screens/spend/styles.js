import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  banner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 25,
  },
  bannerLeftIcon: {
    position: 'absolute',
    left: 5,
  },
  goBack: {
    fontSize: 30,
  },
  dropDownPicker: {
    marginTop: 20,
  },
  productInfos: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  productInfo: {
    flex: 0.3,
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  productInfoText: {
    fontSize: 20,
  },
  spendedQuantityContainer: {
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    padding: 5,
  },
  spendedQuantityText: {
    fontSize: 20,
  },
  spendInput: {
    flex: 1,
    justifyContent: 'center',
  },
  spend: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spendButton: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
    backgroundColor: colors.green,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spendButtonText: {
    color: colors.white,
  },
  theRestResultText: {
    color: colors.red,
  },
});
