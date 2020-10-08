import React from 'react';
import {Alert} from 'react-native';
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
  static navigationOptions = {
    title: 'My Groceries List',
  };
  /***Render***/
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Body>
                <Text>'Name of the product'</Text>
              </Body>
              <Right>
                <CheckBox checked={false} />
              </Right>
            </ListItem>
          </List>
        </Content>
        <Fab style={{backgroundColor: '#5067FF'}} position="bottomRight">
          <Icon name="add" />
        </Fab>
        <Fab style={{backgroundColor: 'red'}} position="bottomLeft">
          <Icon ios="ios-remove" android="md-remove" />
        </Fab>
      </Container>
    );
  }
}
