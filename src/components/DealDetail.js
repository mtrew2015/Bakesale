import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';

export default class DealDetail extends Component {
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
  };
  state = {
    deal: this.props.initialDealData,
  };
  render() {
    const {deal} = this.state;
    return (
      <View style={styles.deal}>
        <Image source={{uri: deal.media[0]}} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.cause}>{deal.cause.name}</Text>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
          </View>
        </View>
        <Text>...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  deal: {
    marginHorizontal: 12,
    marginTop: 50,
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 1,
  },
});
