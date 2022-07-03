import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { cover } from '../Config/';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  commandRequest: null,
  commandSuccess: ['payload'],
  commandFailure: null,

  commandSave: null,
  commandOrder: ['orderNo'],
  commandReset: null,
  addProduct: ['book'],
  delProduct: ['book'],
});

export const CommandTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null,
  total: 0,
  count: 0,
  orderNo: null,
  products: {},
});

/* ------------- Reducers ------------- */

const addProduct = (state, { book }) => {
  const products = state.products.asMutable({ deep: true });
  const oldLen = Object.keys(products).length;
  products[`${book.id}`] = {
    id: book.id,
		code: book.isbn,
		title: book.titlu,
		cat:	book.categorie,
		details: book.name,
		image: cover(book, 'thumb'),
		currency: ' Lei',
		cant: 1,
		price: book.pret,
		total: book.pret
  };
  if (oldLen !== Object.keys(products).length) {
    const count = state.count + 1;
    const total = state.total + book.pret;
    return state.merge({ products, count, total });
  }
  return state;
};

const delProduct = (state, { book }) => {
  const products = state.products.asMutable({ deep: true });
  const oldLen = Object.keys(products).length;
  delete products[`${book.id}`];
  if (oldLen !== Object.keys(products).length) {
    const count = state.count - 1;
    const total = state.total - book.price;
    return state.merge({ products, count, total });
  }
  return state;
};

// request the data from an api
const request = (state) =>
  state.merge({ fetching: true, payload: null });

// successful api lookup
const success = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, payload });
};

// Something went wrong somewhere.
const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

const save = (state) =>
  state.merge({ fetching: true });

const setOrder = (state, { orderNo }) =>
  state.merge({ fetching: false, orderNo });

const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PRODUCT]: addProduct,
  [Types.DEL_PRODUCT]: delProduct,
  [Types.COMMAND_SAVE]: save,
  [Types.COMMAND_ORDER]: setOrder,
  [Types.COMMAND_RESET]: reset,

  [Types.COMMAND_REQUEST]: request,
  [Types.COMMAND_SUCCESS]: success,
  [Types.COMMAND_FAILURE]: failure,
});
