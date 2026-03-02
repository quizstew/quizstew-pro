import type { ReactNode } from 'react';
import * as netinstallModule from './netinstall';
import * as vlanSetupModule from './vlan-setup';
import * as vpnTunnelsModule from './vpn-tunnels';
import * as firewallRulesModule from './firewall-rules';
import * as secureRemoteModule from './secure-remote';
import * as wifiHardeningModule from './wifi-hardening';

export type ProcedureSEO = {
  title: string;
  description: string;
};

export type ProcedureModule = {
  meta: { title: string; description?: string; category?: string };
  seo: ProcedureSEO;
  default: () => ReactNode;
};

const registry: Record<string, ProcedureModule> = {
  netinstall: {
    meta: netinstallModule.meta,
    seo: {
      title: 'Netinstall Recovery Guide | RouterOS Hub',
      description:
        'RouterOS recovery via Netinstall. Decision flow for LED states, static IP 192.168.88.2, and reflashing. Reference for bricked RouterOS-based devices.',
    },
    default: netinstallModule.default,
  },
  'vlan-setup': {
    meta: vlanSetupModule.meta,
    seo: {
      title: 'VLAN Configuration Guide | RouterOS Hub',
      description:
        'RouterOS v7+ VLAN setup. Physical interface identification, VLAN interface creation, ID assignment, IP or bridge configuration.',
    },
    default: vlanSetupModule.default,
  },
  'vpn-tunnels': {
    meta: vpnTunnelsModule.meta,
    seo: {
      title: 'IPsec & WireGuard VPN Tunnels Guide | RouterOS Hub',
      description:
        'RouterOS v7+ tunnel setup. IPsec Phase 1 & 2, WireGuard interface and peer configuration, policy application.',
    },
    default: vpnTunnelsModule.default,
  },
  'firewall-rules': {
    meta: firewallRulesModule.meta,
    seo: {
      title: 'Firewall Best Practices Guide | RouterOS Hub',
      description:
        'RouterOS Input chain hardening. Pre-flight requirements, drop rule order, management access preservation.',
    },
    default: firewallRulesModule.default,
  },
  'secure-remote': {
    meta: secureRemoteModule.meta,
    seo: {
      title: 'Secure Remote Management Guide for RouterOS | RouterOS Command Center',
      description:
        'RouterOS v7+ secure remote access. Allowed interface restriction, firewall filter for management traffic, service hardening. VPN-based and LAN-based management.',
    },
    default: secureRemoteModule.default,
  },
  'wifi-hardening': {
    meta: wifiHardeningModule.meta,
    seo: {
      title: 'Hardening Wireless Networks for RouterOS | RouterOS Command Center',
      description:
        'RouterOS wireless security. WPA3-SAE authentication, management frame protection, access list filtering. Mitigation for deauth attacks and legacy client handling.',
    },
    default: wifiHardeningModule.default,
  },
};

export const procedureSlugs = Object.keys(registry) as [string, ...string[]];

export function getProcedure(slug: string): ProcedureModule | undefined {
  return registry[slug];
}

/** Table of contents / directory for the hub (homepage). */
export const directory = procedureSlugs.map((slug) => ({
  title: registry[slug].meta.title,
  slug,
  category: registry[slug].meta.category ?? 'General',
}));

/** For procedures index: title, slug, and short description. */
export const procedureIndexList = procedureSlugs.map((slug) => ({
  title: registry[slug].meta.title,
  slug,
  desc: registry[slug].meta.description ?? 'Technical guide.',
}));

export const procedureList = procedureSlugs.map((slug) => ({
  slug,
  href: `/procedures/${slug}`,
  label: registry[slug].meta.title,
}));
