"use client";

import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IProp } from "./types";

export default function DataTable({
  caption = "DataTable",
  sortable = false,
  pagination = false,
  colDefinition,
  data,
}: IProp) {
  const [paginationWindow, setPaginationWindow] = useState(
    pagination === false ? data.length : 10
  );
  const [dataForGrid, setDataForGrid] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);

  useEffect(() => {
    setTotalPageCount(Math.floor(data.length / paginationWindow));
    let temp = data.slice(
      currentPage * paginationWindow,
      currentPage * paginationWindow + paginationWindow
    );
    setDataForGrid(temp);
  }, [data, paginationWindow, currentPage]);

  return (
    <Box m="5">
      <Heading fontSize="2xl">{caption}</Heading>
      <TableContainer mt="5">
        <Table variant="striped" colorScheme="blackAlpha">
          <TableCaption placement="bottom">{caption}</TableCaption>
          <Thead>
            <Tr>
              {colDefinition.map((col, idx) => (
                <Th key={`${col.header} + ${idx}`}>{col.header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {dataForGrid.map((d, idx) => (
              <Tr key={`${idx}`}>
                {colDefinition.map((r, ind) => (
                  <Td key={ind}>{r.render({ value: d[r.ref], data: d })}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          {pagination && (
            <Tfoot>
              <Tr>
                <Th>
                  <Flex alignItems="center" justifyContent="center" gap="3">
                    <IconButton
                      aria-label="previous"
                      icon={<Icon as={HiChevronLeft} fontSize="lg" />}
                      variant="ghost"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      isDisabled={currentPage === 0}
                    />
                    <Text fontSize="md">{currentPage + 1}</Text>
                    <IconButton
                      aria-label="next"
                      icon={<Icon as={HiChevronRight} fontSize="lg" />}
                      variant="ghost"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      isDisabled={currentPage === totalPageCount}
                    />
                  </Flex>
                </Th>
              </Tr>
            </Tfoot>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
