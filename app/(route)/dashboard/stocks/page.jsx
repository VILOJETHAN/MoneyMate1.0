/*
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const popularStocks = [
  "AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "META",
  "NVDA", "NFLX", "DIS", "BABA", "V", "JPM", "PYPL", "ADBE", "INTC", "CSCO"
];

// Helper delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = [];
        for (const symbol of popularStocks) {
          const response = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d0op4b1r01qsib2e2f7gd0op4b1r01qsib2e2f80`
          );
          results.push({ symbol, ...response.data });
          await delay(1000); // 1 second delay between calls to prevent 429
        }
        setData(results);
        setError(null); // Clear error if successful
      } catch (err) {
        setError("Failed to fetch stock data");
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold">Stock Market Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((stock) => {
          const margin = stock.c * 0.05; // 5% margin around current price
          return (
            <Card key={stock.symbol} className="shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle>{stock.symbol}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Current Price:</strong> ${stock.c}</p>
                <p><strong>Day's High:</strong> ${stock.h} | <strong>Day's Low:</strong> ${stock.l}</p>
                <p><strong>Opening Price:</strong> ${stock.o} | <strong>Previous Close:</strong> ${stock.pc}</p>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart
                    data={[
                      { label: "Previous Close", value: stock.pc },
                      { label: "Open", value: stock.o },
                      { label: "Low", value: stock.l },
                      { label: "High", value: stock.h },
                      { label: "Current", value: stock.c },
                    ]}
                  >
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis
                      domain={[stock.c - margin, stock.c + margin]}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.toFixed(2)}
                    />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0f172a"
                      strokeWidth={2}
                      dot={{ r: 4, stroke: "#0f172a", strokeWidth: 2, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;

*/

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const popularStocks = [
  "AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "META",
  "NVDA", "NFLX", "DIS", "BABA", "V", "JPM", "PYPL", "ADBE", "INTC", "CSCO"
];

// Delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch single stock data with retries on 429
const fetchStockWithRetry = async (symbol, retries = 3, delayMs = 1000) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d0op4b1r01qsib2e2f7gd0op4b1r01qsib2e2f80`
    );
    return { symbol, ...response.data };
  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      console.warn(`Rate limit hit for ${symbol}, retrying in ${delayMs}ms...`);
      await delay(delayMs);
      return fetchStockWithRetry(symbol, retries - 1, delayMs * 2); // exponential backoff
    }
    throw error;
  }
};

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const batchSize = 2; // smaller batch size
        const results = [];

        for (let i = 0; i < popularStocks.length; i += batchSize) {
          const batch = popularStocks.slice(i, i + batchSize);

          // Fetch all stocks in batch with retry logic
          const batchResults = await Promise.all(
            batch.map((symbol) => fetchStockWithRetry(symbol))
          );

          results.push(...batchResults);

          if (i + batchSize < popularStocks.length) {
            await delay(2000); // 2 seconds delay between batches
          }
        }

        setData(results);
        setError(null);
      } catch (err) {
        setError("Failed to fetch stock data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading stocks data...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold">Stock Market Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((stock) => {
          const margin = stock.c * 0.05;
          return (
            <Card key={stock.symbol} className="shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle>{stock.symbol}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Current Price:</strong> ${stock.c}</p>
                <p><strong>Day's High:</strong> ${stock.h} | <strong>Day's Low:</strong> ${stock.l}</p>
                <p><strong>Opening Price:</strong> ${stock.o} | <strong>Previous Close:</strong> ${stock.pc}</p>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart
                    data={[
                      { label: "Previous Close", value: stock.pc },
                      { label: "Open", value: stock.o },
                      { label: "Low", value: stock.l },
                      { label: "High", value: stock.h },
                      { label: "Current", value: stock.c },
                    ]}
                  >
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis
                      domain={[stock.c - margin, stock.c + margin]}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.toFixed(2)}
                    />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0f172a"
                      strokeWidth={2}
                      dot={{ r: 4, stroke: "#0f172a", strokeWidth: 2, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
