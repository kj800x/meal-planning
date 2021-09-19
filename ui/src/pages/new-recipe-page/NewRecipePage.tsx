import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useCreateRecipeMutation } from "../../generated/graphql";
import { Button } from "../../library/Button";
import { Input } from "../../library/Input";

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  margin: 0;
  margin-bottom: 8px;
  text-align: center;
  border-bottom: 1px solid black;
  width: 200px;
  align-self: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px 0;

  input {
    margin-left: 8px;
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const NewRecipePage = () => {
  const [title, setTitle] = useState<string>("");
  const history = useHistory();

  const [create] = useCreateRecipeMutation({
    variables: { title },
    onCompleted: (data) => {
      history.push(`/recipe/${data.createRecipe.id}`);
    },
  });

  return (
    <Wrapper>
      <Header>New Recipe</Header>
      <Label>
        Title: <Input value={title} onChange={setTitle} />
      </Label>
      <SubmitWrapper>
        <Button disabled={!title} onClick={create}>
          Create
        </Button>
      </SubmitWrapper>
    </Wrapper>
  );
};
