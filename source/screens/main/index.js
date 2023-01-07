import React, {useEffect, useRef} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';

import {Button, Text, Loading} from '../../components';
import {styles} from './styles';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductAsync,
  fetchProductsAsync,
  updateProducts,
} from '../../redux/products';

export default function Main() {
  const dispatch = useDispatch();
  const ref = useRef();

  const user = useSelector(state => state.user.user);
  const isLoading = useSelector(state => state.products.isLoading);

  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchProductsAsync(user.uid));
  }, []);

  useEffect(() => {
    console.log('products', products);
  }, [products]);

  const addProduct = () => {
    const copyProducts = products.products.slice();
    console.log('copyProducts', copyProducts);
    copyProducts.push({name: 'book', price: 15, quantity: 20});
    console.log('copyProducts', copyProducts);
    const payload = {
      ...products,
      products: copyProducts,
    };
    console.log('addProduct.payload', payload);
    dispatch(addProductAsync(payload));
  };

  const search = () => {};

  const productsRenderItem = ({item}) => {
    console.log('item', item);
    return (
      <TouchableOpacity style={styles.productsRenderItemContainer}>
        <View style={styles.productName}>
          <Text text={item.name} />
        </View>
        <View style={styles.productInfos}>
          <View>
            <Text text="Price :" />
            <Text text="Quantity :" />
          </View>
          <View>
            <Text text={item.price} />
            <Text text={item.quantity} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.bannerLeftButton}>
          <Button
            text="Search"
            onPress={() => search()}
            textStyle={styles.bannerButtons}
          />
        </View>
        <Text text="Products" style={styles.bannerText} />
        <View style={styles.bannerRightButton}>
          <Button
            text="Add Product"
            onPress={() => addProduct()}
            textStyle={styles.bannerButtons}
          />
        </View>
      </View>
      <FlatList
        ref={ref}
        style={{flex: 1}}
        data={products.products}
        renderItem={productsRenderItem}
        extraData={products}
      />
      <Loading visible={isLoading} />
    </SafeAreaView>
  );
}
