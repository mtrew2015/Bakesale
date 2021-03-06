const apiHost = 'https://bakesaleforgood.com';

export default {
  async fetchInitialDeals() {
    try {
      const res = await fetch(apiHost + '/api/deals');
      const resJson = await res.json();
      return resJson;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchDealsSearchResults(searchTerm) {
    try {
      const res = await fetch(apiHost + '/api/deals?searchTerm=' + searchTerm);
      const resJson = await res.json();
      return resJson;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchDealDetail(dealId) {
    try {
      const res = await fetch(apiHost + '/api/deals/' + dealId);
      const resJson = await res.json();
      return resJson;
    } catch (e) {
      console.log(e);
    }
  },
};
