import React from "react";

export type IColDefinition = {
  ref: string;
  header: string;
  sortable?: boolean;
  render(prop: { value?: any; data?: any }): React.JSX.Element;
};

export type IProp = {
  caption?: string;
  sortable?: boolean;
  pagination?: boolean;
  colDefinition: IColDefinition[];
  data: any[];
};
