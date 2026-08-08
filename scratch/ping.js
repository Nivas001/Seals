async function pingLiveSite() {
  console.log("Sending 5 live traffic pings to production...");
  for (let i = 0; i < 5; i++) {
    const res = await fetch("https://aarrkkaa.com/api/log-drain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "custom-tracker",
        path: i % 2 === 0 ? "/products" : "/about",
        userAgent: "Mozilla/5.0 (Live Test Browser)",
        referrer: "https://aarrkkaa.com"
      })
    });
    console.log(`Ping ${i+1}: ${res.status}`);
  }
  console.log("Done.");
}

pingLiveSite();
