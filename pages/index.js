import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, usePaginatedQuery, queryCache } from "react-query";
import { useRouter } from "next/router";
import { host } from "../host.js";

import Image from "../public/hero-image.svg";
import SearchSVG from "../public/search.svg";
import StarSVG from "../public/star.svg";
import FilterSVG from "../public/filter.svg";
import PlusSVG from "../public/plus.svg";
import ChevronLeftSVG from "../public/chevron-left.svg";

import Stack from "../components/Stack";

const Container = styled.main`
  padding-left: calc(var(--rhythm) * 2);
  padding-right: calc(var(--rhythm) * 2);
`;

const Portal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
`;

const Modal = styled.div`
  position: relative;
  width: 60%;
  height: 80%;
  display: flex;
  background-color: var(--color-element);
  border-radius: 12px;
`;

const ModalImg = styled.img`
  width: 50%;
`;

const ModalContent = styled(Stack)`
  width: 50%;
`;

const Hero = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(var(--rhythm) * 2) calc(var(--rhythm) * 2) 0
    calc(var(--rhythm) * 2);
  /* border: 1px solid red; */
`;

const HeroContent = styled(Stack)`
  width: 50%;
`;

const Header = styled.h1`
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: var(--s3);
  color: var(--color-title);
  transform: translateX(-5px);
  & > span {
    color: var(--color-accent);
  }
`;

const Subtext = styled.p`
  font-family: var(--font-primary);
  font-size: var(--s0);
  color: var(--color-title);
  line-height: 1.8;
`;

const HeroImage = styled(Image)`
  width: 45%;
  transform: translateY(50px) rotate(4deg);
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  /* z-index: 1; */
  /* height: 200vh; */
  background-color: var(--color-element);
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: calc(var(--rhythm) * 2);
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  border-bottom: 3px solid var(--color-grey);
  padding: 0 40px;

  & > * + * {
    margin-left: 15px;
  }
`;

const Search = styled.input`
  font-family: var(--font-primary);
  font-size: var(--s0);
  width: 100%;
  border-radius: 12px 12px 0 0;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9aafcb;
  }
`;

const Pagi = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-primary);
  font-size: var(--s1);
  color: #9aafcb;
  width: 100px;
  transform: translateY(1px);

  & > * + * {
    margin-left: 5px;
  }
`;

const SearchIcon = styled(SearchSVG)`
  width: 40px;
  stroke: #9aafcb;
  stroke-width: 2px;
  fill: none;
`;

const FilterIcon = styled(FilterSVG)`
  width: 35px;
  stroke: #9aafcb;
  stroke-width: 2px;
  fill: none;
  transform: translateY(2px);
`;

const PlusIcon = styled(PlusSVG)`
  width: 40px;
  stroke: #9aafcb;
  stroke-width: 2px;
  fill: none;
  transform: translateY(2px);
`;

const ChevronLeftIcon = styled(ChevronLeftSVG)`
  width: 28px;
  stroke: #9aafcb;
  stroke-width: 2px;
  fill: none;
  transform: translateY(2px);
`;

const ChevronRightIcon = styled(ChevronLeftIcon)`
  transform: rotate(180deg) translateY(-2px);
`;

const Table = styled.div`
  padding: 50px 20px;
  --auto-grid-min-size: 250px;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
  );
  grid-gap: 20px;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  /* border: 1px solid red; */
`;

const ItemImg = styled.img`
  height: 85%;
  object-fit: contain;
  /* border: 1px solid blue; */
`;

const ItemStars = styled.div`
  display: flex;
  justify-content: center;
  font-family: var(--font-primary);
  font-size: var(--s-1);
  color: var(--color-text);
  /* border: 1px solid green; */
`;

const StarIcon = styled(StarSVG)`
  width: 20px;
  margin: 0 5px 0 2px;
  fill: #f6e05e;
`;

function useURLQuery() {
  const router = useRouter();
  return new URLSearchParams(router.asPath.slice(router.pathname.length));
}

function fetchItems(page) {
  return new Promise(async (resolve) => {
    const fetched = await fetch(
      `http://${host}:3001/api/items?page=${page}`
    ).then((res) => res.json());

    resolve(fetched.data);
  });
}

function fetchCount() {
  return new Promise(async (resolve) => {
    const fetched = await fetch(`http://${host}:3001/api/count`).then((res) =>
      res.json()
    );

    resolve(fetched.data);
  });
}

export default function Home() {
  const pageQuery = parseInt(useURLQuery().get("page"), 10);
  const [page, setPage] = useState(pageQuery ? pageQuery : 1);
  const [portal, setPortal] = useState(false);

  const {
    isLoading: countLoading,
    isError: countError,
    data: count,
  } = useQuery("todos", fetchCount);
  const {
    isLoading: itemsLoading,
    isError: itemsError,
    resolvedData: items,
  } = usePaginatedQuery(["items", page], () => fetchItems(page));

  useEffect(() => {
    const prefetchItems = async () => {
      await queryCache.prefetchQuery(["items", page + 1], () =>
        fetchItems(page + 1)
      );
    };

    prefetchItems();
    history.pushState({}, "", `/?page=${page}`);
  }, [page]);

  useEffect(() => {
    9;
  }, [portal]);

  return (
    <>
      <Container>
        <Hero>
          <HeroContent space={0.5}>
            <Header>
              books<span>.db</span>
            </Header>
            <Subtext>
              This is a database of reviews for books on Amazon's Kindle Store,
              built as part of our final project for SUTD's 50.043 Database and
              Big Data Systems.
            </Subtext>
          </HeroContent>
          <HeroImage />
        </Hero>
        <Content>
          <Toolbar>
            <SearchIcon />
            <Search placeholder="Search by title or author" />
            <Pagi>
              <button onClick={() => setPage(Math.max(1, page - 1))}>
                <ChevronLeftIcon />
              </button>
              <span>{page}</span>
              <button onClick={() => setPage(page + 1)}>
                <ChevronRightIcon />
              </button>
            </Pagi>
            <button>
              <FilterIcon />
            </button>
            <button>
              <PlusIcon />
            </button>
          </Toolbar>
          <Table>
            {itemsLoading ? (
              <div>Loading...</div>
            ) : itemsError ? (
              <div>Error: {error.message}</div>
            ) : (
              items.map((book, idx) => (
                <GridItem>
                  <ItemImg src={book.imUrl} />
                  <ItemStars>
                    {book.num > 0 ? (
                      <>
                        {book.stars} <StarIcon /> ({book.num} Reviews)
                      </>
                    ) : (
                      "No Reviews Yet"
                    )}
                  </ItemStars>
                </GridItem>
              ))
            )}
          </Table>
        </Content>
      </Container>
      {portal ? (
        <Portal>
          <Modal>
            <ModalImg />
          </Modal>
        </Portal>
      ) : null}
    </>
  );
}
