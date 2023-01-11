import Link from "next/link";
import React from "react";
import styled from "styled-components";

const FooterLinks = () => {
  return (
    <Wrapper className="d-none d-lg-flex">
      <div className="links">
        <Link href="/">legal</Link>
        <Link href="/">privacy center</Link>
        <Link href="/">privacy policy</Link>
        <Link href="/">cookies</Link>
        <Link href="/">about ads</Link>
      </div>

      <Link href="/">2023 Danztee</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  flex-wrap: wrap;
  gap: 3rem;
  margin-top: 3rem;

  @media screen and(max-width: 992px) {
    padding: 2.5rem 2rem;
  }

  .links {
    display: flex;
    gap: 1.5rem;
    text-transform: capitalize;

    a:hover {
      color: white;
    }
  }
`;
export default FooterLinks;
