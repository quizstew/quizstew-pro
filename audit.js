const axios = require('axios');
const cheerio = require('cheerio');
const { Ollama } = require('ollama');

const ollama = new Ollama();

const BASE_URL = 'https://quizstew-pro.vercel.app';

function getBaseDomain(url) {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}`;
  } catch {
    return BASE_URL;
  }
}

function normalizeUrl(url, base) {
  try {
    if (url.startsWith('/')) {
      return new URL(url, base).href;
    }
    return new URL(url).href;
  } catch {
    return null;
  }
}

async function getPageUrls(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const baseDomain = getBaseDomain(url);
  const urls = new Set();

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const full = normalizeUrl(href, url);
    if (full && full.startsWith(baseDomain)) {
      urls.add(full.replace(/\/$/, '') || full);
    }
  });

  return [...urls];
}

async function crawlDomain(startUrl) {
  const baseDomain = getBaseDomain(startUrl);
  const visited = new Set();
  const toVisit = [startUrl.replace(/\/$/, '') || startUrl];

  while (toVisit.length > 0) {
    const url = toVisit.shift();
    const normalized = url.replace(/\/$/, '') || url;

    if (visited.has(normalized)) continue;
    visited.add(normalized);

    try {
      const links = await getPageUrls(url);
      for (const link of links) {
        const norm = link.replace(/\/$/, '') || link;
        if (!visited.has(norm) && link.startsWith(baseDomain)) {
          toVisit.push(link);
        }
      }
    } catch (err) {
      console.error(`Failed to crawl ${url}: ${err.message}`);
    }
  }

  return [...visited];
}

async function auditPage(url) {
  try {
    console.log(`\n--- Auditing: ${url} ---`);
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('title').text();
    const h1 = $('h1').text();
    const description = $('meta[name="description"]').attr('content');

    console.log('Analyzing with the brain...');

    const response = await ollama.chat({
      model: 'llama3.2',
      messages: [
        {
          role: 'user',
          content: `Analyze this for SEO: Title: ${title}, H1: ${h1}, Desc: ${description}. Give 3 concise fixes.`,
        },
      ],
    });

    console.log('--- Audit Result ---');
    console.log(response.message.content);
  } catch (error) {
    console.error(`Error auditing ${url}: ${error.message}`);
  }
}

async function main() {
  const startUrl = process.argv[2] || BASE_URL;
  const base = getBaseDomain(startUrl);

  console.log(`Crawling domain: ${base}`);
  const urls = await crawlDomain(startUrl);
  console.log(`Found ${urls.length} pages to audit:\n${urls.join('\n')}`);

  for (const url of urls) {
    await auditPage(url);
  }

  console.log('\n--- Audit complete ---');
}

main();
