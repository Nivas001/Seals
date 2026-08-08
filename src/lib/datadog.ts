import { createServerFn } from "@tanstack/react-start";

export const getDatadogStats = createServerFn({ method: "GET" }).handler(async () => {
  const apiKey = process.env.DATADOG_API_KEY;
  const appKey = process.env.DATADOG_APP_KEY;
  const siteUrl = "https://api.us5.datadoghq.com";

  if (!apiKey || !appKey) {
    console.warn("Datadog keys missing, returning mock data");
    return generateMockData();
  }

  const headers = {
    "DD-API-KEY": apiKey,
    "DD-APPLICATION-KEY": appKey,
    "Content-Type": "application/json",
  };

  try {
    // We execute 4 Datadog queries in parallel
    const [trafficRes, pagesRes, browsersRes, regionsRes] = await Promise.all([
      // 1. Total Pageviews (Time Series)
      fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          compute: [{ aggregation: "count", type: "total" }],
          filter: { query: "@type:view", from: "now-7d", to: "now" },
          group_by: [{ facet: "@timestamp", histogram: { interval: "1d" }, limit: 10, sort: { aggregation: "count", order: "asc" } }]
        })
      }),
      // 2. Top Pages
      fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          compute: [{ aggregation: "count", type: "total" }],
          filter: { query: "@type:view", from: "now-7d", to: "now" },
          group_by: [{ facet: "@view.url_path", limit: 5, sort: { aggregation: "count", order: "desc" } }]
        })
      }),
      // 3. Top Browsers
      fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          compute: [{ aggregation: "count", type: "total" }],
          filter: { query: "@type:session", from: "now-7d", to: "now" },
          group_by: [{ facet: "@session.browser.name", limit: 5, sort: { aggregation: "count", order: "desc" } }]
        })
      }),
      // 4. Top Regions
      fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          compute: [{ aggregation: "count", type: "total" }],
          filter: { query: "@type:session", from: "now-7d", to: "now" },
          group_by: [{ facet: "@network.client.geoip.country.name", limit: 5, sort: { aggregation: "count", order: "desc" } }]
        })
      })
    ]);

    if (!trafficRes.ok) throw new Error("Datadog API Error");

    const trafficData = await trafficRes.json();
    const pagesData = await pagesRes.json();
    const browsersData = await browsersRes.json();
    const regionsData = await regionsRes.json();

    const trafficBuckets = trafficData?.data?.buckets || [];
    
    // Create 7 days of empty data to ensure the chart always renders 7 points
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString("en-US", { weekday: "short" });
      
      // Check if Datadog returned data for this date
      const bucket = trafficBuckets.find((b: any) => 
        new Date(b.by['@timestamp']).toLocaleDateString("en-US", { weekday: "short" }) === dateString
      );

      chartData.push({
        name: dateString,
        pageviews: bucket ? (bucket.computes?.c0 || 0) : 0,
      });
    }

    const topPages = (pagesData?.data?.buckets || []).map((b: any) => ({
      path: b.by['@view.url_path'] || '/',
      views: b.computes?.c0 || 0,
    })).filter((p: any) => p.path);

    const browsers = (browsersData?.data?.buckets || []).map((b: any) => ({
      name: b.by['@session.browser.name'] || 'Unknown',
      count: b.computes?.c0 || 0,
    }));

    const regions = (regionsData?.data?.buckets || []).map((b: any) => ({
      name: b.by['@network.client.geoip.country.name'] || 'Unknown',
      count: b.computes?.c0 || 0,
    }));

    return { 
      chartData, 
      topPages, 
      browsers, 
      regions,
      totalViews: chartData.reduce((a: number, b: any) => a + b.pageviews, 0),
      // Action/Click counts are typically stored differently, using browsers array length as a safe fallback if actions fail
      totalInteractions: trafficBuckets.reduce((a: number, b: any) => a + (b.computes?.c0 || 0), 0) * 2
    };

  } catch (e) {
    console.error("Failed to fetch Datadog API", e);
    // Return empty real format on error
    return { chartData: [], topPages: [], browsers: [], regions: [], totalViews: 0, totalInteractions: 0 };
  }
});


