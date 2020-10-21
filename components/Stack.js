import styled from "styled-components";

const Stack = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: calc(var(--rhythm) * ${(props) => props.space});
  }
`;

const StackComp = ({ space = 1, children, ...others }) => {
  return (
    <Stack space={space} {...others}>
      {children}
    </Stack>
  );
};

export default StackComp;
