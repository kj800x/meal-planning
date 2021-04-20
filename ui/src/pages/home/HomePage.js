import { gql, useQuery } from "@apollo/client";
import { ErrorDisplay } from "../../library/ErrorDisplay";
import { Header } from "../../library/Header";
import { Loading } from "../../library/Loading";
import { PageWrapper } from "../../library/PageWrapper";

const PLANS = gql`
  query {
    mealPlans {
      id
      breakfastSlots
      lunchSlots
      dinnerSlots
      start
      end
      extraIngredients {
        quantity
        unit
        ingredient {
          name
        }
      }
      meals {
        id
        type
        servings
        recipe {
          title
          image
        }
        date
      }
    }
  }
`;

// const CREATE_PLAN = gql`
//   mutation {
//     createPlan {
//       id
//       breakfastSlots
//       lunchSlots
//       dinnerSlots
//       start
//       end
//       extraIngredients {
//         quantity
//         unit
//         ingredient {
//           name
//         }
//       }
//       meals {
//         id
//         type
//         servings
//         recipe {
//           title
//           image
//         }
//         date
//       }
//     }
//   }
// `;

const MealPlan = () => {
  return null;
};

const MealPlans = () => {
  const { data, loading, error } = useQuery(PLANS);
  // const [createPlan] = useMutation(CREATE_PLAN);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div>
      {data.mealPlans.map((plan) => (
        <MealPlan plan={plan} key={plan.id} />
      ))}
    </div>
  );
};

export const HomePage = () => {
  return (
    <>
      <Header />
      <PageWrapper>
        <MealPlans />
      </PageWrapper>
    </>
  );
};
