"use client";

import React from "react";
import { Badge, Button, Text } from "@chakra-ui/react";
import DataTable from "./components/dataTable";
import { IColDefinition } from "./components/dataTable/types";
import moment from "moment";

async function getData() {
  const res = await fetch("https://tryp-test.free.beeceptor.com/order-history");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  const data = await getData();
  const colDefinition: IColDefinition[] = [
    {
      ref: "timestamp",
      header: "Timestamp",
      sortable: true,
      render: ({ value }: any) => {
        return <Text>{moment(value).fromNow()}</Text>;
      },
    },
    {
      ref: "purchase_id",
      header: "Purchase Id",
      sortable: true,
      render: ({ value }: any) => {
        return <Text>{value}</Text>;
      },
    },
    {
      ref: "mail",
      header: "Mail",
      sortable: true,
      render: ({ value }: any) => {
        return <Text>{value}</Text>;
      },
    },
    {
      ref: "name",
      header: "Name",
      sortable: true,
      render: ({ value }: any) => {
        return <Text>{value}</Text>;
      },
    },
    {
      ref: "source",
      header: "Source",
      sortable: true,
      render: ({ value }: any) => {
        return <Text>{value}</Text>;
      },
    },
    {
      ref: "status",
      header: "Status",
      sortable: true,
      render: ({ value }: any) => {
        return (
          <Badge
            colorScheme={
              value === "paid" ? "green" : value === "failed" ? "red" : "yellow"
            }
          >
            {value}
          </Badge>
        );
      },
    },
    {
      ref: "select",
      header: "Select",
      sortable: false,
      render: ({ data }: any) => {
        return <Button>Select</Button>;
      },
    },
  ];

  return (
    <main>
      <DataTable
        sortable
        pagination
        caption="Bookings"
        colDefinition={colDefinition}
        data={data}
      />
    </main>
  );
};

export default page;
