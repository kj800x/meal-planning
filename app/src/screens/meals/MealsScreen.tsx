import React from 'react';
import styled from 'styled-components/native';
import { DateHeader } from '../../library/DateHeader';
import { MealPlan, ScheduledMeal, usePlanByDateQuery } from '../../generated/graphql';
import { ErrorDisplay } from '../../library/ErrorDisplay';
import { Loading } from '../../library/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/core';

const RootView = styled.View`
  flex: 1;
`;
const RootScrollView = styled.ScrollView`
  padding: 6px 0;
`;
const RootMealPreview = styled.TouchableOpacity`
  height: 80px;
  margin: 6px 12px;
  border-radius: 20px;
  flex-direction: row;
  border: 1px solid black;
  overflow: hidden;
`;

const MealImage = styled.Image`
  width: 120px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;
const MealDetails = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 4px;
`;
const MealTitle = styled.Text`
  font-size: 16px;
`;
const MealFlavorText = styled.Text`
  font-size: 12px;
`;
const HeaderText = styled.Text`
  font-size: 20px;
  margin: 10px 16px 0;
`;

const MealPreview = ({ meal, completed = false }: { meal: ScheduledMeal; completed?: boolean }) => {
  return (
    <RootMealPreview>
      <MealImage source={{ uri: 'http://10.60.1.3/meals/assets' + meal.recipe.image }} />
      <MealDetails>
        <MealTitle numberOfLines={1}>{meal.recipe.title}</MealTitle>
        <MealFlavorText numberOfLines={3}>{meal.recipe.description}</MealFlavorText>
      </MealDetails>
    </RootMealPreview>
  );
};

const CookbookButtonButton = styled.TouchableOpacity`
  margin: 2px 8px 8px;
  padding: 8px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const CookbookWrapper = styled.View`
  margin: 8px;
  padding-top: 4px;
  border-top-width: 1px
  border-top-color: black;
  margin-top: 4px;
`;
const CookbookButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-left: 12px;
`;
const CookbookButton = () => {
  const navigator = useNavigation();

  return (
    <CookbookWrapper>
      <CookbookButtonButton
        onPress={() => {
          navigator.navigate('Cookbook');
        }}
      >
        <FontAwesomeIcon size={24} icon={faBookOpen} />
        <CookbookButtonText>Cookbook</CookbookButtonText>
      </CookbookButtonButton>
    </CookbookWrapper>
  );
};

// const AddAMealButtonButton = styled.TouchableOpacity`
//   margin: 2px 8px 8px;
//   padding: 8px;
//   border: 2px solid green
//   border-radius: 80px;
// `;
// const AddAMealButtonText = styled.Text`
//   font-size: 20px;
//   text-align: center;
// `;

// const AddAMealButton = () => {
//   return (
//     <AddAMealButtonButton>
//       <AddAMealButtonText>Add a meal</AddAMealButtonText>
//     </AddAMealButtonButton>
//   );
// };

const MealsList = ({ plan }: { plan: MealPlan }) => {
  return (
    <RootScrollView>
      <HeaderText>Up Next:</HeaderText>
      {plan.meals.map(meal => (
        <MealPreview meal={meal} key={meal.id} />
      ))}
      <HeaderText>Completed:</HeaderText>
      {plan.meals.map(meal => (
        <MealPreview meal={meal} key={meal.id} completed={true} />
      ))}
      {/* <AddAMealButton /> */}
      <CookbookButton />
    </RootScrollView>
  );
};

const ZeroStateWrapper = styled.View`
  align-items: center;
  margin: 20px 0;
`;
const ZeroStateText = styled.Text`
  font-size: 20px;
`;

const ZeroState = () => {
  return (
    <ZeroStateWrapper>
      <ZeroStateText>No meals planned for these dates</ZeroStateText>
    </ZeroStateWrapper>
  );
};

export const MealsScreen = () => {
  const { data, loading, error } = usePlanByDateQuery({ variables: { date: 1616299200001 } });

  if (error) {
    return (
      <RootView>
        <ErrorDisplay error={error} />
      </RootView>
    );
  }

  if (loading) {
    return (
      <RootView>
        <Loading />
      </RootView>
    );
  }

  if (!data.planByDate) {
    return (
      <RootView>
        <DateHeader start={1000 * 60 * 60 * 24 * 2} end={1000 * 60 * 60 * 24 * 7} onReselect={() => {}} />
        <ZeroState />
        {/* <AddAMealButton /> */}
        <CookbookButton />
      </RootView>
    );
  }

  return (
    <RootView>
      <DateHeader start={1000 * 60 * 60 * 24 * 2} end={1000 * 60 * 60 * 24 * 7} onReselect={() => {}} />
      <MealsList plan={data.planByDate as MealPlan} />
    </RootView>
  );
};
