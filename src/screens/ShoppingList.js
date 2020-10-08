/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Alert } from 'react-native';
import {
  Body,
  Container,
  Content,
  Right,
  Text,
  CheckBox,
  List,
  ListItem,
  Fab,
  Icon,
} from 'native-base';

export default class ShoppingList extends React.Component {
  static options = { title: 'Shopping List' };
  constructor(...args) {
    super(...args);
    this.state = {
      products: [],
    };
  }
  /***User Actions Handlers***/
  _handleProductPress(product) {
    this.state.products.forEach((p) => {
      if (product.id === p.id) {
        p.gotten = !p.gotten;
      }
      return p;
    });

    this.setState({ products: this.state.products });
  }

  _handleAddProductPress() {
    this.props.navigation.navigate('Add Product', {
      addProduct: (product) => {
        this.setState({
          products: this.state.products.concat(product),
        });
      },
      deleteProduct: (product) => {
        this.setState({
          products: this.state.products.filter((p) => p.id !== product.id),
        });
      },
      productsInList: this.state.products,
    });
  }

  _handleClearPress() {
    Alert.alert('Clear all items?', null, [
      { text: 'Cancel' },
      { text: 'OK', onPress: () => this.setState({ products: [] }) },
    ]);
  }
  /***Render***/
  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.products.map((p) => {
              return (
                <ListItem
                  key={p.id}
                  onPress={this._handleProductPress.bind(this, p)}>
                  <Body>
                    <Text style={{ color: p.gotten ? '#bbb' : '#000' }}>
                      {p.name}
                    </Text>
                  </Body>
                  <Right>
                    <CheckBox
                      checked={p.gotten}
                      onPress={this._handleProductPress.bind(this, p)}
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
        <Fab
          style={{ backgroundColor: 'red' }}
          position="bottomLeft"
          onPress={this._handleClearPress.bind(this)}>
          <Icon ios="ios-remove" android="md-remove" />
        </Fab>
      </Container>
    );
  }
}
