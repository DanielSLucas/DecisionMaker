/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import { Flex, Text, Icon, Button, Heading } from '@chakra-ui/react';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import DataUpload from '../../../components/DataUpload';
import { serializedDataState } from '../../../atoms/serializedDataAtom';
import { PageNames } from '..';

type DataProps = {
  goToPage(pageName: PageNames): void;
};

const Data: React.FC<DataProps> = ({ goToPage }) => {
  const serializedData = useRecoilValue(serializedDataState);
  const router = useRouter();

  const handlePrevious = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleNext = useCallback(() => {
    goToPage('priorities');
  }, [goToPage]);

  return (
    <Flex flex="1" justifyContent="center">
      <Flex
        direction="column"
        w="100%"
        borderRadius="md"
        p="2"
        mt="40"
        maxW="xl"
      >
        <Flex as="header" direction="column">
          <Heading as="h2">Dados</Heading>
          <Text mt="2">Insira um arquivo csv no seguinte formato:</Text>
        </Flex>

        <Flex justifyContent="center">
          <Text
            as="pre"
            p="4"
            mt="8"
            bg="gray.50"
            w="fit-content"
            borderRadius="sm"
          >
            ,preco,potencia{'\n'}moto1,10000,250{'\n'}moto2,8500,160
          </Text>
        </Flex>

        <DataUpload />

        <Flex as="footer" mt="8" justifyContent="space-between">
          <Button onClick={handlePrevious}>
            <Icon mr="2" as={FiArrowLeft} h="6" w="6" />
            Voltar
          </Button>

          <Button
            onClick={handleNext}
            disabled={Object.keys(serializedData).length === 0}
          >
            Prioridades
            <Icon ml="2" as={FiArrowRight} h="6" w="6" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Data;