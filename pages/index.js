import styled from "styled-components";

import Image from "../public/hero-image.svg";

import Stack from "../components/Stack";
import TableItem from "../components/TableItem";

const Container = styled.main`
  padding-left: calc(var(--rhythm) * 2);
  padding-right: calc(var(--rhythm) * 2);
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
  z-index: 1;
  height: 200vh;
  background-color: var(--color-element);
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: calc(var(--rhythm) * 2);
`;

const Toolbar = styled.div`
  height: 80px;
  border-bottom: 3px solid var(--color-grey);
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

const books = [
  {
    title:
      "Interplanetary Huntress: A Science Fiction Classic (The Adventures of Gerry Carlyle Book 1)",
    author: "Arthur K. Barnes",
    genre: "Science Fiction & Fantasy",
    rating: "4.31",
    numReviews: "1322",
  },
  {
    title:
      "Pilot in Command: Strategic Action Plan for Reducing Pilot Error (Practical Flying)",
    author: "Paul A. Craig",
    genre: "Engineering & Transportation",
    rating: "4.07",
    numReviews: "18923",
  },
  {
    title:
      "The McKinsey Way: Using the Techniques of the World's Top Strategic Consultants to Help You and Your Business",
    author: "Ethan M. Rasiel",
    genre: "Business & Money",
    rating: "3.78",
    numReviews: "456",
  },
  {
    title:
      "Interplanetary Huntress: A Science Fiction Classic (The Adventures of Gerry Carlyle Book 1)",
    author: "Arthur K. Barnes",
    genre: "Science Fiction & Fantasy",
    rating: "4.31",
    numReviews: "37",
  },
  {
    title:
      "Pilot in Command: Strategic Action Plan for Reducing Pilot Error (Practical Flying)",
    author: "Paul A. Craig",
    genre: "Engineering & Transportation",
    rating: "4.07",
    numReviews: "94",
  },
  {
    title:
      "The McKinsey Way: Using the Techniques of the World's Top Strategic Consultants to Help You and Your Business",
    author: "Ethan M. Rasiel",
    genre: "Business & Money",
    rating: "3.78",
    numReviews: "389",
  },
];

const books2 = [
  {
    title: "Gold Coffin Murder Case",
    author: "George F. Worts",
    img:
      "http://ecx.images-amazon.com/images/I/2136NBNV5FL._BO2,204,203,200_PIsitb-sticker-v3-xsmall,TopRight,2,-18_SX278_SY278_PIkin4,BottomRight,1,22_AA300_SH20_OU01_.jpg",
    genre: "Mystery & Suspense",
    reviews: "4.31",
  },
];

export default function Home() {
  return (
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
        <Toolbar></Toolbar>
        <Table>
          {books.map((book, idx) => (
            <TableItem even={idx % 2 === 0} {...book} />
          ))}
        </Table>
      </Content>
    </Container>
  );
}
