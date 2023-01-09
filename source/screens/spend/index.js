import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';

import {Button, Input, Text, Loading} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import {styles} from './styles';

import {useDispatch, useSelector} from 'react-redux';

import {updateProductAsync, fetchProductsAsync} from '../../redux/products';

export default function Spend({navigation}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  const isLoading = useSelector(state => state.products.isLoading);
  const products = useSelector(state => state.products.products);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(products.products);
  const [selectedProduct, setSelectedProduct] = useState();
  const [theRest, setTheRest] = useState(selectedProduct?.quantity);

  const onSelectItem = item => {
    setSelectedProduct(item);
  };

  const onChangeSpendedQuantity = e => {
    setTheRest(selectedProduct.quantity - e);
  };

  const spend = () => {
    if (selectedProduct !== undefined) {
      const copyProducts = products.products.map(p =>
        selectedProduct.id === p.id
          ? {
              ...p,
              quantity: theRest,
            }
          : p,
      );
      const payload = {
        ...products,
        products: copyProducts,
      };

      dispatch(updateProductAsync(payload));
      dispatch(fetchProductsAsync(user.uid));
      navigation.navigate('Main');
    } else {
      Alert.alert('Error', 'You must select any item', [
        {
          text: 'OK',
          onPress: () => console.log('OK'),
        },
      ]);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.bannerLeftIcon}>
          <Button text="←" onPress={() => goBack()} textStyle={styles.goBack} />
        </View>
        <Text text="Spend" style={styles.bannerText} />
      </View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={onSelectItem}
        schema={{
          label: 'name',
          value: 'id',
        }}
        style={styles.dropDownPicker}
      />
      <View style={styles.productInfos}>
        <View style={styles.productInfo}>
          <Text text="Product Name :" style={styles.productInfoText} />
          <Text text={selectedProduct?.name} style={styles.productInfoText} />
        </View>
        <View style={styles.productInfo}>
          <Text text="Product Price :" style={styles.productInfoText} />
          <Text text={selectedProduct?.price} style={styles.productInfoText} />
        </View>
        <View style={styles.productInfo}>
          <Text text="Product Quantity :" style={styles.productInfoText} />
          <Text
            text={selectedProduct?.quantity}
            style={styles.productInfoText}
          />
        </View>
        <View style={styles.spendInput}>
          <Text text="Spended Quantity" />
          <Input
            keyboardType="number-pad"
            containerStyle={styles.spendedQuantityContainer}
            style={styles.spendedQuantityText}
            onChangeText={onChangeSpendedQuantity}
          />
          <Text text={theRest === undefined ? ' ' : 'The rest : ' + theRest} />
        </View>
        <View style={styles.spend}>
          <Button
            text="Spend"
            onPress={() => spend()}
            disabled={theRest < 0 ? true : false}
            style={styles.spendButton}
            textStyle={styles.spendButtonText}
          />
          <Text
            text={theRest < 0 ? 'The rest is cannot be less than 0 !' : ' '}
            style={styles.theRestResultText}
          />
        </View>
      </View>
      <Loading visible={isLoading} />
    </SafeAreaView>
  );
}
