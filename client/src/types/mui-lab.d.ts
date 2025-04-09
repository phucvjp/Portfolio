declare module "@mui/lab" {
  import * as React from "react";

  export interface TimelineProps {
    children?: React.ReactNode;
    position?: "alternate" | "left" | "right";
    className?: string;
  }

  export const Timeline: React.FC<TimelineProps>;

  export interface TimelineItemProps {
    children?: React.ReactNode;
    className?: string;
  }

  export const TimelineItem: React.FC<TimelineItemProps>;

  export interface TimelineSeparatorProps {
    children?: React.ReactNode;
    className?: string;
  }

  export const TimelineSeparator: React.FC<TimelineSeparatorProps>;

  export interface TimelineConnectorProps {
    className?: string;
  }

  export const TimelineConnector: React.FC<TimelineConnectorProps>;

  export interface TimelineContentProps {
    children?: React.ReactNode;
    className?: string;
  }

  export const TimelineContent: React.FC<TimelineContentProps>;

  export interface TimelineDotProps {
    children?: React.ReactNode;
    className?: string;
    color?:
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning"
      | "grey"
      | "inherit";
    variant?: "filled" | "outlined";
  }

  export const TimelineDot: React.FC<TimelineDotProps>;

  export interface TimelineOppositeContentProps {
    children?: React.ReactNode;
    className?: string;
  }

  export const TimelineOppositeContent: React.FC<TimelineOppositeContentProps>;
}
