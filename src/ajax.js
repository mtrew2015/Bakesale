const apiHost = 'https://bakesaleforgood.com';

export default {
  async fetchInitialDeals() {
    try {
      let res = await fetch(apiHost + '/api/deals');
      let resJson = await res.json();
      return resJson;
    } catch (e) {
      console.log(e);
    }
  },
};
