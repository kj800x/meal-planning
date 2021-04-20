import { NavLink } from "react-router-dom";
import styled from "styled-components";

const TabWrapper = styled.div`
  display: flex;
`;

const Tab = styled(NavLink)`
  display: block;
  padding: 6px;
  text-decoration: none;
  border: 2px solid black;
  border-bottom: none;
  margin: 8px;
  margin-bottom: 0;
  border-radius: 8px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-right: 0px;
  color: black;

  &.active {
    color: blue;
  }
`;

export const Tabs = ({ planId }) => {
  return (
    <TabWrapper>
      <Tab to={`/search/${planId}`}>Search</Tab>
      <Tab to={`/meals/${planId}`}>Planned Meals</Tab>
      <Tab to={`/shopping-list/${planId}`}>Shopping List</Tab>
      <Tab to={`/settings/${planId}`}>Settings</Tab>
    </TabWrapper>
  );
};
