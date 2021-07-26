import { useState, FC } from "react";
import { PageWrapper, Center, Right } from "../../library/PageWrapper";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px;
  align-items: stretch;
`;

const StyledSearchInput = styled.input`
  border: none;
  padding: 8px;
  padding-left: 40px;
  flex: 1;
  border-radius: 16px;
  font-size: 16px;
  color: var(--OBSIDIAN);

  &::placeholder {
    color: var(--BATTLESHIP);
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 6px;
  left: 12px;
  font-size: 20px;
  color: var(--BATTLESHIP);
  pointer-events: none;
`;

const SearchInput: FC<{ search: string; setSearch: (value: string) => void }> =
  ({ search, setSearch }) => {
    return (
      <SearchInputWrapper>
        <SearchIcon icon={faSearch} />
        <StyledSearchInput
          placeholder="Find a recipe"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchInputWrapper>
    );
  };

const CtaWellWrapper = styled.div<{
  type: "PRIMARY" | "SECONDARY" | "TERTIARY";
}>`
  background: var(--${(props) => props.type});
  padding: 24px;
  margin: 12px 0;
  border-radius: 25px / 15px;
`;
const CtaWellBody = styled.p`
  color: var(--OLAF);
  margin: 8px;
`;
const CtaWellTitle = styled.h3`
  color: var(--OLAF);
  margin: 0;
  margin: 8px;
`;

const CtaWell: FC<{
  title: string;
  body: string;
  type: "PRIMARY" | "SECONDARY" | "TERTIARY";
}> = ({ title, body, type }) => {
  return (
    <CtaWellWrapper type={type}>
      <CtaWellTitle>{title}</CtaWellTitle>
      <CtaWellBody>{body}</CtaWellBody>
    </CtaWellWrapper>
  );
};

const AddYourOwn = () => {
  return (
    <CtaWell
      type="PRIMARY"
      title="Add your own recipe"
      body="Create your own recipes to customize"
    />
  );
};

const CenterContent = () => {
  const [search, setSearch] = useState("");

  return (
    <CenterWrapper>
      <SearchInput search={search} setSearch={setSearch} />
      <AddYourOwn />
    </CenterWrapper>
  );
};

export const RecipesPage = () => {
  return (
    <PageWrapper>
      <Center>
        <CenterContent />
      </Center>
      <Right>Right</Right>
    </PageWrapper>
  );
};
