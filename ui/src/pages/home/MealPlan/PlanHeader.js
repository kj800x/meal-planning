import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Switch } from "../../../library/Switch";

const HeaderWrapper = styled.div`
  display: flex;
  padding: 8px;
  align-items: space-between;
  justify-content: space-between;
  font-weight: 600;
  border-bottom: 2px solid blue;
`;

const ShoppingListLink = styled(Link)`
  margin-left: 8px;
`;

const format = (date) =>
  new Date(date).toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const PlanHeader = ({ mealPlan, setEnableDates, enableDates }) => (
  <HeaderWrapper>
    <span>
      {format(mealPlan.start)} - {format(mealPlan.end)}
      <ShoppingListLink to={`/plan/${mealPlan.id}/shopping-list`}>
        <FontAwesomeIcon icon={faClipboardList} />
      </ShoppingListLink>
    </span>
    <span>
      Use dates: <Switch enabled={enableDates} onChange={setEnableDates} />
    </span>
  </HeaderWrapper>
);
