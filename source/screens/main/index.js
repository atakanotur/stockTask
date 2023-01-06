import React, {useEffect, useRef} from 'react';
import {View, FlatList} from 'react-native';

import {Text} from '../../components';
import {styles} from './styles';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductsAsync} from '../../redux/products';

export default function Main() {
  const dispatch = useDispatch();
  const ref = useRef();

  const products = useSelector(state => state.products.productsList);
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);
  useEffect(() => {
    console.log('products', products);
  }, [products]);

  const productsRenderItem = ({item}) => {
    console.log('item', item);
    return (
      <View>
        <Text text={item.type} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text text="Stock" />
      <FlatList
        ref={ref}
        style={{flex: 1}}
        data={products}
        renderItem={productsRenderItem}
        extraData={products}
      />
    </SafeAreaView>
  );
}
