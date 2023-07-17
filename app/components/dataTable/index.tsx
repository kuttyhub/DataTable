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
import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import { IProp } from "./types";
import TableLoader from "./loader";

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

  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState<number>(0);

  useEffect(() => {
    setTotalPageCount(Math.floor(data.length / paginationWindow));
    if (sortColumn === "") {
      setDataForGrid(
        data.slice(
          currentPage * paginationWindow,
          currentPage * paginationWindow + paginationWindow
        )
      );
    } else {
      const temp = [...data].sort((a: any, b: any): number => {
        //ascending
        if (sortType === 1 && a[sortColumn] !== b[sortColumn]) {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        }
        //descending
        if (sortType === -1 && a[sortColumn] !== b[sortColumn]) {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }

        return 0;
      });
      setDataForGrid(
        temp.slice(
          currentPage * paginationWindow,
          currentPage * paginationWindow + paginationWindow
        )
      );
    }
  }, [data, paginationWindow, currentPage, sortColumn, sortType]);

  const handleSort = (colRef: string) => {
    if (sortColumn !== colRef) {
      setSortColumn(colRef);
      setSortType(1);
      return;
    }
    setSortColumn(colRef);
    if (sortType === 0) {
      setSortType(1);
    } else if (sortType === 1) {
      setSortType(-1);
    } else {
      setSortType(0);
      setSortColumn("");
    }
  };

  return (
    <Box m="5">
      <Heading fontSize="2xl">{caption}</Heading>
      {dataForGrid.length === 0 ? (
        <TableLoader />
      ) : (
        <TableContainer mt="5">
          <Table variant="striped" colorScheme="blackAlpha">
            <TableCaption placement="bottom">{caption}</TableCaption>
            <Thead>
              <Tr>
                {colDefinition.map((col, idx) => (
                  <Th
                    key={`${col.header} + ${idx}`}
                    onClick={() => {
                      if (col.sortable && sortable) {
                        handleSort(col.ref);
                      }
                    }}
                    _hover={{
                      cursor: col.sortable ? "pointer" : "",
                    }}
                  >
                    <Flex alignItems="center" gap="3">
                      {col.header}
                      {sortType !== 0 &&
                        col.sortable &&
                        col.ref === sortColumn && (
                          <Flex
                            flexDir="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon
                              as={BiCaretUp}
                              fontSize="xs"
                              mb="-1.5"
                              color={sortType === 1 ? "black" : "gray.400"}
                            />
                            <Icon
                              as={BiCaretDown}
                              fontSize="xs"
                              color={sortType === -1 ? "black" : "gray.400"}
                            />
                          </Flex>
                        )}
                    </Flex>
                  </Th>
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
      )}
    </Box>
  );
}
