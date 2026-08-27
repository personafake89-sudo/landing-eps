import fs from 'fs';
import path from 'path';

const BLOCKED_IPS_PATH = path.join(process.cwd(), 'src/data/blocked-ips.json');
const LOG_PATH = path.join(process.cwd(), 'src/data/request-log.json');

interface BlockedIPs {
  blocked: string[];
  lastUpdated: string;
}

interface RequestLog {
  ip: string;
  path: string;
  timestamp: string;
  method: string;
}

function loadBlockedIPs(): BlockedIPs {
  try {
    const data = fs.readFileSync(BLOCKED_IPS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { blocked: [], lastUpdated: new Date().toISOString() };
  }
}

export function isIPBlocked(ip: string): boolean {
  const { blocked } = loadBlockedIPs();
  return blocked.includes(ip);
}

export function blockIP(ip: string): void {
  const data = loadBlockedIPs();
  if (!data.blocked.includes(ip)) {
    data.blocked.push(ip);
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(BLOCKED_IPS_PATH, JSON.stringify(data, null, 2), 'utf-8');
  }
}

export function unblockIP(ip: string): void {
  const data = loadBlockedIPs();
  data.blocked = data.blocked.filter(b => b !== ip);
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(BLOCKED_IPS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export function getBlockedIPs(): string[] {
  return loadBlockedIPs().blocked;
}

export function logRequest(ip: string, path: string, method: string): void {
  try {
    let logs: RequestLog[] = [];
    if (fs.existsSync(LOG_PATH)) {
      const data = fs.readFileSync(LOG_PATH, 'utf-8');
      logs = JSON.parse(data);
    }

    logs.push({
      ip,
      path,
      timestamp: new Date().toISOString(),
      method,
    });

    // Keep only last 1000 entries
    if (logs.length > 1000) {
      logs = logs.slice(-1000);
    }

    fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2), 'utf-8');
  } catch {
    // Silently fail if can't write log
  }
}

export function getTopRequesters(limit: number = 10): { ip: string; count: number }[] {
  try {
    if (!fs.existsSync(LOG_PATH)) return [];
    const data = fs.readFileSync(LOG_PATH, 'utf-8');
    const logs: RequestLog[] = JSON.parse(data);

    const counts: Record<string, number> = {};
    logs.forEach(log => {
      counts[log.ip] = (counts[log.ip] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  } catch {
    return [];
  }
}
