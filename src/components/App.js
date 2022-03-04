/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DealList from './DealList';
import ajax from '../ajax';
export default class App extends Component {
  state = {
    deals: [],
  };
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState(prev => {
      return {deals};
    });
    console.log(deals);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.deals.length > 0 ? (
          <DealList deals={this.state.deals} />
        ) : (
          <Text style={styles.header}>Bakesale</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});
