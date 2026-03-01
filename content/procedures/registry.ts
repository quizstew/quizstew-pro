import type { ReactNode } from 'react';
import * as netinstallModule from './netinstall';
import * as vlanSetupModule from './vlan-setup';
import * as vpnTunnelsModule from './vpn-tunnels';

export type ProcedureModule = {
  meta: { title: string; description?: string; category?: string };
  default: () => ReactNode;
};

const procedures: Record<string, ProcedureModule> = {
  netinstall: { meta: netinstallModule.meta, default: netinstallModule.default },
  'vlan-setup': { meta: vlanSetupModule.meta, default: vlanSetupModule.default },
  'vpn-tunnels': { meta: vpnTunnelsModule.meta, default: vpnTunnelsModule.default },
};

export const procedureSlugs = Object.keys(procedures) as [string, ...string[]];

export function getProcedure(slug: string): ProcedureModule | undefined {
  return procedures[slug];
}

/** Table of contents / directory for the hub (homepage). */
export const directory = procedureSlugs.map((slug) => ({
  title: procedures[slug].meta.title,
  slug,
  category: procedures[slug].meta.category ?? 'General',
}));

/** For procedures index: title, slug, and short description. */
export const procedureIndexList = procedureSlugs.map((slug) => ({
  title: procedures[slug].meta.title,
  slug,
  desc: procedures[slug].meta.description ?? 'Technical guide.',
}));

export const procedureList = procedureSlugs.map((slug) => ({
  slug,
  href: `/procedures/${slug}`,
  label: procedures[slug].meta.title,
}));
