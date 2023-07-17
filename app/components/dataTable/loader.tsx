import { Skeleton, Stack } from "@chakra-ui/react";

const TableLoader = () => {
  return (
    <Stack paddingTop={5} spacing={2}>
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
    </Stack>
  );
};

export default TableLoader;
