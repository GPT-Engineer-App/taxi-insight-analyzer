import React, { useState } from "react";
import { Box, Button, Container, Heading, Text, VStack, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaTaxi, FaChartLine } from "react-icons/fa";

const Index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock API call to fetch taxi company data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace this URL with the actual endpoint
      const response = await fetch("https://api.yourtaxicompany.com/data");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      // Here you would typically run your AI analysis on the result
      // For example, predict demand, analyze peak hours, etc.
      setData(result);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <VStack spacing={4} align="stretch" mt={10}>
        <Heading as="h1" size="xl" textAlign="center">
          Taxi Company Data Analyzer <FaTaxi />
        </Heading>
        <Text textAlign="center">Use AI to analyze your taxi company data and gain insights.</Text>

        <Button leftIcon={<FaChartLine />} colorScheme="teal" onClick={fetchData} isDisabled={loading}>
          {loading ? "Analyzing Data..." : "Analyze Data"}
        </Button>

        {loading && (
          <Box textAlign="center">
            <Spinner />
          </Box>
        )}

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {data && (
          // Here you would render the analysis results using a chart or table
          // For now, we will just display the raw data
          <Box bg="gray.100" p={4} borderRadius="md">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
