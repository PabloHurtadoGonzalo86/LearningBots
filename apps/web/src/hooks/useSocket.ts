import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Bot, Improvement, Message } from '../types';

const SOCKET_URL = import.meta.env.VITE_API_URL || '';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [bots, setBots] = useState<Bot[]>([]);
  const [improvements, setImprovements] = useState<Improvement[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('bots:state', (data: Bot[]) => {
      setBots(data);
    });

    socket.on('bot:update', (data: Bot) => {
      setBots((prev) => prev.map((b) => (b.name === data.name ? data : b)));
    });

    socket.on('improvements:update', (data: Improvement[]) => {
      setImprovements(data);
    });

    socket.on('message:new', (data: Message) => {
      setMessages((prev) => [data, ...prev].slice(0, 100));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const subscribeToBot = useCallback((botName: string) => {
    socketRef.current?.emit('subscribe:bot', botName);
  }, []);

  const unsubscribeFromBot = useCallback((botName: string) => {
    socketRef.current?.emit('unsubscribe:bot', botName);
  }, []);

  const requestImprovements = useCallback(() => {
    socketRef.current?.emit('get:improvements');
  }, []);

  return {
    isConnected,
    bots,
    improvements,
    messages,
    subscribeToBot,
    unsubscribeFromBot,
    requestImprovements,
  };
}
