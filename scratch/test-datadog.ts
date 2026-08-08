const apiKey = "d4941a238232ee58ea8915a46b17b27c";
const appKey = "ddapp_9W5QwKjhMUSJRiBCF0Jngu2re3i11PI6mb";
const siteUrl = "https://api.us5.datadoghq.com";

async function test() {
  const res = await fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
    method: "POST",
    headers: {
      "DD-API-KEY": apiKey,
      "DD-APPLICATION-KEY": appKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      compute: [{ aggregation: "count", type: "total" }],
      filter: { query: "@type:view", from: "now-1d", to: "now" }
    })
  });
  
  console.log("Single day:", await res.text());
}

test();
