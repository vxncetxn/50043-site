import styled from "styled-components";

import Star from "../public/star.svg";

import Stack from "../components/Stack";

const genreColorMap = {
  "Science Fiction & Fantasy": "#fc8181",
  "Engineering & Transportation": "#f6ad55",
  "Business & Money": "#68d391",
};

const TableItem = styled.div`
  display: flex;
  padding: calc(var(--rhythm) * 0.5) 0;
  font-family: var(--font-primary);
  font-size: var(--s-1);
  color: var(--color-text-light);
  background-color: ${(props) => (props.even ? "#ffffff" : "#f9fafb")};
  cursor: pointer;

  &:hover {
    background-color: #d2f9f3;
  }

  & > * {
    padding-left: var(--rhythm);
  }
`;

const Main = styled(Stack)`
  width: 55%;
  justify-content: center;
`;

const Title = styled.p`
  color: var(--color-text);
`;

const Author = styled.p``;

const Tags = styled.div`
  display: flex;
  align-items: center;
  width: 27.5%;
`;

const Badge = styled.span`
  color: white;
  background-color: ${(props) => props.badgeColor};
  padding: 4px 10px;
  border-radius: 8px;
`;

const Reviews = styled(Stack)`
  justify-content: center;
  width: 17.5%;
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  color: var(--color-text);
`;

const StyledStar = styled(Star)`
  width: 20px;
  margin-left: 5px;
  fill: #f6e05e;
`;

const NumReviews = styled.span``;

const TableItemComp = ({
  even,
  title,
  author,
  genre,
  rating,
  numReviews,
  ...others
}) => {
  return (
    <TableItem even={even} {...others}>
      <Main space={0.25}>
        <Title>{title}</Title>
        <Author>by {author}</Author>
      </Main>
      <Tags>
        <Badge badgeColor={genreColorMap[genre]}>{genre}</Badge>
      </Tags>
      <Reviews space={0.25}>
        <Rating>
          {rating} <StyledStar />
        </Rating>
        <NumReviews>{numReviews} reviews</NumReviews>
      </Reviews>
    </TableItem>
  );
};

export default TableItemComp;
