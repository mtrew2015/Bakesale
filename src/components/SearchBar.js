import React, {Component} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {debounce} from 'lodash';

export default class SearchBar extends Component {
  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
  };
  state = {
    searchTerm: '',
  };
  debouncedSearchDeals = debounce(this.props.searchDeals, 300);
  handleChange = searchTerm => {
    this.setState({searchTerm}, () => {
      // debounce search
      this.debouncedSearchDeals(this.state.searchTerm);
    });
  };
  render() {
    return (
      <TextInput
        onChangeText={this.handleChange}
        placeholder={'Search All Deals'}
        style={styles.input}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  },
});
