const state = {
  productSearchHeaders: [{
      text: '',
      value: 'productImage',
      sortable: false,
      filerable: false
    },
    {
      text: 'Data',
      value: 'createDate',
      sortable: false
    },
    {
      text: 'Katerogia',
      value: 'productCategory'
    },
    {
      text: 'Wskazanie',
      value: 'productLine'
    },
    {
      text: 'Lek',
      value: 'productMedicine'
    },
    {
      text: 'Nazwa Produktu',
      value: 'productName'
    },
    {
      text: 'Kod',
      value: 'productCode'
    },
    {
      text: 'Ilość',
      value: 'productQuantity'
    },
    {
      text: '',
      value: 'actions',
      sortable: false,
      filerable: false,
      align: 'center'
    }
  ],
  orderViewHeaders: [{
      text: '',
      value: 'productImage',
      sortable: false,
      filerable: false
    },
    {
      text: 'Magazyn',
      value: 'warehouse'
    },
    {
      text: 'Katerogia',
      value: 'productCategory'
    },
    {
      text: 'Wskazanie',
      value: 'productLine'
    },
    {
      text: 'Lek',
      value: 'productMedicine'
    },
    {
      text: 'Nazwa Produktu',
      value: 'productName',
    },
    {
      text: 'Kod',
      value: 'productCode'
    },
    {
      text: 'Ilość dostępna',
      value: 'productQuantity',
      width: 20,
    },
    {
      text: 'Wartość zamówienia',
      value: 'orderQuantity',
      sortable: false,
      filerable: false,
      align: 'center',
      width: 40
    },
    {
      text: 'Usuń pozycję',
      value: 'delete',
      sortable: false,
      filerable: false,
      align: 'center'
    }
  ],
  userManageHeaders: [
    {
      text: 'E-mail',
      value: 'id'
    },
    {
      text: 'Imię',
      value: 'firstName'
    },
    {
      text: 'Nazwisko',
      value: 'lastName'
    },
    {
      text: 'Telefon',
      value: 'phoneNumber'
    },
    {
      text: 'Adres',
      value: 'address'
    },
    // {
    //   text: 'Usuń',
    //   value: 'delete',
    //   sortable: false,
    //   align: 'center',
    //   filerable: false
    // },
    {
      text: 'Uprawnienia',
      value: 'role',
      sortable: false,
      filerable: false
    }
  ]
};

const mutations = {};

const getters = {
  getProductSearchHeaders: state => state.productSearchHeaders,
  getOrderViewHeaders: state => state.orderViewHeaders,
  getUserManageHeaders: state => state.userManageHeaders,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};