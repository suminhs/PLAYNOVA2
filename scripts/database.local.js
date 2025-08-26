class Database {
  constructor() {
    this.local = localStorage;
    this.newDatabase = {};
    this.data = [];
  }

  addData(data, nameData) {
    this.data.push(data);
    this.newDatabase[nameData] = this.data;

    if (this.local.getItem(nameData)) {
      this.local.setItem(nameData, JSON.stringify(this.newDatabase[nameData]));
    }

    this.local.setItem(nameData, JSON.stringify(this.newDatabase[nameData]));
    return {
      success: true,
      data: this.newDatabase[nameData]
    };
  }

  getData(username, nameData) {
    return this.newDatabase[nameData].find(user => user.username === username);
  }
};


export default new Database();