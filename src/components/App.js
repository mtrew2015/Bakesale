/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';
import ajax from '../ajax';
export default class App extends Component {
  titleXPos = new Animated.Value(0);
  state = {
    deals: [],
    currentDealId: null,
    dealsFromSearch: [],
  };
  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width / 2 - 100;
    Animated.timing(this.titleXPos, {
      toValue: direction * width,
      duration: 1000,
      easing: Easing.ease,
    }).start(({finished}) => {
      if (finished) {
        this.animateTitle(-1 * direction);
      }
    });
  };
  async componentDidMount() {
    this.animateTitle();
    const deals = await ajax.fetchInitialDeals();
    this.setState({deals});
    console.log(deals);
  }

  setCurrentDeal = dealId => {
    this.setState({currentDealId: dealId});
  };

  unsetCurrentDeal = () => {
    this.setState({currentDealId: null});
  };

  currentDeal = () => {
    return this.state.deals.find(deal => deal.key === this.state.currentDealId);
  };

  searchDeals = async searchTerm => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    this.setState({dealsFromSearch});
  };

  render() {
    if (this.state.currentDealId) {
      return (
        <View>
          <DealDetail
            onBack={this.unsetCurrentDeal}
            initialDealData={this.currentDeal()}
          />
        </View>
      );
    }

    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0
        ? this.state.dealsFromSearch
        : this.state.deals;

    if (this.state.deals.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList onItemPress={this.setCurrentDeal} deals={dealsToDisplay} />
        </View>
      );
    }
    return (
      <Animated.View style={[styles.container, {left: this.titleXPos}]}>
        <Text style={styles.header}>Bakesale</Text>
      </Animated.View>
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
  main: {
    marginTop: 40,
  },
});
