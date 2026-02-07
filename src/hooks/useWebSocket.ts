import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { WS_URL } from '@/utils/constants';
import { useMetricsStore } from '@/stores/metricsStore';
import { MetricUpdate } from '@/types';

export const useWebSocket = (): {
  socket: Socket | null;
  isConnected: boolean;
} => {
  const socketRef = useRef<Socket | null>(null);
  const { setCurrentMetric, addHistoricalMetric, setConnectionStatus } = useMetricsStore();

  const handleConnect = useCallback(() => {
    console.log('WebSocket connected');
    setConnectionStatus({ connected: true });
  }, [setConnectionStatus]);

  const handleDisconnect = useCallback(() => {
    console.log('WebSocket disconnected');
    setConnectionStatus({ connected: false });
  }, [setConnectionStatus]);

  const handleMetricsUpdate = useCallback(
    (data: MetricUpdate) => {
      setCurrentMetric(data.metric);
      addHistoricalMetric(data.metric);
    },
    [setCurrentMetric, addHistoricalMetric]
  );

  const handlePing = useCallback(() => {
    const startTime = Date.now();
    socketRef.current?.emit('pong', () => {
      const latency = Date.now() - startTime;
      setConnectionStatus({ latency });
    });
  }, [setConnectionStatus]);

  useEffect(() => {
    socketRef.current = io(WS_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    const socket = socketRef.current;

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('metrics:update', handleMetricsUpdate);
    socket.on('ping', handlePing);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('metrics:update', handleMetricsUpdate);
      socket.off('ping', handlePing);
      socket.close();
    };
  }, [handleConnect, handleDisconnect, handleMetricsUpdate, handlePing]);

  return {
    socket: socketRef.current,
    isConnected: socketRef.current?.connected || false,
  };
};
