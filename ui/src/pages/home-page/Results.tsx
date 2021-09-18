import { FC } from "react";
import {
  Metric,
  Report,
  Survey,
  useAllDataQuery,
} from "../../generated/graphql";
import styled from "styled-components";
import { MetricResult, MetricResultWrapper } from "./MetricResult";
import { SurveyResult } from "./SurveyResult";
import { ReportResult } from "./ReportResult";
import { Loading } from "../../library/Loading";
import { ErrorDisplay } from "../../library/ErrorDisplay";

const ResultWrapper = styled.div`
  background: #eaf2e0;
`;

const NoResultWrapper = styled(MetricResultWrapper)`
  text-align: center;
  display: block;
  font-style: italic;
`;

export const Results: FC<{ query: string }> = ({ query }) => {
  const { data, loading, error } = useAllDataQuery();

  if (loading) {
    return (
      <ResultWrapper>
        <Loading />
      </ResultWrapper>
    );
  }

  if (error) {
    return (
      <ResultWrapper>
        <ErrorDisplay error={error} />
      </ResultWrapper>
    );
  }

  const {
    allMetrics: metrics,
    allReports: reports,
    allSurveys: surveys,
  } = data!;

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(query.toLowerCase())
  );
  const filteredMetrics = metrics.filter((metric) =>
    metric.prompt.toLowerCase().includes(query.toLowerCase())
  );
  const filteredSurveys = surveys.filter((survey) =>
    survey.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!query) {
    return null;
  }

  return (
    <ResultWrapper>
      {filteredMetrics.map((metric) => (
        <MetricResult key={metric.id} metric={metric as Metric} />
      ))}
      {filteredSurveys.map((survey) => (
        <SurveyResult key={survey.id} survey={survey as Survey} />
      ))}
      {filteredReports.map((report) => (
        <ReportResult key={report.id} report={report as Report} />
      ))}
      {filteredMetrics.length === 0 &&
      filteredSurveys.length === 0 &&
      filteredReports.length === 0 ? (
        <NoResultWrapper>No Results</NoResultWrapper>
      ) : null}
    </ResultWrapper>
  );
};
