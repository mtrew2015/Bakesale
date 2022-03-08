import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Button,
  Linking,
  ScrollView,
} from 'react-native';

import {priceDisplay} from '../util';
import ajax from '../ajax';

class DealDetail extends React.Component {
  imageXPos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      console.log('moving', gs.dx);
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      this.width = Dimensions.get('window').width;
      console.log('released');
      if (Math.abs(gs.dx) > this.width * 0.4) {
        const direction = Math.sign(gs.dx);
        // - 1 left + 1 right
        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 250,
        }).start(() => {
          this.handleSwipe(-1 * direction);
        });
      } else {
        Animated.spring(this.imageXPos, {toValue: 0}).start();
      }
    },
  });

  handleSwipe = indexDirection => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {toValue: 0}).start();
      return;
    }
    this.setState(
      prevState => ({
        imageIndex: prevState.imageIndex + indexDirection,
      }),
      () => {
        // next image animation
        this.imageXPos.setValue(this.width * indexDirection);
        Animated.spring(this.imageXPos, {toValue: 0}).start();
      },
    );
  };
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };
  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  };
  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({
      deal: fullDeal,
    });
  }

  openDealUrl = () => {
    Linking.openURL(this.state.deal.url);
  };
  render() {
    const {deal} = this.state;
    return (
      <ScrollView style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Animated.Image
          source={{uri: deal.media[this.state.imageIndex]}}
          onPress={this.props.on}
          {...this.imagePanResponder.panHandlers}
          style={[styles.image, {left: this.imageXPos}]}
        />
        <View style={styles.detail}>
          <View>
            <Text style={styles.title}>{deal.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
            {deal.user && (
              <View style={styles.user}>
                <Image source={{uri: deal.user.avatar}} style={styles.avatar} />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
          <View style={styles.description}>
            <Text>{deal.description}</Text>
          </View>
          <Button title="Buy this deal!" onPress={this.openDealUrl} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginTop: 40,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  detail: {borderColor: '#bbb', borderWidth: 1},
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45, 0.4)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    alignItems: 'center',
  },
  user: {
    alignItems: 'center',
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
  back: {
    marginBottom: 5,
    color: '#22f',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default DealDetail;
