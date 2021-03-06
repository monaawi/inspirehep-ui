import { push } from 'react-router-redux';
import { stringify } from 'qs';

import { SEARCH_REQUEST, SEARCH_ERROR, SEARCH_SUCCESS } from './actionTypes';

function searching() {
  return {
    type: SEARCH_REQUEST,
  };
}

function searchSuccess(result) {
  return {
    type: SEARCH_SUCCESS,
    payload: result,
  };
}

function searchError(error) {
  return {
    type: SEARCH_ERROR,
    payload: error,
  };
}

function getSearchUrl(state, query) {
  const pathname = state.search.getIn(['scope', 'pathname']);
  const queryString = stringify(query, { indices: false });
  return `/${pathname}?${queryString}`;
}

function appendQuery(state, query, excludeLocationQuery) {
  const baseQuery = state.search.getIn(['scope', 'query']).toJS();
  const locationQuery = excludeLocationQuery ? {} : state.router.location.query;

  if (query && locationQuery.page !== undefined) {
    locationQuery.page = 1;
  }

  return {
    ...baseQuery,
    ...locationQuery,
    ...query,
  };
}

export function pushQueryToLocation(query, clearLocationQuery = false) {
  return async (dispatch, getState) => {
    const state = getState();
    const newQuery = appendQuery(state, query, clearLocationQuery);
    const url = getSearchUrl(state, newQuery);
    if (Object.keys(newQuery).length > 0) {
      dispatch(push(url));
    }
  };
}

export function searchForCurrentLocation() {
  return async (dispatch, getState, http) => {
    const { location } = getState().router;
    dispatch(searching());
    const url = `${location.pathname}${location.search}`;
    try {
      const response = await http.get(url, {
        headers: {
          Accept: 'application/vnd+inspire.record.ui+json',
        },
      });
      dispatch(searchSuccess(response.data));
    } catch (error) {
      dispatch(searchError(error.data));
    }
  };
}
