/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { List, ListItem, Body, Text, Right, Icon, Fab } from 'native-base';
import { Container, Content } from 'native-base';
import prompt from 'react-native-prompt-android';
export default class AddProduct extends React.Component {
  static options = { title: 'Add a product' };

  constructor(...args) {
    super(...args);
    this.state = {
      allProducts: [],
      productsInList: [],
    };
    this._setUpInitialState();
  }

  async _setUpInitialState() {
    const savedProducts = await AsyncStorage.getItem('@allProducts');
    if (savedProducts) {
      this.setState({
        allProducts: JSON.parse(savedProducts),
      });
    }

    this.setState({
      productsInList: this.props.route.params.productsInList,
    });
  }

  async addNewProduct(name) {
    const newProductList = this.state.allProducts.concat({
      name: name,
      id: Math.floor(Math.random() * 100000),
    });

    await AsyncStorage.setItem('@allProducts', JSON.stringify(newProductList));

    this.setState({
      allProducts: newProductList,
    });
  }

  /***User Actions Handlers***/

  _handleProductPress(product) {
    const productIndex = this.state.productsInList.findIndex(
      (p) => p.id === product.id,
    );
    if (productIndex > -1) {
      this.setState({
        productsInList: this.state.productsInList.filter(
          (p) => p.id !== product.id,
        ),
      });
      this.props.route.params.deleteProduct(product);
    } else {
      this.setState({
        productsInList: this.state.productsInList.concat(product),
      });
      this.props.route.params.addProduct(product);
    }
  }

  _handleAddProductPress() {
    prompt(
      'Enter product name',
      '',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: this.addNewProduct.bind(this) },
      ],
      {
        type: 'plain-text',
      },
    );
  }

  async _handleRemovePress(product) {
    this.setState({
      allProducts: this.state.allProducts.filter((p) => p.id !== product.id),
    });
    await AsyncStorage.setItem(
      '@allProducts',
      JSON.stringify(this.state.allProducts.filter((p) => p.id !== product.id)),
    );
  }

  /***REnder***/

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.allProducts.map((product) => {
              const productsInList = this.state.productsInList.find(
                (p) => p.id === product.id,
              );
              return (
                <ListItem
                  key={product.id}
                  onPress={this._handleProductPress.bind(this, product)}>
                  <Body>
                    <Text style={{ color: productsInList ? '#bbb' : '#000' }}>
                      {product.name}
                    </Text>
                    {productsInList && (
                      <Text note>{'Already is in shopping list'}</Text>
                    )}
                  </Body>
                  <Right>
                    <Icon
                      ios="ios-remove-circle"
                      android="md-remove-circle"
                      style={{ color: 'red' }}
                      onPress={this._handleRemovePress.bind(this, product)}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={this._handleAddProductPress.bind(this)}>
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
