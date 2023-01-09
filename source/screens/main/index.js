import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';

import {Button, Text, Loading, Input, SearchBar} from '../../components';
import {styles} from './styles';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductAsync,
  fetchProductsAsync,
  updateProductAsync,
} from '../../redux/products';
import {nanoid} from '@reduxjs/toolkit';

export default function Main({navigation}) {
  const [state, setState] = useState({
    productId: null,
    productName: null,
    productPrice: null,
    productQuantity: null,
  });
  const [searchData, setSearchData] = useState(null);
  const [searchText, setSearchText] = useState();
  const [addProductModalVisible, setAddProductModalVisible] = useState(false);
  const [productOptionsModalVisible, setProductOptionsModalVisible] =
    useState(false);
  const dispatch = useDispatch();
  const ref = useRef();

  const user = useSelector(state => state.user.user);
  const isLoading = useSelector(state => state.products.isLoading);
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchProductsAsync(user.uid));
  }, []);

  const resetState = () => {
    setState({
      productId: null,
      productName: null,
      productPrice: null,
      productQuantity: null,
    });
  };

  const onChangeSearch = e => {
    setSearchData(search(e));
  };

  const search = text => {
    if (text) {
      let filtered;
      filtered = products.products.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      return filtered;
    }
  };

  const onChangeProductName = e => {
    setState({
      ...state,
      productName: e,
    });
  };

  const onChangeProductPrice = e => {
    if (/^\d+$/.test(e)) {
      setState({
        ...state,
        productPrice: e,
      });
    }
  };

  const onChangeProductQuantity = e => {
    if (/^\d+$/.test(e)) {
      setState({
        ...state,
        productQuantity: e,
      });
    }
  };

  const addProduct = () => {
    const copyProducts = products.products.slice();
    if (
      state.productName !== null &&
      state.productPrice !== null &&
      state.productQuantity !== null
    ) {
      copyProducts.push({
        id: nanoid(),
        name: state.productName,
        price: state.productPrice,
        quantity: state.productQuantity,
      });
      const payload = {
        ...products,
        products: copyProducts,
      };
      dispatch(addProductAsync(payload));
      dispatch(fetchProductsAsync(user.uid));
      setAddProductModalVisible(false);
    } else {
      Alert.alert('Error', 'Please fill all areas !', [
        {
          text: 'OK',
          onPress: () => console.log('OK'),
        },
      ]);
    }
    setSearchData(null);
    setSearchText('');
    resetState();
  };

  const updateProduct = () => {
    const copyProducts = products.products.map(p =>
      state.productId === p.id
        ? {
            ...p,
            name: state.productName,
            price: state.productPrice,
            quantity: state.productQuantity,
          }
        : p,
    );
    const payload = {
      ...products,
      products: copyProducts,
    };
    dispatch(updateProductAsync(payload));
    dispatch(fetchProductsAsync(user.uid));
    setProductOptionsModalVisible(false);
    setSearchData(null);
    setSearchText('');
    resetState();
  };

  const deleteProduct = () => {
    const copyProducts = products.products.filter(
      p => p.id !== state.productId,
    );
    const payload = {
      ...products,
      products: copyProducts,
    };
    Alert.alert('Delete', 'Are you sure ?', [
      {
        text: 'Yes',
        onPress: () => {
          dispatch(updateProductAsync(payload));
          dispatch(fetchProductsAsync(user.uid));
          setProductOptionsModalVisible(false);
        },
      },
      {
        text: 'No',
        onPress: () => console.log('No'),
      },
    ]);
    setSearchData(null);
    setSearchText('');
    resetState();
  };

  const productsRenderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setProductOptionsModalVisible(true);
          setState({
            ...state,
            productId: item.id,
            productName: item.name,
            productPrice: item.price,
            productQuantity: item.quantity,
          });
        }}
        style={styles.productsRenderItemContainer}>
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
            text="Spend Product"
            onPress={() => navigation.navigate('Spend')}
            textStyle={styles.bannerButtons}
          />
        </View>
        <Text text="Products" style={styles.bannerText} />
        <View style={styles.bannerRightButton}>
          <Button
            text="Add Product"
            onPress={() => setAddProductModalVisible(true)}
            textStyle={styles.bannerButtons}
          />
        </View>
      </View>
      <FlatList
        ref={ref}
        style={styles.products}
        data={
          searchData === null || searchData === undefined
            ? products.products
            : searchData
        }
        extraData={products.products}
        renderItem={productsRenderItem}
        ListHeaderComponent={
          <SearchBar
            containerStyle={styles.addProductModalInput}
            style={styles.addProductModalInputText}
            onChangeText={onChangeSearch}
            value={searchText}
          />
        }
      />
      <Modal
        isVisible={addProductModalVisible}
        onBackdropPress={() => setAddProductModalVisible(false)}>
        <View style={styles.addProductModalMain}>
          <Text text="Add Product" style={styles.addProductModalBannerText} />
          <View style={styles.addProductModalInputs}>
            <View>
              <Text
                text="Product Name"
                style={styles.addProductModalInputText}
              />
              <Input
                containerStyle={styles.addProductModalInput}
                style={styles.addProductModalInputText}
                onChangeText={onChangeProductName}
                value={state.productName}
              />
            </View>
            <View>
              <Text
                text="Product Price"
                style={styles.addProductModalInputText}
              />
              <Input
                keyboardType="number-pad"
                containerStyle={styles.addProductModalInput}
                style={styles.addProductModalInputText}
                onChangeText={onChangeProductPrice}
                value={state.productPrice}
              />
            </View>

            <View>
              <Text
                text="Product Quantity"
                style={styles.addProductModalInputText}
              />
              <Input
                keyboardType="number-pad"
                containerStyle={styles.addProductModalInput}
                style={styles.addProductModalInputText}
                onChangeText={onChangeProductQuantity}
                value={state.productQuantity}
              />
            </View>
          </View>
          <View>
            <Button
              text="Add Product"
              style={styles.addProductButton}
              textStyle={styles.addProductButtonText}
              onPress={() => {
                addProduct();
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={productOptionsModalVisible}
        onBackdropPress={() => {
          setProductOptionsModalVisible(false);
          resetState();
        }}>
        <View style={styles.productOptionsModalMain}>
          <Text
            text="Edit Product"
            style={styles.productOptionsModalBannerText}
          />
          <View style={styles.productOptionsModalInputs}>
            <View>
              <Text
                text="Product Name"
                style={styles.productOptionsModalInputText}
              />
              <Input
                defaultValue={state?.productName}
                containerStyle={styles.productOptionsModalInput}
                style={styles.productOptionsModalInputText}
                onChangeText={onChangeProductName}
              />
            </View>
            <View>
              <Text
                text="Product Price"
                style={styles.productOptionsModalInputText}
              />
              <Input
                keyboardType="number-pad"
                defaultValue={state?.productPrice}
                containerStyle={styles.productOptionsModalInput}
                style={styles.productOptionsModalInputText}
                onChangeText={onChangeProductPrice}
              />
            </View>

            <View>
              <Text
                text="Product Quantity"
                style={styles.productOptionsModalInputText}
              />
              <Input
                keyboardType="number-pad"
                defaultValue={state?.productQuantity?.toString()}
                containerStyle={styles.productOptionsModalInput}
                style={styles.productOptionsModalInputText}
                onChangeText={onChangeProductQuantity}
              />
            </View>
          </View>
          <View style={styles.productOptionsButtons}>
            <Button
              text="Delete Product"
              textStyle={styles.productOptionsButtonText}
              style={styles.productOptionsDeleteButton}
              onPress={() => deleteProduct()}
            />
            <Button
              text="Edit Product"
              textStyle={styles.productOptionsButtonText}
              style={styles.productOptionsEditButton}
              onPress={() => updateProduct()}
            />
          </View>
        </View>
      </Modal>
      <Loading visible={isLoading} />
    </SafeAreaView>
  );
}
