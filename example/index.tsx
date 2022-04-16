import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useGeolocation from "../src"
import  { Box, Button, ChakraProvider, Flex, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react"

const App = () => {
  const {location,loading,metaInfo, activate, update, watch, unwatch} = useGeolocation({defaultActive: false, onGeolocationChange: (loc, meta) => {console.log(loc, meta)}});
  return (
    <ChakraProvider>
      <Box m="10">
        <Flex direction="column" align="center">
          {
            loading ? (<Flex direction="column" align="center" m="10">
              <div>loading</div>
              <Spinner color='red'/>
            </Flex>
            )
             : (
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Value1</Th>
                    <Th>Value2</Th>
                    <Th>Value3</Th>
                    <Th>Value4</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Th>lat: {location?.latitude ?? "N/A"}</Th>
                    <Th>lng: {location?.longitude ?? "N/A"}</Th>
                    <Th>alt: {location?.altitude ?? "N/A"}</Th>
                  </Tr>
                  <Tr>
                    <Th>accuracy: {metaInfo?.accuracy ?? "N/A"}</Th>
                    <Th>altitudeAccuracy: {metaInfo?.altitudeAccuracy ?? "N/A"}</Th>
                    <Th>heading: {metaInfo?.heading ?? "N/A"}</Th>
                    <Th>speed: {metaInfo?.speed ?? "N/A"}</Th>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            )
          }
          <VStack>
            <Button onClick={activate}>Activate geolocation API</Button>
            <Button onClick={update}>Update location</Button>
            <Button onClick={watch}>Watch location change</Button>
            <Button onClick={unwatch}>Unwatch location change</Button>
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
  // return(<div>hello</div>)
};

ReactDOM.render(<App />, document.getElementById('root'));
