import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';

import {Button, Text, Loading, Input} from '../../components';
import {styles} from './styles';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductAsync,
  fetchProductsAsync,
  updateProductAsync,
} from '../../redux/products';
import {nanoid} from '@reduxjs/toolkit';

export default function Main() {
  const [state, setState] = useState({
    productName: null,
    productPrice: null,
    productQuantity: null,
  });
  const [selectedProduct, setSelectedProduct] = useState();
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

  const onChangeProductName = e => {
    setState({
      ...state,
      productName: e,
    });
  };

  const onChangeProductPrice = e => {
    setState({
      ...state,
      productPrice: e,
    });
  };

  const onChangeProductQuantity = e => {
    setState({
      ...state,
      productQuantity: e,
    });
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
  };

  const updateProduct = () => {
    const copyProducts = products.products.map(p =>
      selectedProduct.id === p.id
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
  };

  const deleteProduct = () => {
    const copyProducts = products.products.filter(
      p => p.id !== selectedProduct.id,
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
  };

  const search = () => {};

  const productsRenderItem = ({item}) => {
    console.log('item', item);
    return (
      <TouchableOpacity
        onPress={() => {
          setProductOptionsModalVisible(true);
          setSelectedProduct(item);
          setState({
            ...state,
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
            text="Search"
            onPress={() => search()}
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
        data={products.products}
        extraData={products.products}
        renderItem={productsRenderItem}
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
        onBackdropPress={() => setProductOptionsModalVisible(false)}>
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
                defaultValue={selectedProduct?.name}
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
                defaultValue={selectedProduct?.price}
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
                defaultValue={selectedProduct?.quantity}
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
