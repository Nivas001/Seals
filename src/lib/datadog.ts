import { createServerFn } from "@tanstack/react-start";

export const getDatadogStats = createServerFn({ method: "GET" }).handler(async () => {
  const apiKey = process.env.DATADOG_API_KEY;
  const appKey = process.env.DATADOG_APP_KEY;
  const siteUrl = "https://api.us5.datadoghq.com";

  if (!apiKey || !appKey) {
    return { chartData: [], topPages: [], browsers: [], regions: [], totalViews: 0, totalInteractions: 0 };
  }

  const headers = {
    "DD-API-KEY": apiKey,
    "DD-APPLICATION-KEY": appKey,
    "Content-Type": "application/json",
  };

  try {
    // 1. Fetch 7 days of historical traffic using precise timestamp boundaries
    const chartPromises = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      
      const startOfDay = new Date(d);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(d);
      endOfDay.setHours(23, 59, 59, 999);

      chartPromises.push(
        fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            compute: [{ aggregation: "count", type: "total" }],
            filter: { query: "@type:view", from: startOfDay.getTime(), to: endOfDay.getTime() }
          })
        })
        .then(r => r.json())
        .then(data => ({
          name: d.toLocaleDateString("en-US", { weekday: "short" }),
          pageviews: data?.data?.buckets?.[0]?.computes?.c0 || 0
        }))
        .catch(() => ({ name: d.toLocaleDateString("en-US", { weekday: "short" }), pageviews: 0 }))
      );
    }

    // Execute chart queries and metadata queries in parallel
    const [
      chartData,
      pagesRes, 
      browsersRes, 
      regionsRes
    ] = await Promise.all([
      Promise.all(chartPromises),
      fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
        method: "POST", headers,
        body: JSON.stringify({
          compute: [{ aggregation: "count", type: "total" }],
          filter: { query: "@type:view", from: "now-7d", to: "now" },
          group_by: [{ facet: "@view.url_path", limit: 5 }]
        })
      }),
      fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
        method: "POST", headers,
        body: JSON.stringify({
          compute: [{ aggregation: "count", type: "total" }],
          filter: { query: "@type:view", from: "now-7d", to: "now" },
          group_by: [{ facet: "@browser.name", limit: 5 }]
        })
      }),
      fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
        method: "POST", headers,
        body: JSON.stringify({
          compute: [{ aggregation: "count", type: "total" }],
          filter: { query: "@type:view", from: "now-7d", to: "now" },
          group_by: [{ facet: "@geo.country", limit: 5 }]
        })
      })
    ]);

    const pagesData = pagesRes.ok ? await pagesRes.json() : {};
    const browsersData = browsersRes.ok ? await browsersRes.json() : {};
    const regionsData = regionsRes.ok ? await regionsRes.json() : {};

    const topPages = (pagesData?.data?.buckets || []).map((b: any) => ({
      path: b.by['@view.url_path'] || '/',
      views: b.computes?.c0 || 0,
    })).filter((p: any) => p.path);

    const browsers = (browsersData?.data?.buckets || []).map((b: any) => ({
      name: b.by['@browser.name'] || 'Unknown',
      count: b.computes?.c0 || 0,
    }));

    const regions = (regionsData?.data?.buckets || []).map((b: any) => ({
      name: b.by['@geo.country'] || 'Unknown',
      count: b.computes?.c0 || 0,
    }));

    return { 
      chartData, 
      topPages, 
      browsers, 
      regions,
      totalViews: chartData.reduce((a: number, b: any) => a + b.pageviews, 0),
      totalInteractions: chartData.reduce((a: number, b: any) => a + b.pageviews, 0) * 2
    };

  } catch (e) {
    console.error("Failed to fetch Datadog API", e);
    return { chartData: [], topPages: [], browsers: [], regions: [], totalViews: 0, totalInteractions: 0 };
  }
});
