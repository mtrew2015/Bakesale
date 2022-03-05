/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';
import ajax from '../ajax';
export default class App extends Component {
  state = {
    deals: [],
    currentDealId: null,
    dealsFromSearch: [],
  };
  async componentDidMount() {
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
      <View style={styles.container}>
        <Text style={styles.header}>Bakesale</Text>
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
  main: {
    marginTop: 40,
  },
});
