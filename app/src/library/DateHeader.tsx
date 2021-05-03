import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View<{ elevateSelf: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  ${({ elevateSelf }) =>
    elevateSelf
      ? `
      elevation: 4
  `
      : `
      position: relative;
      padding-top: 8px
      z-index: 10000;
  `}
  background: white;
`;
const DateText = styled.Text`
  font-size: 24px;
`;
const CalendarButton = styled.TouchableOpacity``;
const CalendarIcon = styled.View`
  background: skyblue;
  padding: 6px;
  border-radius: 20px;
`;

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type DateLike = number | Date;

const getDateText = (start: DateLike, end: DateLike) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const endMonth = startDate.getMonth() !== endDate.getMonth() ? monthNames[endDate.getMonth()] + ' ' : '';

  return `${monthNames[startDate.getMonth()]} ${startDate.getDate()} - ${endMonth}${endDate.getDate()}`;
};

export const DateHeader: FC<{
  start: number;
  end: number;
  elevateSelf?: boolean;
  onReselect: (newDate: number) => void;
}> = ({ start, end, onReselect, elevateSelf = true }) => {
  return (
    <Wrapper elevateSelf={elevateSelf}>
      <DateText>{getDateText(start, end)}</DateText>
      <CalendarButton onPress={() => onReselect(20000)}>
        <CalendarIcon>
          <FontAwesomeIcon color="white" size={16} icon={faCalendar} />
        </CalendarIcon>
      </CalendarButton>
    </Wrapper>
  );
};
