const apiKey = "d4941a238232ee58ea8915a46b17b27c";
const appKey = "ddapp_9W5QwKjhMUSJRiBCF0Jngu2re3i11PI6mb";
const siteUrl = "https://api.us5.datadoghq.com";

async function test(facetName: string) {
  const res = await fetch(`${siteUrl}/api/v2/rum/analytics/aggregate`, {
    method: "POST",
    headers: {
      "DD-API-KEY": apiKey,
      "DD-APPLICATION-KEY": appKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      compute: [{ aggregation: "count", type: "total" }],
      filter: { query: "@type:view", from: "now-7d", to: "now" },
      group_by: [{ facet: facetName, limit: 5 }]
    })
  });
  
  console.log(`Facet ${facetName}:`, await res.text());
}

async function runAll() {
  await test("@session.browser.name");
  await test("@device.browser");
  await test("browser");
  await test("@network.client.geoip.country.name");
  await test("@geo.country");
  await test("country");
  await test("@view.device.type"); // device type (mobile/desktop)
  await test("@device.type");
  await test("@os.name");
}

runAll();
