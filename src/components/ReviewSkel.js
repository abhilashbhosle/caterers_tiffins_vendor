import React from 'react';
import {
  Skeleton,
  VStack,
  HStack,
  Center,
  NativeBaseProvider,
} from 'native-base';

const Example = () => {
  return (
    <Center w="100%">
      <HStack
        w="95%"
        maxW="400"
        borderWidth="1"
        space={8}
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="4">
        {/* <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" /> */}
        <VStack flex="3" space="4">
          {/* <Skeleton startColor="amber.300" /> */}
          <HStack space="2" alignItems="center">
            <Skeleton size="5" rounded="full" />
			<Skeleton.Text size="5" w="80%"/>
          </HStack>
        </VStack>
      </HStack>
    </Center>
  );
};

export default ReviewSkell=() => {
  return (
    <NativeBaseProvider>
      <Center px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
