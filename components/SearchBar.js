import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useSpotify from "../hooks/useSpotify";
import { recentSearch } from "../slices/recentSearchSlice";

const SearchBar = () => {
  const spotifyApi = useSpotify();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
    console.log(search);
    dispatch(recentSearch(search));
  };

  return (
    <Wrapper onSubmit={submitHandler} value={search}>
      <input
        type="text"
        placeholder="What do you want to listen to?"
        onChange={(e) => setSearch(e.target.value)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  input {
    height: 2.5rem;
    border-radius: 20px;
    outline: none;
    border: none;
    padding: 1rem;

    width: 150%;

    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
`;
export default SearchBar;