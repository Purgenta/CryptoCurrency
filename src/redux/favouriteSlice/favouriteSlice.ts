import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
let items: string[] = [];
const favItems = JSON.parse(
  localStorage.getItem("favourites") || "{}"
)?.favourites;
if (Array.isArray(favItems)) items = favItems;
const initialState = {
  items,
};
export const addFavourite = createAsyncThunk(
  "addFavourite",
  async (item: string) => {
    const favourites = localStorage.getItem("favourites");
    const setItem = () =>
      localStorage.setItem(
        "favourites",
        JSON.stringify({ favourites: [item] })
      );
    if (!favourites) setItem();
    else {
      const favouriteItems = JSON.parse(favourites)?.items;
      if (favouriteItems && Array.isArray(favouriteItems)) {
        favouriteItems.push(item);
        localStorage.setItem(
          "favourites",
          JSON.stringify({ favourites: favouriteItems })
        );
      } else setItem();
    }
    return item;
  }
);
export const removeFavourite = createAsyncThunk(
  "removeFavourite",
  async (item: string) => {
    const favourites = localStorage.getItem("favourites");
    if (!favourites) return Promise.reject();
    const favouriteItems = JSON.parse(favourites);
    if (favouriteItems.favourites && Array.isArray(favouriteItems.favourites)) {
      const items = favouriteItems.favourites as string[];

      localStorage.setItem(
        "favourites",
        JSON.stringify({
          favourites: items.filter((favourite) => favourite !== item),
        })
      );
      return Promise.resolve(item);
    }
    return Promise.reject();
  }
);
export const favouriteSlice = createSlice({
  initialState,
  name: "favourites",
  reducers: {
    default: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(addFavourite.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(removeFavourite.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item !== action.payload);
    });
  },
});
export default favouriteSlice.reducer;
export const favouriteSelector = (state: RootState) => state.favourites;
