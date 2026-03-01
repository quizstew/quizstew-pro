import type { ReactNode } from 'react';
import * as netinstallModule from './netinstall';
import * as vlanSetupModule from './vlan-setup';
import * as vpnTunnelsModule from './vpn-tunnels';
import * as firewallRulesModule from './firewall-rules';

export type ProcedureModule = {
  meta: { title: string; description?: string; category?: string };
  default: () => ReactNode;
};

const registry: Record<string, ProcedureModule> = {
  netinstall: { meta: netinstallModule.meta, default: netinstallModule.default },
  'vlan-setup': { meta: vlanSetupModule.meta, default: vlanSetupModule.default },
  'vpn-tunnels': { meta: vpnTunnelsModule.meta, default: vpnTunnelsModule.default },
  'firewall-rules': { meta: firewallRulesModule.meta, default: firewallRulesModule.default },
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
