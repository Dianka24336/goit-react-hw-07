import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./contactsOps";

const initialState = {
  items: [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  // reducers: {

  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })

      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(
          // (item) => item.id !== action.payload.id
          (item) => item.id !== payload
        );
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContact.pending,
          addContact.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContact.rejected,
          addContact.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContact.fulfilled,
          addContact.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectFilter = (state) => state.filters.name;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, selectNameFilter) => {
    return contacts.filter((item) =>
      item.name.toLowerCase().includes(selectNameFilter.toLowerCase())
    );
  }
);

export const contactReducer = slice.reducer;
