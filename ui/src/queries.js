import gql from "graphql-tag";

export const ALL_DATA = gql`
  query allData {
    allMetrics {
      type
      prompt
      allowsAdHoc
      id
    }
    allSurveys {
      title
      schedule
      id
    }
    allReports {
      id
      title
      type
      config
    }
  }
`;

export const RECORD_DATAPOINT = gql`
  mutation recordDatapoint($datapoints: [DatapointInput!]!) {
    submitDatapoint(datapoints: $datapoints) {
      id
    }
  }
`;
