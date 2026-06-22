// Captures fresh product screenshots from the running Studio web app
// (http://localhost:5174) in two themes, writing PNGs to
// public/screenshots/_raw/{dark,light}. A separate pass (process-screenshots.mjs)
// crops + converts them to webp. Studio is left untouched: Playwright is
// resolved from the studio e2e workspace via createRequire.
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire('C:/Local Development/APICircle/studio/e2e/web/package.json');
const { chromium } = require('@playwright/test');

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'http://localhost:5174';

// --- Seed: the e2e 'seeded' variant (Users folder, 2 requests, Dev/Prod envs,
//     a Smoke plan, a Users mock, a User schema). Shapes mirror @apicircle/shared. ---
const NOW = '2026-05-15T12:00:00.000Z';
const ids = {
  workspaceId: 'ws-demo',
  rootFolderId: 'root-folder',
  folderId: 'folder-users',
  r1: 'req-get-user',
  r2: 'req-create-user',
  plan: 'plan-smoke',
  mock: 'mock-users',
  schema: 'schema-user',
};

function buildSeed(themeId) {
  const r1 = {
    id: ids.r1, name: 'Get user', folderId: ids.folderId,
    method: 'GET', url: 'https://api.example.com/users/{{id}}',
    headers: [{ key: 'Accept', value: 'application/json', enabled: true }],
    query: [], body: { type: 'none', content: '' },
    auth: { type: 'inherit' }, contextVars: [], extractions: [], assertions: [],
    bodySchemaId: ids.schema, createdAt: NOW, updatedAt: NOW,
  };
  const r2 = {
    id: ids.r2, name: 'Create user', folderId: ids.folderId,
    method: 'POST', url: 'https://api.example.com/users',
    headers: [{ key: 'Content-Type', value: 'application/json', enabled: true }],
    query: [], body: { type: 'json', content: '{\n  "name": "Ada Lovelace",\n  "email": "ada@example.com"\n}' },
    auth: { type: 'bearer', token: '{{token}}' },
    contextVars: [], extractions: [], assertions: [], createdAt: NOW, updatedAt: NOW,
  };
  const endpoint = {
    id: 'e1', name: 'GET /users/:id', method: 'GET', pathPattern: '/users/:id',
    requestSchema: { pathParams: [], queryParams: [], headers: [], cookies: [] },
    requestValidation: [], responseRules: [],
    defaultResponse: {
      status: 200,
      headers: [{ key: 'Content-Type', value: 'application/json', enabled: true }],
      body: { type: 'json', content: '{"id":"{id}","name":"Ada Lovelace"}' },
    },
  };
  const synced = {
    schemaVersion: 1, workspaceId: ids.workspaceId,
    collections: {
      tree: { id: ids.rootFolderId, type: 'root', children: [{ kind: 'folder', id: ids.folderId }] },
      requests: { [ids.r1]: r1, [ids.r2]: r2 },
      folders: { [ids.folderId]: { id: ids.folderId, name: 'Users', parentId: null, auth: { type: 'bearer', token: '{{token}}' } } },
    },
    environments: {
      items: {
        Dev: { name: 'Dev', variables: [
          { key: 'baseUrl', value: 'https://api.example.com', encrypted: false },
          { key: 'id', value: '42', encrypted: false },
          { key: 'token', value: 'dev-secret-token', encrypted: false },
        ] },
        Prod: { name: 'Prod', variables: [
          { key: 'baseUrl', value: 'https://api.acme.io', encrypted: false },
          { key: 'id', value: '1001', encrypted: false },
        ] },
      },
      activeName: 'Dev',
      priorityOrder: [{ kind: 'local', name: 'Dev' }, { kind: 'local', name: 'Prod' }],
    },
    linkedWorkspaces: {}, linkedOverrides: { requests: {}, environmentVars: {} },
    releases: { self: null, perLink: {} },
    globalAssets: {
      schemas: { [ids.schema]: { id: ids.schema, name: 'User', schema: '{"type":"object","required":["name"],"properties":{"id":{"type":"integer"},"name":{"type":"string"}}}', createdAt: NOW, updatedAt: NOW } },
      graphql: {},
    },
    mockServers: {
      [ids.mock]: {
        id: ids.mock, name: 'Users Mock', defaultPort: null, cors: { enabled: false, origins: [] },
        createdAt: NOW, updatedAt: NOW,
        source: { kind: 'manual', endpoints: [endpoint] }, endpoints: [endpoint],
      },
    },
    executionPlans: {
      [ids.plan]: { id: ids.plan, name: 'Smoke', steps: [{ requestId: ids.r1, enabled: true }, { requestId: ids.r2, enabled: true }], envPriorityOrder: [{ kind: 'local', name: 'Dev' }] },
    },
    secretKeys: {}, secretCrypto: null,
    meta: { createdAt: NOW, updatedAt: NOW, appVersion: '0.1.0' },
  };
  const local = {
    schemaVersion: 1, workspaceId: ids.workspaceId, executionPlans: {},
    history: { requestRuns: [], planRuns: [] }, secretIndex: { entries: {} },
    sessions: { github: { workspace: null, links: {} } },
    connectedRepo: null, workingBranch: null, seededWorkspaceSha: null, retiredBranch: null,
    sync: { lastPulledSnapshot: null, lastPulledSha: null, lastPulledAt: null, dirtyKeys: [] },
    linkedCollections: {}, globalContext: {}, mockRuntime: { active: {} },
    ui: { activeRequestId: ids.r1, sidebarExpandedSections: [], themeId, fontId: 'system-sans', fontSizePercent: 100 },
    settings: { validateOnSend: true, monacoConsumesWheel: false },
    snapshots: { entries: [], maxBytes: 50 * 1024 * 1024 },
  };
  const registry = {
    schemaVersion: 1, activeWorkspaceId: ids.workspaceId,
    workspaces: [{ id: ids.workspaceId, name: 'Acme API', lastOpenedAt: NOW, createdAt: NOW }],
  };
  return { synced, local, registry };
}

