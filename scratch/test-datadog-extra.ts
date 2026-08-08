const apiKey = "d4941a238232ee58ea8915a46b17b27c";
const appKey = "ddapp_9W5QwKjhMUSJRiBCF0Jngu2re3i11PI6mb";
const siteUrl = "https://api.us5.datadoghq.com";

async function testActions() {
  const res = await fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
    method: "POST",
    headers: {
      "DD-API-KEY": apiKey,
      "DD-APPLICATION-KEY": appKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      compute: [{ aggregation: "count", type: "total" }],
      filter: { query: "@type:action", from: "now-7d", to: "now" },
      group_by: [{ facet: "@action.target.name", limit: 5 }]
    })
  });
  console.log("Actions:", await res.text());
}

async function testPerformance() {
  const res = await fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
    method: "POST",
    headers: {
      "DD-API-KEY": apiKey,
      "DD-APPLICATION-KEY": appKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      compute: [
        { aggregation: "avg", metric: "@view.time_spent", type: "total" },
        { aggregation: "avg", metric: "@view.largest_contentful_paint", type: "total" }
      ],
      filter: { query: "@type:view", from: "now-7d", to: "now" }
    })
  });
  console.log("Performance:", await res.text());
}

testActions();
testPerformance();
