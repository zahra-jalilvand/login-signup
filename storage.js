class LocalStorageData {
    static setData(data) {
      localStorage.setItem('user', JSON.stringify(data._id));
    }
  
    static getData(term) {
      const data = localStorage.getItem(term);
      return JSON.parse(data);
    }
  
    static removeData() {
      localStorage.removeItem('user');
    }
  }
  
  export { LocalStorageData };
  