async function writeSeed(page, seed) {
  await page.evaluate(async ({ synced, local, registry }) => {
    const DB_NAME = 'apicircle-workspace';
    const DB_VERSION = 3;
    const db = await new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const d = req.result;
        if (!d.objectStoreNames.contains('synced')) d.createObjectStore('synced');
        if (!d.objectStoreNames.contains('local')) d.createObjectStore('local');
        if (!d.objectStoreNames.contains('registry')) d.createObjectStore('registry');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    await new Promise((resolve, reject) => {
      const tx = db.transaction(['synced', 'local', 'registry'], 'readwrite');
      tx.objectStore('synced').clear();
      tx.objectStore('local').clear();
      tx.objectStore('registry').clear();
      tx.objectStore('synced').put(synced, synced.workspaceId);
      tx.objectStore('local').put(local, local.workspaceId);
      tx.objectStore('registry').put(registry, 'meta');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
    db.close();
  }, seed);
}

async function dismissTour(page) {
  for (const label of ['Skip tour', 'Skip', 'Got it', 'Close']) {
    try {
      const el = page.getByText(label, { exact: true }).first();
      if (await el.isVisible({ timeout: 800 })) {
        await el.click();
        await page.waitForTimeout(250);
      }
    } catch {}
  }
  await page.keyboard.press('Escape').catch(() => {});
}

async function clickTab(page, name) {
  const btn = page.getByRole('button', { name, exact: true }).first();
  await btn.click({ timeout: 6000 });
  await page.waitForTimeout(750);
}

const THEMES = [
  { site: 'dark', studio: 'one-dark-pro' },
  { site: 'light', studio: 'github-light' },
];

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  for (const { site, studio } of THEMES) {
    const outDir = join(root, 'public', 'screenshots', '_raw', site);
    await mkdir(outDir, { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const seed = buildSeed(studio);

    await page.goto(`${BASE}/oauth-callback.html`);
    await writeSeed(page, seed);
    await page.evaluate((t) => localStorage.setItem('apicircle-v2:theme', t), studio);
    await page.goto(`${BASE}/`);
    await page.getByText('API Circle Studio', { exact: true }).first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(1500); // hydrate + applyTheme
    await dismissTour(page);
    await page.waitForTimeout(400);
    const applied = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log(`[${site}] data-theme = ${applied} (wanted ${studio})`);

    const shot = async (key) => {
      await page.screenshot({ path: join(outDir, `${key}.png`) });
      console.log(`  ✓ ${site}/${key}`);
    };

    try {
      await clickTab(page, 'Editor');
      // Expand the Users folder so the request tree is visible.
      try { await page.getByText('Users', { exact: false }).first().click({ timeout: 3000 }); await page.waitForTimeout(450); } catch {}
      try { await page.getByText('Get user', { exact: true }).first().click({ timeout: 2500 }); await page.waitForTimeout(450); } catch {}
      await shot('request-editor');
    } catch (e) { console.log('  ✗ editor', e.message); }
    // Auth view: open the bearer-auth request, then its Auth tab (label is "Auth · Bearer").
    try {
      await page.getByText('Create user', { exact: true }).first().click({ timeout: 4000 });
      await page.waitForTimeout(500);
      await page.getByRole('button', { name: /^Auth/ }).first().click({ timeout: 3000 });
      await page.waitForTimeout(500);
      await shot('auth');
    } catch (e) { console.log('  ✗ auth', e.message); try { await shot('auth'); } catch {} }
    try { await clickTab(page, 'Workspace'); await shot('git-workspace'); } catch (e) { console.log('  ✗ workspace', e.message); }
    try { await clickTab(page, 'Environments'); await shot('environments'); } catch (e) { console.log('  ✗ env', e.message); }
    try { await clickTab(page, 'Execution'); await shot('execution-plan'); } catch (e) { console.log('  ✗ exec', e.message); }
    try { await clickTab(page, 'Mocks'); await page.waitForTimeout(400); await shot('mock-server'); } catch (e) { console.log('  ✗ mocks', e.message); }
    try { await clickTab(page, 'MCP'); await page.waitForTimeout(400); await shot('mcp-connection'); } catch (e) { console.log('  ✗ mcp', e.message); }
    try { await clickTab(page, 'History'); await shot('history'); } catch (e) { console.log('  ✗ history', e.message); }
    // Theme picker (proves the 60+ theme catalog): open the Settings popover.
    try {
      await clickTab(page, 'Editor');
      await page.getByRole('button', { name: /Settings/ }).first().click({ timeout: 3000 });
      await page.waitForTimeout(700);
      await shot('themes');
    } catch (e) { console.log('  ✗ themes', e.message); }

    await ctx.close();
  }
  await browser.close();
  console.log('done.');
};

run().catch((e) => { console.error(e); process.exit(1); });
