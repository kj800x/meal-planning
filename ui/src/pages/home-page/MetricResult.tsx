import { FC, useState } from "react";
import { Metric, useRecordDatapointMutation } from "../../generated/graphql";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt as faCommentAltHollow } from "@fortawesome/free-regular-svg-icons";

export const MetricResultWrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const DateInput = styled.input`
  margin-left: 12px;
  width: 108px;
  &::-webkit-calendar-picker-indicator {
    margin-left: 0px;
  }
`;
const SubmitButton = styled.button`
  margin-left: 4px;
`;

const MetricResultHeader = styled.div``;
const MetricResultBody = styled.div`
  @media only screen and (max-width: 600px) {
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    & > * {
      margin: 4px;
    }
  }
`;

const CommentIcon = styled(FontAwesomeIcon)`
  color: #bc8628;
`;

const EventMetric: FC<{ metric: Metric }> = ({ metric }) => {
  const [comment, setComment] = useState<string | undefined>();
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  console.log(date);

  const [submit] = useRecordDatapointMutation({
    variables: {
      datapoints: [
        {
          metricId: metric.id,
          value: "yes",
          date: new Date(date).getTime(),
          comment: comment,
        },
      ],
    },
    onCompleted: () => {
      alert("Done!");
    },
  });

  return (
    <MetricResultWrapper>
      <MetricResultHeader>Log a {metric.prompt}</MetricResultHeader>
      <MetricResultBody>
        <CommentIcon
          icon={!comment ? faCommentAltHollow : faCommentAlt}
          onClick={() => {
            const c = prompt("Enter a comment");
            setComment(c ? c : undefined);
          }}
        />
        <DateInput
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <SubmitButton
          onClick={() => {
            submit();
          }}
        >
          Record
        </SubmitButton>
      </MetricResultBody>
    </MetricResultWrapper>
  );
};

export const MetricResult: FC<{ metric: Metric }> = ({ metric }) => {
  if (metric.type === "event") {
    return <EventMetric metric={metric} />;
  }

  return (
    <MetricResultWrapper>
      {metric.prompt} {metric.type}
    </MetricResultWrapper>
  );
};
