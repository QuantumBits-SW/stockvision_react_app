import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import { openConnection, subscribe, unsubscribe } from '../../services/stockService';
import { fetchIntradayData, checkMarketStatus } from '../../services/stockService';
import { Card, CardContent, Button, TextField, MenuItem, CircularProgress, Box, FormControlLabel, Switch, Typography } from '@mui/material';
import HttpsIcon from '@mui/icons-material/Https';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const intervals = [5, 30, 60, 180, 300]; 

const RealTrades = ({ symbol }) => {
  const [interval, setInterval] = useState(5); // Default: 5min
  const [ohlc, setOhlc] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [socket, setSocket] = useState(null);
  const [showLineChart, setShowLineChart] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [marketClosed, setMarketClosed] = useState(false);
  const [ohlcHistory, setOhlcHistory] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch intraday data and populate the chart
  useEffect(() => {
    const loadIntradayData = async () => {
      setIsLoading(true);
      if (!symbol) return;
      const isMarketOpen = await checkMarketStatus();
      if (!isMarketOpen) {
        setMarketClosed(true);
        setIsLoading(false);
        return;
      }
      const data = await fetchIntradayData(symbol);
      const tempOhlc = [];
      const tempVolume = [];
      const tempHistory = {};

      data.forEach((c) => {
        const timestamp = new Date(c.time).getTime();
        tempOhlc.push({
          x: new Date(timestamp),
          y: [c.open, c.high, c.low, c.close],
        });
        tempVolume.push({ x: new Date(timestamp), y: c.volume });

        tempHistory[timestamp] = {
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
          volume: c.volume,
        };
      });

      setOhlc(tempOhlc);
      setVolumeData(tempVolume);
      setOhlcHistory(tempHistory);
      setMarketClosed(!checkMarketStatus());
      setIsLoading(false);
    };

    loadIntradayData();
  }, [symbol]);

  // Process real-time trade data and update last candle
  const processTradeData = (trades) => {
    const now = new Date().getTime();
    const bucketTime = Math.floor(now / (interval * 60 * 1000)) * (interval * 60 * 1000);

    setOhlcHistory((prevHistory) => {
      const updatedHistory = { ...prevHistory };
      trades.forEach(({ p, v }) => {
        if (!updatedHistory[bucketTime]) {
          updatedHistory[bucketTime] = { open: p, high: p, low: p, close: p, volume: v };
        } else {
          const candle = updatedHistory[bucketTime];
          candle.high = Math.max(candle.high, p);
          candle.low = Math.min(candle.low, p);
          candle.close = p;
          candle.volume += v;
        }
      });
      return updatedHistory;
    });

    setLineData((prev) => [...prev.slice(-100), { x: new Date(now), y: trades[trades.length - 1]?.p ?? 0 }]);
    setVolumeData((prev) => [...prev.slice(-100), { x: new Date(now), y: trades[trades.length - 1]?.v ?? 0 }]);
  };

  // Update OHLC chart from history
  useEffect(() => {
    const formattedOhlc = Object.entries(ohlcHistory).map(([time, { open, high, low, close }]) => ({
      x: new Date(parseInt(time)),
      y: [open, high, low, close],
    }));
    setOhlc(formattedOhlc);
  }, [ohlcHistory]);

  // Handle WebSocket Subscription
  const handleSubscribe = () => {
    setIsLoading(true);
    setOhlcHistory({});
    setLineData([]);
    setVolumeData([]);

    const ws = openConnection();
    setSocket(ws);
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.data) {
        processTradeData(response.data);
      }
    };
    ws.onerror = () => console.error("WebSocket error");
    ws.onclose = () => console.log("WebSocket closed");

    subscribe(ws, symbol);
  };

  // Handle WebSocket Unsubscription
  const handleUnsubscribe = () => {
    if (socket) {
      unsubscribe(socket, symbol);
      socket.close();
      setSocket(null);
    }
  };

  return (
    isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}><CircularProgress /></Box> :
    <Card sx={{ p: 2, maxWidth: 900, margin: 'auto', position: 'relative' }}>
        {marketClosed && (
          <Box sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
          }}>
            <HttpsIcon sx={{ fontSize: 100, color: 'white' }} />
            <Typography variant="h4" color="white">Market Closed</Typography>
          </Box>
        )}
      <CardContent>
        <TextField select value={interval} onChange={(e) => setInterval(Number(e.target.value))} label="Interval" fullWidth>
          {intervals.map((int) => (
            <MenuItem key={int} value={int}>{int === 60 ? '1min' : `${int}sec`}</MenuItem>
          ))}
        </TextField>
        <FormControlLabel control={<Switch checked={showLineChart} onChange={() => setShowLineChart(!showLineChart)} />} label="Show Line Chart" />
        <FormControlLabel control={<Switch checked={showVolume} onChange={() => setShowVolume(!showVolume)} />} label="Show Volume" />

        <Box sx={{ mt: 2, height: 'fit-content', position: 'relative' }}>
          <CanvasJSChart options={{
            theme: "light2",
            axisX: { title: "Time", valueFormatString: "HH:mm" },
            axisY: { title: "Price" },
            data: [
              { type: "candlestick", dataPoints: ohlc, risingColor: "green", fallingColor: "red" },
              ...(showLineChart ? [{ type: "line", dataPoints: lineData, color: "blue" }] : []),
            ]
          }}/>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RealTrades;
